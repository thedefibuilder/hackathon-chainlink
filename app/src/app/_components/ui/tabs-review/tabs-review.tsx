import { reviewContent, suggestedChanges, vulnerabilitiesCard } from "content";
import { cn } from "lib/utils";
import SuggestedCard from "../suggested-changes/suggested-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import VulnerabilitiesCard from "../vulnerabilities-card";
import TabsCard from "./tabs-card";

export default function TabsReview() {
  return (
    <>
      <Tabs className="flex h-full w-full items-start gap-5" defaultValue="0">
        <TabsList className="flex w-[30%] flex-col gap-4">
          {reviewContent.map((item, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="flex w-full flex-col rounded-[16px] border border-dark-darkLight !p-3  text-textLight"
            >
              <TabsCard
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                title={item.title}
                text={item.text}
                date={item.date}
                score={item.score}
                icons={item.icons}
                isTriggerCard
              />
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="rounded-[16px] border border-dark-darkLight !p-0 text-textLight">
          {reviewContent.map((item, index) => {
            return (
              <TabsContent
                key={`content-${index}`}
                value={index.toString()}
                className="m-0 p-4 pb-0"
              >
                <TabsCard
                  key={`card-${index}`}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  title={item.title}
                  text={item.text}
                  date={item.date}
                  score={item.score}
                  icons={item.icons}
                  haveCips
                  cips={item.cips}
                />

                <div className="h-10" />
                <h2 className="text-5xl font-bold text-textLight">
                  5 Vulnerabilites found
                </h2>
                <div className="h-16" />
                <div className="flex flex-wrap gap-2">
                  {vulnerabilitiesCard.map((item, index) => {
                    return (
                      <VulnerabilitiesCard
                        key={index}
                        id={index + 1}
                        title={item.title}
                        text={item.text}
                        severity={item.certainityScore}
                        score={10} // TODO: Change this to actual score
                        className={cn([
                          "mb-4 ",
                          index === vulnerabilitiesCard.length - 1
                            ? "mb-0 w-full"
                            : "w-[48%]",
                        ])}
                      />
                    );
                  })}
                </div>
                <div className="h-6" />
                <div className="flex w-full flex-col gap-4">
                  {suggestedChanges.map((item, index) => {
                    return (
                      <SuggestedCard
                        key={index}
                        title={item.title}
                        text={item.text}
                      />
                    );
                  })}
                </div>
                <div className="h-6" />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </>
  );
}
