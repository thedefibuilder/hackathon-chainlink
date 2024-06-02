"use client";
import Image from "next/image";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SmartContractSchema } from "types/schema";
import { Input } from "../Input";
import { api } from "@/trpc/react";
import ButtonSpinner from "../../ButtonSpinner";
import { useEffect } from "react";
import FileSelectTable from "./file-select-table";

export default function SmartContractForm() {
  const sendRequest = api.audit.createRequest.useMutation();
  const getRepos = api.github.getUserRepos.useQuery();

  useEffect(() => {
    console.log("get Repos fetch ", getRepos.data);
  }, [getRepos.data]);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof SmartContractSchema>>({
    resolver: zodResolver(SmartContractSchema),
    // Mock Values, please change later !!!
    defaultValues: {
      title: "Bombaclat Smart Contract",
      repoLink: "https://github.com/bel0v/eth-global-london",
      filesInScope: [
        "contracts/contracts/MockERC20.sol",
        "contracts/contracts/MomentFactory.sol",
      ],
      tags: ["bombaclat", "smart contract"],
      categories: ["bombaclat"],
    },
  });
  const onSubmit = (data: z.infer<typeof SmartContractSchema>) => {
    const [repoOwner, repoName] = data.repoLink.split("/").slice(-2);
    if (!repoOwner || !repoName) return console.error("Invalid Repo Link");

    sendRequest.mutate({
      title: data.title,
      repoOwner,
      repoName,
      filesInScope: data.filesInScope,
      tags: data.tags,
      categories: data.categories,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
      <div className="w-full">
        <div className="flex w-full gap-2">
          <div className="w-[60%]">
            <Input
              type="text"
              placeholder="Give your code a Title"
              {...register("title")}
              error={errors.title?.message}
              className="w-full"
            />
          </div>
          <div className="w-[40%]">
            <Input
              type="text"
              placeholder="Repository Link"
              {...register("repoLink")}
              error={errors.repoLink?.message}
              className="w-full "
              iconLeft={
                <Image
                  src="/clinical_notes.png"
                  alt="clinical_notes.png"
                  width={24}
                  height={24}
                />
              }
            />
          </div>
        </div>
        <div className="h-6" />
        <div className="rounded-b-[32px] bg-custom-gradient px-6">
          {getRepos.isFetched && getRepos.data && (
            <FileSelectTable
              repoOwner={getRepos.data[0]!.owner}
              repoName={getRepos.data[0]!.name}
            />
          )}
          <div className="h-40"></div>
          <div className="h-28"></div>
        </div>
      </div>
      <div className="relative flex w-1/2 flex-col justify-between">
        <Image
          src="/starsIcons.png"
          alt="Stars Icons"
          width={160}
          height={111}
          className="absolute -right-8 top-4 h-28 w-40"
        />
        <p className="relative z-40 pr-6 text-2xl font-bold">
          Deliver safer code, and get audited in seconds with data rich AI.
        </p>

        <ButtonSpinner
          isLoading={sendRequest.isPending}
          defaultContent="Audit My Smart Contract"
          loadingContent="Loading..."
          className="w-full rounded-lg bg-primary-green px-4 py-2 text-2xl font-bold text-dark-darkMain"
        />
      </div>
    </form>
  );
}
