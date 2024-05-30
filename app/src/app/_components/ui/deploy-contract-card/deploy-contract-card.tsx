"use client";
import { useState } from "react";
import { coins } from "content";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { type DeployContractSchema } from "types/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import DeployContractForm from "./deploy-form";
import { type z } from "zod";
import { cn } from "lib/utils";

export default function DeployContracCard() {
  const [selectedCoin, setSelectedCoin] = useState(coins?.[0]?.value ?? "");
  const { setValue } = useForm<z.infer<typeof DeployContractSchema>>({});

  return (
    <div className="rounded-[24px] bg-custom-gradient">
      <div className="h-6" />
      <Tabs defaultValue={selectedCoin}>
        {coins.map((item, index) => (
          <TabsContent value={item.value} key={index}>
            <div className="flex items-center gap-4 pl-2">
              <div className="w-[20%]">
                <Image
                  src={item.imageSrc}
                  alt="Coin Logo"
                  width={92}
                  height={92}
                  className="h-[92px] w-[92px]"
                />
              </div>
              <div className="w-[80%] text-textLight">
                <h2 className="text-4xl font-bold">{item.value}</h2>
                <div className="h-1" />
                <p className="text-xl">Deploy audited and reviewed code.</p>
              </div>
            </div>
          </TabsContent>
        ))}
        <div className="h-6" />

        <h4 className="px-3 text-xl text-textLight">
          Select your Smart Contract Chain
        </h4>
        <div className="h-4" />

        <TabsList className="!p-0">
          {coins.map((item, index) => (
            <TabsTrigger
              value={item.value}
              key={index}
              onClick={() => {
                setSelectedCoin(item.value);
                setValue("coins", item.value);
              }}
              type="button"
              className="!p-1"
            >
              <div
                className={cn([
                  "ring-ring rounded border border-dark-darkLight p-2",
                  selectedCoin === item.value
                    ? " border-primary-purpleMedium bg-dark-darkMain"
                    : "",
                ])}
              >
                <Image
                  src={item.imageSrc}
                  alt="Coin Logo"
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px]"
                />
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="h-6" />
      <div className="flex w-full justify-end pr-4">
        <Dialog>
          <DialogTrigger
            type="button"
            className="rounded-lg bg-primary-green px-4 py-2 text-2xl font-bold text-dark-darkMain"
          >
            Deploy Smart Contract
          </DialogTrigger>
          <DialogContent className="!w-[90%] bg-dark-darkMain text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[32px] font-bold">
                <Image
                  src="/deployed_code.svg"
                  alt="Deployed Code Icon"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                Deploy Smart Contract
              </DialogTitle>
            </DialogHeader>
            <DeployContractForm selectedCoin={selectedCoin} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-6" />
    </div>
  );
}
