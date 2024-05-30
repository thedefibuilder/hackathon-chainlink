"use client";

import React from "react";

import { cn } from "lib/utils";
import Button from "@/app/_components/ui/button";

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
  return (
    <li className="relative flex h-10 w-full items-center justify-end">
      <Button
        className="w-full items-center justify-start"
        onClick={() => onSwitchChain(chainId)}
      >
        {chainName}
      </Button>

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
      <span className="text-sm">{text}</span>
      <span className={cn("h-2 w-2 rounded-full", indicatorClassName)} />
    </div>
  );
}
