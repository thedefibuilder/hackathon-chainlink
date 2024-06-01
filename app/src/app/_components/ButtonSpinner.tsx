import React from "react";

import { Loader2 } from "lucide-react";

import { cn } from "lib/utils";
import Button, { ButtonProps } from "./ui/button";

type TButtonSpinner = {
  className?: string;
  isLoading: boolean;
  defaultContent: string;
  loadingContent: string;
};

export default function ButtonSpinner({
  isLoading,
  defaultContent,
  loadingContent,
  className,
  ...otherProperties
}: TButtonSpinner) {
  return (
    <Button disabled={isLoading} className={cn(className)} {...otherProperties}>
      {isLoading ? (
        <div className="flex items-center gap-x-2.5">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{loadingContent}</span>
        </div>
      ) : (
        <span>{defaultContent}</span>
      )}
    </Button>
  );
}
