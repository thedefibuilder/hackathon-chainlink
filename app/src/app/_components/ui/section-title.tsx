import { cn } from "lib/utils";
import Image from "next/image";

export default function SectionTitle({
  title,
  text,
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  titelStart,
}: {
  title: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  titelStart?: boolean;
}) {
  return (
    <div
      className={cn([
        "flex  gap-4 text-textLight ",
        titelStart ? "items-start" : "items-center",
      ])}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        className="h-12 w-12"
      />
      <div className="flex flex-col">
        <h2 className="text-[32px] font-bold">{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}
