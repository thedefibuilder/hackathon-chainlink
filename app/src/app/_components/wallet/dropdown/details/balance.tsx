"use client";

import React, { useMemo } from "react";

import type { Address } from "viem";

import { formatUnits } from "viem";
import { useBalance } from "wagmi";

import Label from "./label";
import { DropdownMenuLabel } from "@/app/_components/ui/drop-down";

type TENSName = {
  address: Address | undefined;
};

export default function Balance({ address }: TENSName) {
  const { isLoading, data } = useBalance({ address });

  const walletBalance = useMemo(
    () => formatUnits(data?.value ?? 0n, data?.decimals ?? 0),
    [data?.value, data?.decimals],
  );

  const fullWalletBalance = useMemo(
    () => `${walletBalance} ${data?.symbol}`,
    [walletBalance, data?.symbol],
  );

  const truncatedWalletBalance = useMemo(
    () => `${walletBalance.slice(0, 4)} ${data?.symbol}`,
    [walletBalance, data?.symbol],
  );

  return (
    <DropdownMenuLabel>
      <Label
        title={fullWalletBalance}
        property="Balance"
        value={isLoading ? "Calculating" : truncatedWalletBalance}
      />
    </DropdownMenuLabel>
  );
}
