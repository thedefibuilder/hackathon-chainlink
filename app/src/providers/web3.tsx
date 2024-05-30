"use client";

import React from "react";

import type { PropsWithChildren } from "react";

import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider as Web3RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider as Web3WagmiProvider } from "wagmi";

import { env } from "@/env";
import { wagmiChains } from "@/config/chains";

const { wallets: defaultWallets } = getDefaultWallets();

const wagmiConfig = getDefaultConfig({
  appName: "DeFi Builder AI",
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  wallets: [
    ...defaultWallets,
    {
      groupName: "More",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: wagmiChains,
  ssr: true,
});

type TWeb3Provider = PropsWithChildren;

export function WagmiProvider({ children }: TWeb3Provider) {
  return <Web3WagmiProvider config={wagmiConfig}>{children}</Web3WagmiProvider>;
}

export function RainbowKitProvider({ children }: TWeb3Provider) {
  return <Web3RainbowKitProvider>{children}</Web3RainbowKitProvider>;
}
