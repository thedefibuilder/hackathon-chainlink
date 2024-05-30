"use client";

import React, { useEffect, useState } from "react";

import type { Address } from "viem";

import { QrCode } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";

import ForwardedDialog from ".";
import IconDropdownMenuItem from "../../icon-item";

type TQRCodeDialog = {
  isDialogOpen?: boolean;
  address: Address | undefined;
  onDropdownSelect: () => void;
  onDialogOpenChange: (open: boolean) => void;
};

export default function QRCodeDialog({
  isDialogOpen,
  address,
  onDropdownSelect,
  onDialogOpenChange,
}: TQRCodeDialog) {
  const [base64QRCode, setBase64QRCode] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setBase64QRCode(null);
      return;
    }

    QRCode.toDataURL(address)
      .then((imageBase64) => {
        setBase64QRCode(imageBase64);
        return null;
      })
      .catch((error) => {
        console.error("Error generating address QRCode", error);
        setBase64QRCode(null);
      });
  }, [address]);

  if (!base64QRCode) {
    return null;
  }

  return (
    <ForwardedDialog
      isDialogOpen={isDialogOpen}
      triggerChildren={
        <IconDropdownMenuItem icon={QrCode} text="Address QR Code" />
      }
      onDropdownSelect={onDropdownSelect}
      onDialogOpenChange={onDialogOpenChange}
    >
      <DialogHeader>
        <DialogTitle>QR Code</DialogTitle>
        <DialogDescription>
          Representation of your address as a QR Code.
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center justify-center">
        <Image
          src={base64QRCode}
          alt="Address QR Code"
          width={480}
          height={480}
          className="w-[30rem] rounded-md"
        />
      </div>
    </ForwardedDialog>
  );
}
