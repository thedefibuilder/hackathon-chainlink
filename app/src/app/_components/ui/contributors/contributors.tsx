import { contributors } from "content";
import Image from "next/image";
import Button from "../button";

export default function Contributors() {
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
      <div className="flex flex-col gap-4 pt-4">
        {contributors.map((item, index) => {
          return (
            <div className="flex items-center gap-2" key={index}>
              <div className="flex w-[70%] items-center gap-2">
                <Image
                  src={item.imageSrc}
                  alt="Contributors Image"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg"
                />

                <div className="w-[60%] ">
                  <p className="text-2xl font-bold">{item.name}</p>
                  <div className="flex items-center gap-2  ">
                    <div className="flex items-center gap-1">
                      <Image
                        src={item.commentsIcon}
                        alt="Review Icon"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                      <p className="truncate">{item.comments}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src={item.linesCodeIcon}
                        alt="Review Icon"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                      <p className="truncate">{item.linesCode}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[35%]">
                <div className="flex flex-col items-end">
                  <p className="truncate text-2xl">{item.date}</p>
                  <div className="h-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
