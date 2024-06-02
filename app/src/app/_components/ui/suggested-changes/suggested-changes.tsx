import { suggestedChanges } from "content";
import SectionTitle from "../section-title";
import SuggestedCard from "./suggested-card";
import { api } from "@/trpc/react";

type SuggestedCardProps = {
  requestId: number;
};

export default function SuggestedChanges({ requestId }: SuggestedCardProps) {
  const getResponse = api.audit.getResponse.useQuery({
    id: requestId,
  });

  return (
    <>
      <SectionTitle
        title="Suggested changes"
        text="Find the changes we suggest to follow and make your smart contract vulnerability proof"
        imgSrc="/folder_data.svg"
        imgAlt="Folder Data"
        imgWidth={48}
        imgHeight={48}
      />
      <div className="h-8" />

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
    </>
  );
}
