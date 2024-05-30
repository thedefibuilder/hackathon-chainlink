"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion";
import SectionTitle from "../section-title";
import { suggestedChanges } from "content";
import SuggestedCard from "./suggested-card";
import { cn } from "lib/utils";
import { useState } from "react";

export default function SuggestedAccordion() {
  // Update the state to be of type string | null
  const [openItem, setOpenItem] = useState<string | null>(null);

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
      <div className="h-6" />
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-4"
        onValueChange={(value) => setOpenItem(value)}
      >
        {suggestedChanges.map((item, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger
              className={cn(
                " bg-dark-darkLight",
                openItem === index.toString()
                  ? "border-dark-borderColor rounded-t-lg"
                  : "rounded-lg",
              )}
            >
              <SuggestedCard title={item.title} text={item.text} isAccoriodn />
            </AccordionTrigger>

            <AccordionContent className="mb-4 rounded-b-lg bg-dark-darkLight px-4">
              <div className="h-2" />
              <p className="text-2xl font-bold text-textLight">
                Suggested code:
              </p>
              <div className="h-2" />
              wip
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="h-4" />
    </>
  );
}
