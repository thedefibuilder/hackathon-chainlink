import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { cn } from "lib/utils";

const inputVariants = cva([
  "flex w-full rounded h-11 bg-dark-darkLight pl-2 border border-dark-darkLight",
  "placeholder:pl-2 placeholder:text-primary-purpleMedium",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "transition-colors",
]);

export type InputProps = {
  label?: string;
  error?: string;
  iconLeft?: JSX.Element;
} & Required<VariantProps<typeof inputVariants>> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  Required<Pick<React.InputHTMLAttributes<HTMLInputElement>, "type">>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, iconLeft, error, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <label htmlFor={props.name}>{label}</label>
        <div className="relative">
          {iconLeft && (
            <div className={cn(["absolute top-1/2 -translate-y-1/2 pl-3"])}>
              {iconLeft}
            </div>
          )}
          <input
            type={type}
            className={clsx(
              inputVariants({ className }),
              error
                ? "border-error-500 focus:border-error-500 focus:ring-error-100 focus:ring-2"
                : "",

              iconLeft ? "pl-[38px]" : "",
            )}
            ref={ref}
            {...props}
          />
        </div>

        {error && <p className={clsx("text-error-500 mt-[2px]")}>{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
