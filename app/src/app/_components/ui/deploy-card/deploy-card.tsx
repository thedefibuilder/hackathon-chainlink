import { tag } from "content";
import Image from "next/image";
import Button from "../button";
import TopContributors from "../contributors/top-contributors";
import { Progress } from "../progress";

export default function DeployCard({
  imageSrc,
  imageAlt,
  title,
  text,
  date,
  progress,
  icons,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  date: string;
  progress: number;
  icons: { iconImage: string; iconAlt: string; value: string }[];
}) {
  return (
    <div className="relative rounded-lg bg-dark-darkLight p-4">
      <div className="flex items-center gap-2">
        <div className="flex w-full items-start gap-3">
          <div className="w-1/5">
            <Image src={imageSrc} alt={imageAlt} width={461} height={75} />
          </div>
          <div className="flex w-[78%] flex-col">
            <div className="flex items-center justify-between gap-1">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-xl font-bold">{title}</h3>
                <p>{date}</p>
              </div>
            </div>
            <div className="flex">
              <p className=" w-full pt-2 text-left">{text}</p>
            </div>
            <div className="h-6"></div>
            <div className="flex w-full items-center gap-3 ">
              <div className="flex w-full items-center justify-between">
                {icons.map((icon, iconIndex) => (
                  <div key={iconIndex} className="flex items-center gap-2">
                    <Image
                      src={icon.iconImage}
                      alt={icon.iconAlt}
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    <p className="font-bold text-textLight">{icon.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-6" />
            <>
              <div className="rounded-lg bg-dark-darkMedium p-2">
                <TopContributors onlyImage />
              </div>
              <div className="h-2" />
              <div className="flex justify-between">
                <div className="flex w-full gap-2">
                  {tag.map((item, index) => {
                    return (
                      <div
                        className="rounded-full bg-dark-darkMedium px-3 py-1"
                        key={index}
                      >
                        <p className="font-bold">{item}</p>
                      </div>
                    );
                  })}
                </div>
                <Button className="inline-flex items-center gap-2 rounded-full bg-primary-green px-3 py-2 font-bold text-dark-darkMain">
                  More
                  <Image
                    src="/arrow_outward.svg"
                    alt="Arrow Outward"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                </Button>
              </div>
              <div className="h-4" />
              <div className="h-1 w-full border-b border-b-primary-purpleMedium"></div>
              <div className="h-10" />
              <div className="absolute bottom-4 left-0 h-8 w-full rounded-b-lg bg-dark-darkLight">
                <div className="flex items-center gap-4 pb-2">
                  <p className="font-medium-bold  pl-4">AI certainty score:</p>
                  <p className="rounded bg-primary-purpleMedium px-2 py-1 text-[12px] font-semibold text-textLight">
                    {progress}%
                  </p>
                </div>

                <Progress value={progress} className="rounded-b-lg" />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
