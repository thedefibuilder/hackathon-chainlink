"use client";

import Cips from "@/app/_components/ui/cips";
import Contributors from "@/app/_components/ui/contributors/contributors";
import DeploySmartContractCard from "@/app/_components/ui/deploy-card/deploy-smart-contract-card";
import DeployContracCard from "@/app/_components/ui/deploy-contract-card/deploy-contract-card";

import SectionTitle from "@/app/_components/ui/section-title";
import SuggestedAccordion from "@/app/_components/ui/suggested-changes/suggested-accordion";
import SuggestedCard from "@/app/_components/ui/suggested-changes/suggested-card";
import TotalAward from "@/app/_components/ui/total-award";
import { deployCardContent, cipsTags, suggestedChanges } from "content";

export default function DeployContractPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const item = deployCardContent.find((item) => item.id.toString() === id);

  return (
    <main className="min-h-screen bg-dark-darkMain px-24 text-white">
      <div className="h-16" />

      <div className="flex flex-wrap  justify-between">
        <div className="w-[60%]">
          <SectionTitle
            title="Deploy Smart Contract"
            text="This smart contract has been audited, reviewed and is ready to deploy"
            imgSrc="/developer_mode_tv.png"
            imgAlt={"Developer Mode Tv Icon"}
            imgWidth={48}
            imgHeight={48}
          />
          <div className="h-[26px]" />
          <DeploySmartContractCard
            userName={item?.user}
            progress={item?.progress}
            framework={item?.frameWork ?? []}
          />
          <div className="h-[26px]" />
          <div className="flex w-full flex-col gap-4">
            {suggestedChanges.map((item, index) => {
              return (
                <SuggestedCard
                  key={index}
                  title={item.title}
                  text={item.text}
                />
              );
            })}
          </div>
        </div>
        <div className="w-[38%]">
          <div className="h-10" />
          <DeployContracCard />
          <div className="h-8" />
          <TotalAward />
          <div className="h-8" />
          <Contributors />
          <div className="h-8" />
        </div>
      </div>
      <div className="h-8" />
    </main>
  );
}
