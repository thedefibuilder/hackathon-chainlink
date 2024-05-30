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
import {
  QueryClientProvider as Web3QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

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
const queryClient = new QueryClient();

type TWeb3Provider = PropsWithChildren;

export default function Web3Provider({ children }: TWeb3Provider) {
  return (
    <Web3WagmiProvider config={wagmiConfig}>
      <Web3QueryClientProvider client={queryClient}>
        <Web3RainbowKitProvider>{children}</Web3RainbowKitProvider>
      </Web3QueryClientProvider>
    </Web3WagmiProvider>
  );
}
