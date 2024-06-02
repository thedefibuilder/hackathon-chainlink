import { TAuditFindingResponse, aiAuditorBackendURL } from "@/config/audit-ai";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);

  const auditRequest = await api.audit.getRequest({
    id,
  });

  return auditRequest
    ? NextResponse.json({
        repoOwner: auditRequest.repoOwner,
        repoName: auditRequest.repoName,
        filesInScope: auditRequest.filesInScope,
        title: auditRequest.title,
        tags: auditRequest.tags,
        isProcessed: !!auditRequest.auditResponse,
      })
    : NextResponse.json(
        {
          error: "Request not found",
        },
        { status: 404 },
      );
}

// Callable by chainlink function
export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const requestId = parseInt(params.id);

  try {
    const auditRequest = await db.auditRequest.findFirst({
      where: { id: requestId },
      include: { auditResponse: true, createdBy: true },
    });

    if (!auditRequest || auditRequest.auditResponse) {
      throw new Error("Request not found or already audited");
    }

    const { access_token: acccessToken } = await db.account.findFirstOrThrow({
      where: { userId: auditRequest.createdBy.id },
      select: { access_token: true },
    });

    const octokit = new Octokit({
      auth: acccessToken,
    });

    // Parse each file in the request
    const auditorResponses = await Promise.all(
      auditRequest.filesInScope.map(async (file) => {
        const fileContentBase64 = await octokit.rest.repos.getContent({
          owner: auditRequest.repoOwner,
          repo: auditRequest.repoName,
          path: file,
        });

        const fileContentText = Buffer.from(
          // @ts-expect-error-next-line
          fileContentBase64.data.content,
          "base64",
        ).toString("utf-8");

        const auditResponse = await fetch(
          aiAuditorBackendURL + "/audit_function",
          {
            method: "POST",
            body: JSON.stringify({
              function_code: fileContentText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!auditResponse.ok) {
          throw new Error("Failed to audit file");
        }

        const auditResponseJson =
          (await auditResponse.json()) as TAuditFindingResponse;

        return {
          file,
          findings: auditResponseJson.vulnerabilities,
        };
      }),
    );

    await db.auditResponse.create({
      data: {
        auditRequestId: requestId,
        vulnerabilities: {
          createMany: {
            data: auditorResponses.flatMap(({ findings, file }) => {
              return findings.map((finding) => {
                return {
                  filePath: file,
                  title: finding.title,
                  description: finding.detail,
                  severity: finding.severity,
                  recommendation: finding.recommendation,
                  certainityScore: finding.certainty_score,
                };
              });
            }),
          },
        },
      },
    });

    return NextResponse.json(
      {
        data: "ok",
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Failed to audit request",
      },
      { status: 500 },
    );
  }
}
