import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);

  const auditRequest = await api.audit.getRequest({ id });

  return auditRequest
    ? NextResponse.json({
        repoLink: auditRequest.repoLink,
        filesInScope: auditRequest.filesInScope,
        title: auditRequest.title,
        tags: auditRequest.tags,
        categories: auditRequest.categories,
      })
    : NextResponse.json(
        {
          error: "Request not found",
        },
        { status: 404 },
      );
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const requestId = parseInt(params.id);

  const auditRequest = await db.auditRequest.findFirst({
    where: { id: requestId },
    include: { auditResponse: true },
  });

  if (!auditRequest || auditRequest.auditResponse !== null) {
    return NextResponse.json(
      {
        error:
          "Bad Request: Either request not found or response already exists",
      },
      { status: 400 },
    );
  }

  // Parse each file in the request
  // For each file pass it to AI Backend
  // Collect the results
  // Save the results in the database
  // Return the id of the response

  return NextResponse.json(
    {
      error: "Not implemented",
    },
    { status: 501 },
  );
}
