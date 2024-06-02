"use client";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/drop-down";
import Button from "../../ui/button";
import DynamicFallback from "./dynamic-fallback";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { signInWithGithub } from "lib/github-sign-in";
import { useSession } from "next-auth/react";

const CopyAddress = dynamic(() => import("./actions/copy-address"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});
const QRCodeDialog = dynamic(() => import("./actions/dialog/qrcode"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});
const SwitchNetworkDialog = dynamic(
  () => import("./actions/dialog/switch-network"),
  {
    loading: () => <DynamicFallback />,
    ssr: false,
  },
);
const Disconnect = dynamic(() => import("./actions/disconnect"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});
const Faucet = dynamic(() => import("./actions/faucet"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});
const Balance = dynamic(() => import("./details/balance"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});
const ENSName = dynamic(() => import("./details/ens-name"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});
const Network = dynamic(() => import("./details/network"), {
  loading: () => <DynamicFallback />,
  ssr: false,
});

export default function WalletDropdown() {
  const { data, status } = useSession();
  const { isConnected: isWalletConnected } = useAccount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQRCodeDialogOpen, setIsQRCodeDialogOpen] = useState(false);
  const [isSwitchNetworkDialogOpen, setIsSwitchNetworkDialogOpen] =
    useState(false);

  const dropdownTriggerReference = useRef<HTMLButtonElement | null>(null);
  const focusReference = useRef<HTMLButtonElement | null>(null);

  const { address } = useAccount();
  const displayAddress = useMemo(
    () => `${address?.slice(0, 8)}...${address?.slice(-8)}`,
    [address],
  );
  const isConnected = useMemo(
    () => status === "authenticated" && isWalletConnected,
    [status, isWalletConnected],
  );

  function handleDropdownItemSelect() {
    focusReference.current = dropdownTriggerReference.current;
  }

  return (
    <DropdownMenu
      modal={false}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={data?.user.image ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback>0x</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-primary-purpleMedium bg-dark-darkMain text-textLight"
        hidden={isQRCodeDialogOpen || isSwitchNetworkDialogOpen}
        onCloseAutoFocus={(event) => {
          if (focusReference.current) {
            focusReference.current.focus();
            focusReference.current = null;

            event.preventDefault();
          }
        }}
      >
        <div className="h-4" />
        {isConnected ? (
          <DropdownMenuLabel className="border-b border-primary-purpleMedium pb-2 text-2xl">
            {data?.user.name ?? displayAddress}
          </DropdownMenuLabel>
        ) : (
          <div className="flex items-center justify-center ">
            <Button
              className="w-full rounded-full bg-primary-green px-4 py-1 text-xl font-bold text-dark-darkMain"
              onClick={signInWithGithub}
            >
              Connect Github
            </Button>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ENSName address={address} />
          <Balance address={address} />
          <Network />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-2xl">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Faucet />
          <CopyAddress address={address} />
          <QRCodeDialog
            isDialogOpen={isQRCodeDialogOpen}
            address={address}
            onDropdownSelect={handleDropdownItemSelect}
            onDialogOpenChange={(open) => setIsQRCodeDialogOpen(open)}
          />
          <SwitchNetworkDialog
            isDialogOpen={isSwitchNetworkDialogOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            onDropdownSelect={handleDropdownItemSelect}
            onDialogOpenChange={(open) => setIsSwitchNetworkDialogOpen(open)}
          />
          <Disconnect />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
