import { cn } from "lib/utils";
import Image from "next/image";

export default function TabsCard({
  imageSrc,
  imageAlt,
  title,
  text,
  date,
  score,
  icons,
  cips,
  isTriggerCard,
  haveCips,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  date: string;
  score: string;
  icons: { iconImage: string; iconAlt: string; value: string }[];
  cips?: string[];
  haveCips?: boolean;
  isTriggerCard?: boolean;
}) {
  return (
    <>
      <div className="flex w-full items-start gap-3">
        <div className="w-1/5">
          <Image src={imageSrc} alt={imageAlt} width={461} height={75} />
        </div>
        <div className="flex w-[78%] flex-col">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <h3 className="text-xl font-bold">{title}</h3>
              <p>{date}</p>
            </div>
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
          <div className="flex">
            <p className=" w-full pt-2 text-left">{text}</p>
          </div>
          <div className="h-8" />

          {isTriggerCard ? null : (
            <div className="flex w-full items-center gap-3 ">
              <div className="flex w-full items-center gap-10">
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
          )}
          <div className="h-2" />

          {haveCips ? (
            <div className="flex w-full items-center gap-3 ">
              <div className="flex w-full items-center gap-2">
                {cips &&
                  cips.map((item, index) => (
                    <div
                      className={cn([
                        "inline-flex items-start gap-2 rounded-full border border-primary-purpleMedium px-3 py-1 font-bold text-primary-purpleMedium",
                      ])}
                    >
                      <p className="-mt-0.5">{item}</p>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
          <div className="h-6" />
        </div>
      </div>
      {isTriggerCard ? (
        <div className="flex w-full items-center gap-3 ">
          <div className="flex w-full items-center gap-10">
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
      ) : null}

      <div className="h-3" />
    </>
  );
}
