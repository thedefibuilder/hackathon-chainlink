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
    <div className="rounded-r-[32px] bg-toright-gradient p-6">
      {isTwoCol ? (
        <div className="flex w-full items-center justify-evenly gap-28">
          <div
            className={cn([
              "w-1/2",
              align === "textFirst" ? "order-2" : "order-1",
            ])}
          >
            <Image
              src={imageSrc}
              alt="Laptop Image"
              width={500}
              height={300}
              className="h-full w-full"
            />
          </div>
          <div
            className={cn([
              "w-1/2",
              align === "textFirst" ? "order-1" : "order-2 ",
            ])}
          >
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
          <div className="flex w-full justify-between">
            <div className="w-[20%]">
              <p className="text-2xl">{text}</p>
            </div>
            <div className="w-[50%]">
              <Image
                src={imageSrc}
                alt="Laptop Image"
                width={600}
                height={300}
                className="h-full w-full "
              />
            </div>
            <div className="flex w-[30%] flex-col justify-between">
              <p className="text-2xl">{secondText}</p>
              <Link
                href={link}
                className="rounded-lg bg-primary-green px-4 py-2 text-center text-xl font-bold text-dark-darkMain"
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
