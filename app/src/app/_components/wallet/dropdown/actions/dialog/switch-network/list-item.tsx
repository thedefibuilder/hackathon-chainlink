"use client";

import React from "react";

import { cn } from "lib/utils";
import Button from "@/app/_components/ui/button";
import Image from "next/image";
import { chainsConfig } from "@/config/chains";

type TListItem = {
  chainId: number;
  chainName: string;
  activeChainId: number;
  pendingChainId: number;
  isSwitchPending: boolean;
  isSwitchError: boolean;
  onSwitchChain: (chainId: number) => Promise<void>;
};

export default function ListItem({
  chainId,
  chainName,
  activeChainId,
  pendingChainId,
  isSwitchPending,
  isSwitchError,
  onSwitchChain,
}: TListItem) {
  const matchedChain = chainsConfig.find((item) => item.name === chainName);

  return (
    <li className="relative flex h-10 w-full items-center ">
      <div className="flex items-center gap-2">
        {matchedChain ? (
          <Image
            src={matchedChain.logo}
            alt={`${matchedChain.name} Logo`}
            width={30}
            height={30}
          />
        ) : null}

        <Button
          className={cn([
            " items-center  border-b border-b-transparent  py-1 text-xl hover:border-b-primary-purpleMedium",
            chainId === activeChainId ? "font-bold text-green-400" : "",
          ])}
          onClick={() => onSwitchChain(chainId)}
        >
          {chainName}
        </Button>
      </div>

      {chainId === activeChainId ? (
        <ChainStatus text="Connected" indicatorClassName="bg-green-400" />
      ) : chainId === pendingChainId ? (
        isSwitchPending ? (
          <ChainStatus
            text="Approve in Wallet"
            indicatorClassName="animate-pulse bg-yellow-400"
          />
        ) : isSwitchError ? (
          <ChainStatus text="Failed" indicatorClassName="bg-red-400" />
        ) : null
      ) : null}
    </li>
  );
}

type TChainStatus = {
  text: string;
  indicatorClassName: string;
};

function ChainStatus({ text, indicatorClassName }: TChainStatus) {
  return (
    <div className="pointer-events-none absolute right-4 flex items-center gap-x-2.5">
      <span className="text-s">{text}</span>
      <span className={cn("mt-1 h-2 w-2 rounded-full", indicatorClassName)} />
    </div>
  );
}
