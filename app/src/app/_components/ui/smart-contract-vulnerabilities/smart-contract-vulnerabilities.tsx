import { vulnerabilitiesCard } from "content";
import Image from "next/image";
import VulnerabilitiesCard from "../vulnerabilities-card";

export default function SmartContractVulnerabilities() {
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
                5
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
        {vulnerabilitiesCard.map((item, index) => {
          return (
            <VulnerabilitiesCard
              id={index + 1}
              title={item.title}
              text={item.text}
              severity={item.certainityScore}
              score={60} // TODO: Change this to actual score
              key={index}
            />
          );
        })}
      </div>

      <div className="h-8" />
      <>
        <h2 className="text-5xl font-bold text-textLight">Summary</h2>
        <div className="h-2" />
        <p className="w-3/4 text-xl">
          This smart contract is vulnerable to reentrancy attacks, lacks proper
          access control, has potential state manipulation issues, and lacks
          essential features like events. These vulnerabilities could lead to
          financial losses and exploitation by attackers.
        </p>
      </>
    </>
  );
}
