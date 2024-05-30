"use client";

import React, { useMemo } from "react";

import { Coins } from "lucide-react";
import Link from "next/link";
import { useChainId, useChains } from "wagmi";

import IconItem from "../icon-item";
import { DropdownMenuItem } from "@/app/_components/ui/drop-down";

const FAUCET_URL = "https://www.alchemy.com/faucets";

export default function Faucet() {
  const chains = useChains();
  const activeChainId = useChainId();

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains],
  );
  const isActiveChainTestnet = useMemo(
    () => !!activeChain?.testnet,
    [activeChain],
  );

  if (!isActiveChainTestnet) {
    return null;
  }

  return (
    <DropdownMenuItem>
      <Link href={FAUCET_URL} target="_blank" className="w-full">
        <IconItem icon={Coins} text="Faucet" />
      </Link>
    </DropdownMenuItem>
  );
}
