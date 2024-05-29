"use client";
import Image from "next/image";
import Button from "../button";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DeployContractSchema } from "types/schema";
import { Input } from "../Input";
import { coins } from "content";

export default function DeployContractForm({
  selectedCoin,
}: {
  selectedCoin: string;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm<z.infer<typeof DeployContractSchema>>({
    resolver: zodResolver(DeployContractSchema),
    defaultValues: {
      coins: selectedCoin,
      title: "",
      nativeToken: "",
      trustedForwarder: "",
      tokenAddress: "",
      vrf: "",
    },
  });
  const selectedCoinData = coins.find((coin) => coin.value === selectedCoin);
  const onSubmit = (data: z.infer<typeof DeployContractSchema>) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="text"
          placeholder="Give your code a Title"
          label="Customize and deploy your contract"
          {...register("title")}
          error={errors.title?.message}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="address"
          label="nativeTokenWrapper"
          {...register("nativeToken")}
          error={errors.nativeToken?.message}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="address"
          label="trustedForwarder"
          {...register("trustedForwarder")}
          error={errors.trustedForwarder?.message}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="address"
          label="linkTokenAddress"
          {...register("tokenAddress")}
          error={errors.tokenAddress?.message}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="address"
          label="vrfV2Wrapper"
          {...register("vrf")}
          error={errors.vrf?.message}
          className="w-full"
        />
      </div>
      <div className="h-5" />
      <p className="text-xl">Deploying on </p>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={selectedCoinData?.imageSrc ?? ""}
            alt="Coin Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <h2 className="text-5xl font-bold">{selectedCoin}</h2>
        </div>
        <Button
          type="submit"
          className="rounded-lg bg-primary-green px-4 py-2 text-2xl font-bold text-dark-darkMain"
        >
          Deploy Smart Contract
        </Button>
      </div>
    </form>
  );
}
