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
  score,
  className,
}: {
  id: number;
  title: string;
  text: string;
  score: string;
  className?: string;
}) {
  return (
    <Dialog>
      <div
        className={cn([
          "relative w-[32.2%] rounded-lg p-4 pl-8",
          className,
          score === "Critical" ? "bg-red-gradient" : "",
          score === "High" ? "bg-orange-gradient" : "",
          score === "Medium" ? "bg-yellow-gradient" : "",
          score === "Low" ? "bg-green-gradient" : "",
        ])}
      >
        <div
          className={cn([
            "absolute left-0 top-0 h-full w-3 rounded-l-lg",
            score === "Critical" ? "bg-primary-red" : "",
            score === "High" ? "bg-primary-orange" : "",
            score === "Medium" ? "bg-primary-yellow" : "",
            score === "Low" ? "bg-primary-greenMedium" : "",
          ])}
        />
        <div className="flex gap-4">
          <h2 className="text-5xl font-extrabold text-textLight">0{id}</h2>
          <div className="flex w-full flex-col">
            <h3 className="text-2xl font-extrabold text-textLight">{title}</h3>
            <div className="h-4" />
            <p className="h-[88px] text-textLight">{text}</p>
            <div className="h-5" />
            <div className="inline-flex justify-end gap-2">
              <div
                className={cn([
                  "rounded-full px-4 py-1",
                  score === "Critical" ? "bg-primary-red" : "",
                  score === "High" ? "bg-primary-orange" : "",
                  score === "Medium" ? "bg-primary-yellow" : "",
                  score === "Low" ? "bg-primary-greenMedium" : "",
                ])}
              >
                <p className="font-black text-primary-redBold">{score}</p>
              </div>
              <DialogTrigger
                className={cn([
                  "h-[30px] w-[30px] rounded-full",
                  score === "Critical" ? "bg-primary-red" : "",
                  score === "High" ? "bg-primary-orange" : "",
                  score === "Medium" ? "bg-primary-yellow" : "",
                  score === "Low" ? "bg-primary-greenMedium" : "",
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
              score === "Critical" ? "bg-red-gradient" : "",
              score === "High" ? "bg-orange-gradient" : "",
              score === "Medium" ? "bg-yellow-gradient" : "",
              score === "Low" ? "bg-green-gradient" : "",
            ])}
          >
            <div
              className={cn([
                "absolute left-0 top-0 h-full w-3 rounded-l-lg",
                score === "Critical" ? "bg-primary-red" : "",
                score === "High" ? "bg-primary-orange" : "",
                score === "Medium" ? "bg-primary-yellow" : "",
                score === "Low" ? "bg-primary-greenMedium" : "",
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
                      score === "Critical" ? "bg-primary-red" : "",
                      score === "High" ? "bg-primary-orange" : "",
                      score === "Medium" ? "bg-primary-yellow" : "",
                      score === "Low" ? "bg-primary-greenMedium" : "",
                    ])}
                  >
                    <p className="font-black text-primary-redBold">{score}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-2" />
          <div
            className={cn([
              "rounded-l-g rounded-lg p-2 !text-white",
              score === "Critical" ? "border border-primary-red" : "",
              score === "High" ? "border border-primary-orange" : "",
              score === "Medium" ? " border border-primary-yellow" : "",
              score === "Low" ? "border border-primary-greenMedium" : "",
            ])}
          >
            <div
              className={cn([
                "px-2 !text-white",
                score === "Critical" ? "bg-primary-redBold" : "",
                score === "High" ? "bg-primary-orangeBold" : "",
                score === "Medium" ? "bg-primary-yellowBold " : "",
                score === "Low" ? "bg-primary-greenBold " : "",
              ])}
            >
              <p>wip</p>
            </div>
          </div>
          <div className="h-[28px]" />
          <div className="flex items-end gap-2">
            <div className="w-1/2">
              <h3 className="text-2xl font-extrabold">AI certainty score:</h3>
              <p>AI confidence level related to the vulnerability</p>
            </div>
            <div className="w-1/2">
              <Progress value={60} />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
