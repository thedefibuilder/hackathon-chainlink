"use client";

import React from "react";

import { LogOut } from "lucide-react";
import { useDisconnect } from "wagmi";

import IconItem from "../icon-item";
import { DropdownMenuItem } from "@/app/_components/ui/drop-down";
import { signOutFromGithub } from "lib/github-sign-in";

export default function Disconnect() {
  const { disconnect } = useDisconnect();

  return (
    <DropdownMenuItem
      className="text-destructive hover:!bg-destructive hover:text-destructive-foreground focus:!bg-destructive focus:text-destructive-foreground"
      onClick={() => {
        disconnect();
        signOutFromGithub();
      }}
    >
      <IconItem icon={LogOut} text="Disconnect" />
    </DropdownMenuItem>
  );
}
