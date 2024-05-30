import React from "react";

import type { ComponentProps } from "react";

import { cn } from "lib/utils";
import { Skeleton } from "../../ui/skeleton";

type TDynamicFallback = ComponentProps<"div">;

export default function DynamicFallback({
  className,
  ...otherProperties
}: TDynamicFallback) {
  return (
    <Skeleton
      className={cn("my-2 h-6 w-full rounded-md", className)}
      {...otherProperties}
    />
  );
}
