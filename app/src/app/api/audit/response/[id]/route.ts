import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);

  const auditResponse = await db.auditResponse.findUnique({
    where: { auditRequestId: id },
    include: { vulnerabilities: true },
  });

  return auditResponse
    ? NextResponse.json({
        findings: auditResponse.vulnerabilities,
      })
    : NextResponse.json(
        {
          error: "Response not found",
        },
        { status: 404 },
      );
}
