"use client";

import React, { useMemo } from "react";

import { useChainId } from "wagmi";

import Label from "./label";
import { DropdownMenuLabel } from "@/app/_components/ui/drop-down";
import { chainsConfig } from "@/config/chains";

export default function Network() {
  const activeChainId = useChainId();

  const activeChain = useMemo(
    () => chainsConfig.find((chain) => chain.network.id === activeChainId),
    [activeChainId],
  );

  return (
    <DropdownMenuLabel>
      <Label property="Network" value={activeChain?.name ?? "N / A"} />
    </DropdownMenuLabel>
  );
}
