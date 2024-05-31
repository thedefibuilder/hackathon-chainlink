"use client";

import React, { useMemo } from "react";

import { RefreshCcw } from "lucide-react";
import { useChainId, useSwitchChain } from "wagmi";

import SuccessToastContent from "@/app/_components/toast/success-toast-content";
import { DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { useToast } from "@/app/_components/toast/use-toast";

import IconDropdownMenuItem from "../../../icon-item";
import ChainsList from "./chains-list";
import ForwardedDialog from "../index";

type TSwitchNetworkDialog = {
  isDialogOpen?: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDropdownSelect: () => void;
  onDialogOpenChange: (open: boolean) => void;
};

export default function SwitchNetworkDialog({
  isDialogOpen,
  setIsDropdownOpen,
  onDropdownSelect,
  onDialogOpenChange,
}: TSwitchNetworkDialog) {
  const activeChainId = useChainId();
  const { chains, variables, isPending, isError, reset, switchChainAsync } =
    useSwitchChain();

  const mainnetChains = useMemo(
    () => chains.filter((chain) => !!!chain.testnet),
    [chains],
  );
  const testnetChains = useMemo(
    () => chains.filter((chain) => !!chain.testnet),
    [chains],
  );

  const { toast } = useToast();

  async function onSwitchChain(chainId: number) {
    if (activeChainId === chainId) {
      return;
    }

    const newActiveChain = chains.find((chain) => chain.id === chainId);

    if (!newActiveChain) {
      return;
    }

    try {
      await switchChainAsync({ chainId });

      onDialogOpenChange(false);
      setIsDropdownOpen(false);

      toast({
        description: (
          <SuccessToastContent
            successText={`Network switched to ${newActiveChain.name}`}
          />
        ),
      });
    } catch (error: unknown) {
      if (
        error !== null &&
        error !== undefined &&
        typeof error === "object" &&
        "name" in error &&
        typeof error.name === "string"
      ) {
        let errorMessage = "";

        switch (error.name) {
          case "UserRejectedRequestError": {
            errorMessage = "The Switch Network request was rejected.";
            break;
          }
          case "SwitchChainError": {
            errorMessage = "A Switch Network request is already pending.";
            break;
          }
          default: {
            errorMessage = "Something horribly wrong happened.";
            break;
          }
        }

        toast({
          variant: "destructive",
          description: errorMessage,
        });
      }

      console.error("Error switching chain", error);
    }
  }

  return (
    <ForwardedDialog
      isDialogOpen={isDialogOpen}
      triggerChildren={
        <IconDropdownMenuItem icon={RefreshCcw} text="Switch Network" />
      }
      onDropdownSelect={onDropdownSelect}
      onDialogOpenChange={(open) => {
        onDialogOpenChange(open);
        reset();
      }}
    >
      <DialogHeader>
        <DialogTitle>Switch Network</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-y-3">
        {/* <ChainsList
          title="Mainnet"
          activeChainId={activeChainId}
          pendingChainId={variables?.chainId ?? 0}
          isSwitchPending={isPending}
          isSwitchError={isError}
          chainsList={mainnetChains}
          onSwitchChain={onSwitchChain}
        /> */}

        <ChainsList
          title="Testnet"
          activeChainId={activeChainId}
          pendingChainId={variables?.chainId ?? 0}
          isSwitchPending={isPending}
          isSwitchError={isError}
          chainsList={testnetChains}
          onSwitchChain={onSwitchChain}
        />
      </div>
    </ForwardedDialog>
  );
}
