import { useCallback, useEffect, useState } from "react";

export default function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [isClipboardApiSupported, setIsClipboardApiSupported] = useState(true);

  useEffect(() => {
    const isClipboardApiSupported = !!navigator.clipboard?.writeText;
    setIsClipboardApiSupported(isClipboardApiSupported);
  }, []);

  const copyToClipboard = useCallback(
    async (content: string) => {
      if (typeof window === "undefined") {
        return;
      }

      if (!isClipboardApiSupported) {
        return;
      }

      if (content === null || content === undefined) {
        return;
      }

      navigator.clipboard
        .writeText(content)
        .then(() => {
          setIsCopied(true);

          setTimeout(() => {
            setIsCopied(false);
          }, timeout);

          return null;
        })
        .catch((error) => console.error("ERROR CLIPBOARD", error));
    },
    [timeout, isClipboardApiSupported],
  );

  return { isCopied, isClipboardApiSupported, copyToClipboard };
}
