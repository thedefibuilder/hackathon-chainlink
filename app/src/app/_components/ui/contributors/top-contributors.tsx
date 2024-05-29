import { topContributors } from "content";
import { cn } from "lib/utils";
import Image from "next/image";

export default function TopContributors({
  onlyImage,
}: {
  onlyImage?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src="/deployed_code_account.svg"
          alt="Deployed Code Account"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <h2 className="text-2xl font-bold">Top Contributors</h2>
      </div>
      <div className="h-4" />
      <div className={cn(["flex gap-4", onlyImage ? "" : "flex-col"])}>
        {topContributors.map((item, index) => {
          return (
            <div className="flex items-center gap-2" key={index}>
              <Image
                src={item.imageSrc}
                alt="Contributors Image"
                width={64}
                height={64}
                className="h-16 w-16 rounded-lg"
              />
              <div className={cn(["flex flex-col", onlyImage ? "hidden" : ""])}>
                <p className="text-2xl font-bold">{item.name}</p>
                <div className="flex items-center gap-2">
                  <Image
                    src={item.reviewIcon}
                    alt="Review Icon"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <p className="font-bold">{item.review}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
