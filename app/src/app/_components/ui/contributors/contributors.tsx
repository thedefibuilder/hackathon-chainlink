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
              <Image
                src={item.imageSrc}
                alt="Contributors Image"
                width={64}
                height={64}
                className="h-16 w-16 rounded-lg"
              />
              <div className="flex w-[70%] flex-col">
                <p className="text-2xl font-bold">{item.name}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.commentsIcon}
                      alt="Review Icon"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    <p className="font-bold">{item.comments}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.linesCodeIcon}
                      alt="Review Icon"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    <p className="font-bold">{item.linesCode}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-[20%] flex-col">
                <p className="text-2xl ">{item.date}</p>
                <div className="h-2" />
                <Button className="px2 w-1/2 rounded-full bg-primary-green py-1 font-bold text-dark-darkMain">
                  More
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
