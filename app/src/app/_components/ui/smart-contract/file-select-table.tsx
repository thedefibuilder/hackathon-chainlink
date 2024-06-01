import { api } from "@/trpc/react";
import { useEffect } from "react";

type FileSelectTableProps = {
  repoOwner: string;
  repoName: string;
};

export default function FileSelectTable({
  repoOwner,
  repoName,
}: FileSelectTableProps) {
  const getFiles = api.github.getRepoFiles.useQuery({
    repoOwner,
    repoName,
  });

  useEffect(() => {
    console.log("getFiles", getFiles.data);
  }, [getFiles.data]);

  return (
    <div>
      <h1>{getFiles.data?.length}</h1>
    </div>
  );
}
