"use client";

import React from "react";

import type { Chain } from "viem";

import ListItem from "./list-item";

type TChainsList = {
  title: string;
  activeChainId: number;
  pendingChainId: number;
  isSwitchPending: boolean;
  isSwitchError: boolean;
  chainsList: Chain[];
  onSwitchChain(chainId: number): Promise<void>;
};

export default function ChainsList({
  title,
  activeChainId,
  pendingChainId,
  isSwitchPending,
  isSwitchError,
  chainsList,
  onSwitchChain,
}: TChainsList) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <h3 className="text-xl text-primary-purpleMedium">{title}</h3>

      <ul className="flex flex-col gap-y-2.5 pl-1.5">
        {chainsList.map((chain) => (
          <ListItem
            key={chain.id}
            chainId={chain.id}
            chainName={chain.name}
            activeChainId={activeChainId}
            pendingChainId={pendingChainId}
            isSwitchPending={isSwitchPending}
            isSwitchError={isSwitchError}
            onSwitchChain={onSwitchChain}
          />
        ))}
      </ul>
    </div>
  );
}
