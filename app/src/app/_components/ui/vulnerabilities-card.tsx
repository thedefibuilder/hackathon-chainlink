import { cn } from "lib/utils";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Progress } from "./progress";

export default function VulnerabilitiesCard({
  id,
  title,
  text,
  severity,
  score,
  className,
}: {
  id: number;
  title: string;
  text: string;
  severity: string;
  score: number;
  className?: string;
}) {
  return (
    <Dialog>
      <div
        className={cn([
          "relative w-[48%] rounded-lg p-4 pl-8",
          className,
          severity === "Critical" ? "bg-red-gradient" : "",
          severity === "High" ? "bg-orange-gradient" : "",
          severity === "Medium" ? "bg-yellow-gradient" : "",
          severity === "Low" ? "bg-green-gradient" : "",
        ])}
      >
        <div
          className={cn([
            "absolute left-0 top-0 h-full w-3 rounded-l-lg",
            severity === "Critical" ? "bg-primary-red" : "",
            severity === "High" ? "bg-primary-orange" : "",
            severity === "Medium" ? "bg-primary-yellow" : "",
            severity === "Low" ? "bg-primary-greenMedium" : "",
          ])}
        />
        <div className="flex items-center gap-4">
          <h2 className="text-5xl font-extrabold text-textLight">0{id}</h2>
          <h3 className="text-3xl font-extrabold text-textLight">{title}</h3>
        </div>
        <div className="flex w-full flex-col">
          <div className="h-6" />
          <p className="w-[90%] text-textLight">{text}</p>
          <div className="h-5" />
          <div className="inline-flex justify-end gap-2">
            <div
              className={cn([
                "rounded-full px-4 py-1",
                severity === "Critical" ? "bg-primary-red" : "",
                severity === "High" ? "bg-primary-orange" : "",
                severity === "Medium" ? "bg-primary-yellow" : "",
                severity === "Low" ? "bg-primary-greenMedium" : "",
              ])}
            >
              <p className="font-black text-primary-redBold">{severity}</p>
            </div>
            <DialogTrigger
              className={cn([
                "h-[30px] w-[30px] rounded-full",
                severity === "Critical" ? "bg-primary-red" : "",
                severity === "High" ? "bg-primary-orange" : "",
                severity === "Medium" ? "bg-primary-yellow" : "",
                severity === "Low" ? "bg-primary-greenMedium" : "",
              ])}
            >
              <Image
                src="/add.svg"
                alt="Add Icon"
                width={24}
                height={24}
                className="m-auto h-6 w-6"
              />
            </DialogTrigger>
            <div className="h-5" />
          </div>
        </div>
      </div>

      <DialogContent className="!w-[90%] bg-dark-darkMain text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Vulnerability Review:
          </DialogTitle>
          <div className="h-[28px]" />

          <div
            className={cn([
              "relative !w-full rounded-lg p-4 pl-8",
              className,
              severity === "Critical" ? "bg-red-gradient" : "",
              severity === "High" ? "bg-orange-gradient" : "",
              severity === "Medium" ? "bg-yellow-gradient" : "",
              severity === "Low" ? "bg-green-gradient" : "",
            ])}
          >
            <div
              className={cn([
                "absolute left-0 top-0 h-full w-3 rounded-l-lg",
                severity === "Critical" ? "bg-primary-red" : "",
                severity === "High" ? "bg-primary-orange" : "",
                severity === "Medium" ? "bg-primary-yellow" : "",
                severity === "Low" ? "bg-primary-greenMedium" : "",
              ])}
            />
            <div className="flex gap-4">
              <h2 className="text-5xl font-extrabold text-textLight">0{id}</h2>
              <div className="flex w-full flex-col">
                <h3 className="text-2xl font-extrabold text-textLight">
                  {title}
                </h3>
                <div className="h-4" />
                <p className="h-[88px] text-textLight">{text}</p>
                <div className="h-5" />
                <div className="inline-flex justify-end gap-2">
                  <div
                    className={cn([
                      "rounded-full px-4 py-1",
                      severity === "Critical" ? "bg-primary-red" : "",
                      severity === "High" ? "bg-primary-orange" : "",
                      severity === "Medium" ? "bg-primary-yellow" : "",
                      severity === "Low" ? "bg-primary-greenMedium" : "",
                    ])}
                  >
                    <p className="font-black text-primary-redBold">
                      {severity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-2" />
          <div
            className={cn([
              "rounded-l-g rounded-lg p-2 !text-white",
              severity === "Critical" ? "border border-primary-red" : "",
              severity === "High" ? "border border-primary-orange" : "",
              severity === "Medium" ? " border border-primary-yellow" : "",
              severity === "Low" ? "border border-primary-greenMedium" : "",
            ])}
          >
            <div
              className={cn([
                "px-2 !text-white",
                severity === "Critical" ? "bg-primary-redBold" : "",
                severity === "High" ? "bg-primary-orangeBold" : "",
                severity === "Medium" ? "bg-primary-yellowBold " : "",
                severity === "Low" ? "bg-primary-greenBold " : "",
              ])}
            >
              <p>wip</p>
            </div>
          </div>
          <div className="h-[28px]" />
          <div className="flex items-end gap-2">
            <div className="w-1/2">
              <h3 className="text-2xl font-extrabold">
                AI certainty severity:
              </h3>
              <p>AI confidence level related to the vulnerability</p>
            </div>
            <div className="w-1/2">
              <Progress value={score} />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
