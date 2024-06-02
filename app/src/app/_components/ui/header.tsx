"use client";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletDropdown from "../wallet/dropdown";

const links = [
  {
    text: "Audit",
    link: "/audit",
  },
  {
    text: "Review",
    link: "/review-ai-audits",
  },
  {
    text: "Deploy",
    link: "/deploy-browser",
  },
];

export default function Header() {
  const { isConnected } = useAccount();
  return (
    <header className="fixed z-50 w-full bg-dark-darkMain">
      <div className="h-4" />
      <nav className="flex justify-between px-24">
        <div className="flex items-center gap-20">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={220} height={220} />
          </Link>
          <ul className="flex items-center gap-8">
            {links.map((item, index) => {
              return (
                <li key={index} className="font-extrabold text-white">
                  <Link href={item.link} className="text-xl">
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {isConnected ? (
          <WalletDropdown />
        ) : (
          <div className="text-greenDark rounded-full bg-primary-green px-4 py-1 text-base font-bold">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="h-8"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: "flex", gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ""}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        )}
      </nav>
      <div className="h-4" />
    </header>
  );
}
