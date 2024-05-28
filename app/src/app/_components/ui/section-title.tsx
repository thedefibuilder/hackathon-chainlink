import Image from "next/image";

export default function SectionTitle({
  title,
  text,
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
}: {
  title: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
}) {
  return (
    <div className="text-textLight flex items-center gap-4 ">
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
