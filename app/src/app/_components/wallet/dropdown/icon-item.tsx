"use client";

import React from "react";

import type { LucideIcon } from "lucide-react";

import { cn } from "lib/utils";

type TIconItem = {
  icon: LucideIcon;
  text: string;
  className?: string;
};

export default function IconItem({ icon: Icon, text, className }: TIconItem) {
  return (
    <div className={cn("flex items-center gap-x-2.5 text-xl", className)}>
      <Icon size={17} />
      <span>{text}</span>
    </div>
  );
}
