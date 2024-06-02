import { vulnerabilitiesCard } from "content";
import Image from "next/image";
import VulnerabilitiesCard from "../vulnerabilities-card";
import { api } from "@/trpc/react";

type VulnerabilitiesCardProps = {
  requestId: number;
};

export default function SmartContractVulnerabilities({
  requestId,
}: VulnerabilitiesCardProps) {
  const getResponse = api.audit.getResponse.useQuery({
    id: requestId,
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-5xl font-bold">
            Your Smart Contract Vulnerabilities
          </h2>
          <div className="h-5" />
          <div className="flex gap-3"></div>
        </div>
        <div className="flex w-1/2 justify-end gap-2">
          <div className="flex rounded-lg bg-white px-4">
            <div className="flex flex-col ">
              <h3 className="mb-0 text-[32px] font-bold text-dark-darkMain">
                {getResponse.data?.vulnerabilities.length || 0}
              </h3>
              <p className="font-bold text-dark-darkMain">Vulnerabilities</p>
            </div>
            <div className="flex justify-end">
              <Image
                src="/shield_icon.png"
                alt="Shield Icon"
                width={72}
                height={72}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-8" />
      <div className="flex flex-wrap gap-6">
        {getResponse.data?.vulnerabilities.map((item, index) => {
          return (
            <VulnerabilitiesCard
              id={index + 1}
              title={item.title}
              text={item.description}
              severity={
                item.severity.charAt(0).toUpperCase() + item.severity.slice(1)
              }
              score={item.certainityScore}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}
