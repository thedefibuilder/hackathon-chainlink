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
  score?: string;
  icons: { iconImage: string; iconAlt: string; value: string }[];
  cips?: string[];
  haveCips?: boolean;
  isTriggerCard?: boolean;
}) {
  const getRandomElement = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  return (
    <>
      <div className="h-2" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="w-[20%]">
            <Image src={imageSrc} alt={imageAlt} width={461} height={75} />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{title}</h3>
                {isTriggerCard ? null : <p>{date}</p>}
              </div>
              {score && (
                <div
                  className={cn([
                    " rounded-full px-4 py-1",
                    score === "Critical" ? "bg-primary-red" : "",
                    score === "High" ? "bg-primary-orange" : "",
                    score === "Medium" ? "bg-primary-yellow" : "",
                    score === "Low" ? "bg-primary-greenMedium" : "",
                  ])}
                >
                  <p className="text-center font-black text-primary-redBold">
                    {score}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isTriggerCard ? null : (
        <>
          <div className="h-2" />
          <div className="flex w-full items-center gap-2">
            {icons.map((icon, iconIndex) => (
              <div key={iconIndex} className="flex  items-center gap-2 pb-2">
                <Image
                  src={icon.iconImage}
                  alt={icon.iconAlt}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <p className="truncate font-bold text-textLight">
                  {icon.value}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      {haveCips ? (
        <>
          <div className="h-2" />
          <div className="flex w-full items-center gap-3 ">
            <div className="flex w-full items-center gap-2">
              {cips?.map((item, index) => (
                <div
                  key={index}
                  className={cn([
                    "inline-flex items-start gap-2 rounded-full border border-primary-purpleMedium px-3 py-1 font-bold text-primary-purpleMedium",
                  ])}
                >
                  <p className="-mt-0.5">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
      {isTriggerCard ? (
        <>
          {" "}
          <div className="h-6" />
          <div className="flex w-full items-center gap-2">
            {icons.map((icon, iconIndex) => (
              <div
                key={iconIndex}
                className="flex w-[40%] items-center gap-2 truncate pb-2"
              >
                <Image
                  src={icon.iconImage}
                  alt={icon.iconAlt}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <p className="truncate font-bold text-textLight">
                  {icon.value}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : null}
      <div className="h-3" />
    </>
  );
}
