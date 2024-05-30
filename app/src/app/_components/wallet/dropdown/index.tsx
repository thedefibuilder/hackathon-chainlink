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

  function handleDropdownItemSelect() {
    focusReference.current = dropdownTriggerReference.current;
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setIsDropdownOpen((previousState) => !previousState)}
        >
          {displayAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        hidden={isQRCodeDialogOpen || isSwitchNetworkDialogOpen}
        onCloseAutoFocus={(event) => {
          if (focusReference.current) {
            focusReference.current.focus();
            focusReference.current = null;

            event.preventDefault();
          }
        }}
      >
        <DropdownMenuLabel>Details</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ENSName address={address} />
          <Balance address={address} />
          <Network />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
