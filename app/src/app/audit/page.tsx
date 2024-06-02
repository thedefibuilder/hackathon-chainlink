"use client";
import { useState } from "react";
import HeroBanner from "../_components/ui/hero-banner";
import ReviewAi from "../_components/ui/review-ai/review-ai";
import SmartContractVulnerabilities from "../_components/ui/smart-contract-vulnerabilities/smart-contract-vulnerabilities";
import SmartContract from "../_components/ui/smart-contract/smart-contract";
import SuggestedChanges from "../_components/ui/suggested-changes/suggested-changes";

export default function AuditPage() {
  const [requestId, setRequestId] = useState<number | null>();

  return (
    <main className="min-h-screen bg-dark-darkMain px-24 text-white">
      <div className="h-8" />
      <HeroBanner
        title="Your AI auditor"
        text="Your Smart Contracts audited in a matter of seconds."
        img="/auditBanner.png"
        imgAlt="Audit Banner"
        imgWidth={260}
        imgHeight={260}
      />
      <div className="h-8" />
      <SmartContract setRequestId={setRequestId} />
      <div className="h-8" />
      {requestId && <SmartContractVulnerabilities requestId={requestId} />}
      <div className="h-8" />
      {requestId && <SuggestedChanges requestId={requestId} />}
      <div className="h-8" />
      <ReviewAi />
      <div className="h-8" />
    </main>
  );
}
