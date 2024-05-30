import { cn } from "lib/utils";
import Image from "next/image";
import Cips from "../cips";
import { Progress } from "../progress";

export default function DeploySmartContractCard({
  userName,
  progress,
  framework,
}: {
  userName: string | undefined;
  progress: number | undefined;
  framework: {
    iconImage?: string;
    version?: string;
    value: string;
  }[];
}) {
  return (
    <div className="rounded-[16px] border border-primary-purpleMedium ">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <div className="flex items-center gap-2">
              <Image
                src="/user.png"
                alt="User Image"
                width={64}
                height={64}
                className="h-16 w-16"
              />
              <div>
                <h3 className="text-2xl font-bold text-textLight">Creator</h3>
                <p className="inline-flex items-center gap-2 text-xl font-bold">
                  <span>
                    <Image
                      src="/clinical_notes_white.svg"
                      alt="clinical_notes_white"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </span>
                  {userName}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[12px]">
              <span className="font-bold">25</span> Deployements
            </p>
            <Image
              src="/bars.png"
              alt="bars"
              width={188}
              height={44}
              className="h-11 w-[188px]"
            />
          </div>
        </div>
        <div className="h-4" />
        <>
          <p className="text-[12px]">Framework</p>
          <div className="h-2" />
          <div className="flex flex-wrap gap-2">
            {framework.map((item, index) => (
              <Cips
                key={index}
                square
                title={item.value}
                version={item.version}
                img={
                  <Image
                    src={item.iconImage ?? ""}
                    alt="Framework icon"
                    width={14}
                    height={14}
                    className={cn([
                      "h-3.5 w-3.5",
                      item.iconImage ? "" : "hidden",
                    ])}
                  />
                }
              />
            ))}
          </div>
        </>
        <div className="h-4" />
        <div className="flex items-end gap-6">
          <div className="w-1/2">
            <p className="text-2xl font-extrabold">AI certainty score:</p>
            <p>AI confidence level related to the vulnerability</p>
          </div>
          <div className="w-1/2">
            <Progress value={progress} showValue />
          </div>
        </div>
      </div>

      <div className="h-4" />
      <div className="h-40 border-t border-primary-purpleMedium px-4">
        <p>wip</p>
      </div>
    </div>
  );
}
