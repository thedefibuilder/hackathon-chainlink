"use client";
import { reviewContent, suggestedChanges, vulnerabilitiesCard } from "content";
import { cn } from "lib/utils";
import AddVulnerability from "../smart-contract-vulnerabilities/add-vulnerability";
import SuggestedCard from "../suggested-changes/suggested-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import VulnerabilitiesCard from "../vulnerabilities-card";
import TabsCard from "./tabs-card";
import { api } from "@/trpc/react";
import { useState } from "react";
import { mockAuditRequestIds } from "@/config/audit-ai";

const getRandomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export default function TabsReview({}) {
  const [requestId, setRequestId] = useState(
    getRandomElement(mockAuditRequestIds),
  );
  const getResponse = api.audit.getResponse.useQuery({
    id: requestId,
  });

  return (
    <>
      <Tabs className="flex h-full w-full items-start gap-5" defaultValue="0">
        <TabsList className="flex w-[30%] flex-col gap-4">
          {reviewContent.map((item, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              onClick={() => {
                setRequestId(getRandomElement(mockAuditRequestIds));
              }}
              className="flex w-full flex-col rounded-[16px] border border-dark-darkLight !p-3  text-textLight"
            >
              <TabsCard
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                title={item.title}
                text={item.text}
                date={item.date}
                score={item.score}
                cips={item.cips}
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
                  icons={item.icons}
                  haveCips
                  cips={item.cips}
                />

                <div className="h-10" />
                <div className="flex items-end gap-4">
                  <h2 className="w- text-5xl font-bold text-textLight">
                    {getResponse.data?.vulnerabilities.length || 0}{" "}
                    Vulnerabilites found
                  </h2>
                </div>

                <div className="h-10" />
                <div className="flex flex-wrap gap-2">
                  {getResponse.data?.vulnerabilities.map((item, index) => {
                    return (
                      <VulnerabilitiesCard
                        key={index}
                        id={index + 1}
                        title={item.title}
                        text={item.description}
                        severity={
                          item.severity.charAt(0).toUpperCase() +
                          item.severity.slice(1)
                        }
                        score={item.certainityScore}
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
                  {getResponse.data?.vulnerabilities.map((item, index) => {
                    return (
                      <SuggestedCard
                        key={index}
                        title={item.title}
                        text={item.recommendation}
                      />
                    );
                  })}
                </div>
                <div className="h-6" />
                <div className="w-full">
                  <h1 className="text-5xl font-bold text-textLight">
                    Add a new vulnerability
                  </h1>
                  <AddVulnerability />
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </>
  );
}
