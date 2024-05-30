import { cipsContent, vulnerabilitiesCard } from "content";
import Image from "next/image";
import Cips from "../cips";
import VulnerabilitiesCard from "../vulnerabilities-card";

export default function SmartContractVulnerabilities() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-[70%]">
          <h2 className="text-5xl font-bold">
            Your Smart Contract Vulnerabilities
          </h2>
          <div className="h-5" />
          <div className="flex gap-3">
            {cipsContent.map((item, index) => {
              return (
                <Cips
                  className="inline-flex items-center gap-1 rounded-full bg-textLight px-2 py-1"
                  key={index}
                  img={
                    <Image
                      src={item.imageSrc}
                      width={20}
                      height={20}
                      alt={item.imageAlt}
                      className="h-5 w-5"
                    />
                  }
                  title={item.title}
                />
              );
            })}
          </div>
        </div>
        <div className="flex w-[24%]  justify-end gap-2">
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
              score={item.certainityScore}
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
