import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HomeBanner({
  title,
  text,
  secondText,
  isTwoCol,
  imageSrc,
  link,
  linkText,
  align,
}: {
  title: string;
  text: string;
  secondText?: string;
  isTwoCol?: boolean;
  imageSrc: string;
  link: string;
  linkText: string;
  align?: string;
}) {
  return (
    <div className="rounded-r-[32px] bg-toright-gradient p-6 px-12">
      {isTwoCol ? (
        <div className="flex w-full items-center justify-evenly gap-28">
          <div className={cn([align === "textFirst" ? "order-2" : "order-1"])}>
            <Image
              src={imageSrc}
              alt="Laptop Image"
              width={500}
              height={300}
              className="h-[300px] w-[500px]"
            />
          </div>
          <div className={cn([align === "textFirst" ? "order-1" : "order-2 "])}>
            <h2 className="text-5xl font-bold">{title}</h2>
            <div className="h-2" />
            <p className=" text-2xl">{text}</p>
            <div className="h-[68px]" />
            <Link
              href={link}
              className="rounded-lg bg-primary-green px-4 py-2 text-2xl font-bold text-dark-darkMain"
            >
              {linkText}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center text-5xl font-bold">{title}</h2>
          <div className="h-10" />
          <div className="flex w-full gap-28">
            <p className=" w-2/5 text-2xl">{text}</p>
            <Image
              src={imageSrc}
              alt="Laptop Image"
              width={600}
              height={300}
              className="h-[300px] w-[600px]"
            />
            <div className="flex flex-col justify-between">
              <p className="text-2xl">{secondText}</p>
              <Link
                href={link}
                className="w-[55%] rounded-lg bg-primary-green px-4 py-2 text-2xl font-bold text-dark-darkMain"
              >
                {linkText}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
