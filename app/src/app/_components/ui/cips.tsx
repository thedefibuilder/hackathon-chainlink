import { cn } from "lib/utils";

export default function Cips({
  img,
  title,
  version,
  className,
  withBorder,
  square,
}: {
  img?: JSX.Element;
  title: string;
  className?: string;
  withBorder?: boolean;
  square?: boolean;
  version?: string;
}) {
  return (
    <div
      className={cn([
        "font-bold text-dark-darkMain",
        className,
        withBorder
          ? "inline-flex items-start gap-2 rounded-full border border-primary-purpleMedium px-3 py-1 font-bold text-primary-purpleMedium"
          : "",
        square
          ? "inline-flex items-center gap-4 rounded bg-dark-darkLight px-2 py-1 text-textLight"
          : "",
      ])}
    >
      {img ? img : null}
      <p className={cn([version ? "d-inline" : "hidden"])}>{version}</p>
      <p>{title}</p>
    </div>
  );
}
