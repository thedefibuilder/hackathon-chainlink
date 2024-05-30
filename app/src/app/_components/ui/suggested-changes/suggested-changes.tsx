import { suggestedChanges } from "content";
import SectionTitle from "../section-title";
import SuggestedCard from "./suggested-card";

export default function SuggestedChanges() {
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
      <div className="flex w-full gap-4">
        <div className="w-[70%] rounded-b-[32px] bg-custom-gradient px-6">
          wip
          <div className="h-40"></div>
          <div className="h-28"></div>
        </div>
        <div className="flex w-[40%] flex-col gap-4">
          {suggestedChanges.map((item, index) => {
            return (
              <SuggestedCard key={index} title={item.title} text={item.text} />
            );
          })}
        </div>
      </div>
    </>
  );
}
