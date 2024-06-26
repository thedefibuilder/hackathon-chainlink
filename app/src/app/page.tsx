import Link from "next/link";
import Image from "next/image";
import Button from "./_components/ui/button";
import DescriptionCard from "./_components/ui/description-card";
import HomeBanner from "./_components/ui/home-banner";
import { homeBannerData } from "content";
import "@rainbow-me/rainbowkit/styles.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-darkMain px-24 text-white">
      <div className="h-8" />
      <div className="rounded-b-[32px] bg-landingpage-gradient px-20 ">
        <div className="h-6" />

        <div className="flex w-full items-center justify-between">
          <div className="w-1/2">
            <Image
              className="h-full w-full"
              src="/defi_builder.png"
              alt="Block Magic Logo Logo"
              width={536}
              height={162}
            />
            <div className="h-2" />
            <div className="pl-40 text-[40px] font-semibold text-white">
              <p>Audited by AI</p>
              <p>Reviewed by Humans</p>
              <p>Deployed by You</p>
            </div>
            <div className="h-8" />
            <Link href="/audit">
              <Button className="border-gradient rounded-lg px-8 py-3 text-2xl">
                Audit Your Smart Contract
              </Button>
            </Link>
          </div>
          <div className="w-1/2">
            <div className="h-6" />

            <Image
              className="h-full w-full"
              src="/floating_macbook.svg"
              alt="Floating Macbook"
              width={458}
              height={404}
            />
          </div>
        </div>
        <div className="h-6" />
      </div>
      <div className="h-8" />
      <DescriptionCard />
      <div className="h-8" />
      <div className="flex flex-col gap-8">
        {homeBannerData.map((item, index) => {
          return (
            <HomeBanner
              key={index}
              title={item.title}
              text={item.text}
              imageSrc={item.imageSrc}
              link={item.link}
              linkText={item.linkText}
              isTwoCol={item.isTwoCol}
              align={item.align}
              secondText={item.secondText}
            />
          );
        })}
      </div>

      <div className="h-8" />
    </main>
  );
}
