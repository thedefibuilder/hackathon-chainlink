import { api } from "@/trpc/react";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { cn } from "lib/utils";

type FileSelectTableProps = {
  repoOwner: string;
  repoName: string;
  setSelectedFiles: (files: string[]) => void;
};

export default function FileSelectTable({
  repoOwner,
  repoName,
  setSelectedFiles,
}: FileSelectTableProps) {
  const geTree = api.github.getRepoTree.useQuery({
    repoOwner,
    repoName,
  });

  const auditableFiles = useMemo(() => {
    return geTree.data?.filter((file) => file.isAuditable && !file.isFolder);
  }, [geTree.data]);

  useEffect(() => {
    if (auditableFiles) {
      setSelectedFiles(auditableFiles.map((file) => file.path!));
    }
  }, [auditableFiles]);

  return (
    <div>
      {auditableFiles?.map((file, index) => (
        <div
          key={index}
          className={cn("flex items-center gap-2", {
            "border-t border-primary-purpleMedium": index !== 0,
            "border-b border-primary-purpleMedium":
              index !== auditableFiles.length - 1,
          })}
        >
          <Image src="/file.svg" alt="File Icon" width={16} height={16} />
          <h1 className="py-2 text-xl text-white">{file.path}</h1>
        </div>
      ))}
      <div className="h-4"></div>
    </div>
  );
}
