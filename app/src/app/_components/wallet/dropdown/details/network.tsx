"use client";

import React, { useMemo } from "react";

import { useChainId, useChains } from "wagmi";

import Label from "./label";
import { DropdownMenuLabel } from "@/app/_components/ui/drop-down";

export default function Network() {
  const chains = useChains();
  const activeChainId = useChainId();

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains],
  );

  return (
    <DropdownMenuLabel>
      <Label property="Network" value={activeChain?.name ?? "N / A"} />
    </DropdownMenuLabel>
  );
}
