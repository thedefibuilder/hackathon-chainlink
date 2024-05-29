import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  onClick,
  children,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}
