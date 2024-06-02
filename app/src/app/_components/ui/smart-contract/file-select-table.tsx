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
  const geTree = api.github.getRepoTree.useQuery({
    repoOwner,
    repoName,
  });

  useEffect(() => {
    console.log("getFiles", geTree.data);
  }, [geTree.data]);

  return (
    <div>
      <h1>{geTree.data?.length}</h1>
    </div>
  );
}
