import { deployCardContent } from "content";
import Link from "next/link";
import TopContributors from "../_components/ui/contributors/top-contributors";
import DeployBrowserSearch from "../_components/ui/deploy-browser-search/deploy-browser-search";
import DeployCard from "../_components/ui/deploy-card/deploy-card";
import HeroBanner from "../_components/ui/hero-banner";

export default function DeployBrowser() {
  return (
    <main className="min-h-screen bg-dark-darkMain px-24 text-white">
      <div className="h-8" />
      <HeroBanner
        title="Deploy Code"
        text="Find and deploy audited and reviewed code."
        img="/ai-review-exp.png"
        imgAlt="Deploy Code Banner"
        imgWidth={260}
        imgHeight={260}
        breakTitle
      />
      <div className="h-8" />
      <div className="flex w-full justify-between">
        <div className="w-[25%]">
          <DeployBrowserSearch />
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-6">
            {deployCardContent.map((item, index) => {
              return (
                <Link
                  key={`link-${index}`}
                  href={`/deploy-browser/${item.id}/deploy-contract`}
                >
                  <DeployCard
                    key={`card-${index}`}
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    title={item.title}
                    text={item.text}
                    date={item.date}
                    progress={item.progress}
                    icons={item.icons}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <TopContributors />
        </div>
      </div>
      <div className="h-8" />
    </main>
  );
}
