import React from "react";

import type { ComponentProps } from "react";

import { cn } from "lib/utils";

type TSuccessToastContent = {
  successText: string;
} & ComponentProps<"div">;

export default function SuccessToastContent({
  children,
  className,
  successText,
  ...otherProperties
}: TSuccessToastContent) {
  return (
    <div
      className={cn("h-full w-full text-xl", className)}
      {...otherProperties}
    >
      {successText}
      <span className="absolute bottom-0 left-0 h-2 w-full bg-green-400" />
    </div>
  );
}
