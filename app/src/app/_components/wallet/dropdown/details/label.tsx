import React from "react";

import type { ComponentProps } from "react";

import { cn } from "lib/utils";

type TLabel = ComponentProps<"div"> & {
  property: string;
  value: string;
};

export default function Label({
  property,
  value,
  className,
  ...otherProperties
}: TLabel) {
  return (
    <div className={cn("flex justify-between", className)} {...otherProperties}>
      <span className="text-muted-foreground">{property}</span>
      <span>{value}</span>
    </div>
  );
}
