"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number | undefined;
  showValue?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, showValue = false, ...props }, ref) => (
  <div className="relative w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden bg-progress-transparetn-gradient",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn([
          "relative h-full w-full flex-1 transition-all",
          value && value < 80
            ? "bg-progress-gradient-low"
            : "bg-progress-gradient",
        ])}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      ></ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
    {showValue && (
      <p
        className="absolute -top-10 text-[32px] font-extrabold text-textLight transition-all"
        style={{ left: `${value}%`, transform: "translateX(-50%)" }}
      >
        {value}%
      </p>
    )}
  </div>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
