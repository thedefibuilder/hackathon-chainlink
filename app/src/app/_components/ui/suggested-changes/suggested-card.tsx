import { cn } from "lib/utils";
import Image from "next/image";

export default function SuggestedCard({
  title,
  text,
  isAccoriodn,
}: {
  title: string;
  text: string;
  isAccoriodn?: boolean;
}) {
  return (
    <div className="min-h-[104px] rounded-lg bg-dark-darkLight p-3">
      <div className="flex items-center gap-2">
        <Image
          src="/priority.svg"
          alt="priority"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <h2 className="text-2xl font-bold text-primary-green">{title}</h2>
      </div>
      <div className={cn(["pl-8 text-left", isAccoriodn ? "w-4/5" : ""])}>
        {text}
      </div>
    </div>
  );
}
