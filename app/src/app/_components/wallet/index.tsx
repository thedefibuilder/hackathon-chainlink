"use client";

import "@rainbow-me/rainbowkit/styles.css";

import React from "react";

import type { ComponentProps } from "react";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { cn } from "lib/utils";

import WalletDropdown from "./dropdown";
import Button from "../ui/button";

type TWallet = ComponentProps<"button">;

export default function Wallet({ className }: TWallet) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return <WalletDropdown />;
  }

  return (
    <Button className={cn(className)} onClick={openConnectModal}>
      t
    </Button>
  );
}
