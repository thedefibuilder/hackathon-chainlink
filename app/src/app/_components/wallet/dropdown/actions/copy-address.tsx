"use client";

import React from "react";

import type { Address } from "viem";

import { ClipboardCopy } from "lucide-react";

import SuccessToastContent from "@/app/_components/toast/success-toast-content";
import { useToast } from "@/app/_components/toast/use-toast";

import IconItem from "../icon-item";
import { DropdownMenuItem } from "@/app/_components/ui/drop-down";
import useCopyToClipboard from "lib/custom-hooks/use-copy-to-clipboard";

type TCopyAddress = {
  address: Address | undefined;
};

export default function CopyAddress({ address }: TCopyAddress) {
  const { isClipboardApiSupported, copyToClipboard } = useCopyToClipboard();

  const { toast } = useToast();

  if (!isClipboardApiSupported) {
    return null;
  }

  return (
    <DropdownMenuItem
      onClick={async () => {
        if (isClipboardApiSupported && address) {
          await copyToClipboard(address);

          toast({
            description: (
              <SuccessToastContent successText="Address copied successfully." />
            ),
          });
        }
      }}
    >
      <IconItem icon={ClipboardCopy} text="Copy Address" />
    </DropdownMenuItem>
  );
}
