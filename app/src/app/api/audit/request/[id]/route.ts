import { api } from "@/trpc/server";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(
  _request: NextRequest,
  { params }: { params: { id: number } },
) {
  const id = params.id;

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
