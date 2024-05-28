import { cn } from "lib/utils";
import Image from "next/image";

export default function HeroBanner({
  title,
  text,
  img,
  imgAlt,
  imgWidth,
  imgHeight,
  breakTitle,
}: {
  title: string;
  text: string;
  img: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  breakTitle?: boolean;
}) {
  return (
    <div className="rounded-b-[32px] bg-custom-gradient px-6">
      <div className="h-6" />
      <div className="flex w-full justify-between">
        <div>
          <h1
            className={cn([
              "text-5xl font-bold text-primary-green",
              breakTitle ? "w-3/5" : "",
            ])}
          >
            {title}
          </h1>
        </div>
        <Image
          src={img}
          alt={imgAlt}
          width={imgWidth}
          height={imgHeight}
          className="w-[260px]"
        />
        <p className="w-80 text-[32px]">{text}</p>
      </div>
    </div>
  );
}
