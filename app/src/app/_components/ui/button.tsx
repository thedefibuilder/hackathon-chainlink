import { MouseEventHandler, ReactNode } from "react";

export default function Button({
  onClick,
  children,
  className,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
