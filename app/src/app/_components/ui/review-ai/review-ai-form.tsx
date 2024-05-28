"use client";
import React from "react";
import Button from "../button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReviewAISchema } from "types/schema";
import { Input } from "../Input";
import Image from "next/image";

export default function ReviewAiForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm<z.infer<typeof ReviewAISchema>>({
    resolver: zodResolver(ReviewAISchema),
    defaultValues: {
      rewardCritical: 0,
      rewardHigh: 0,
      rewardMedium: 0,
      rewardLow: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof ReviewAISchema>) => {
    console.log(data);
  };

  const handleInputChange =
    (field: keyof z.infer<typeof ReviewAISchema>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(10000, Number(event.target.value));
      setValue(field, value);
    };

  const rewardCritical = watch("rewardCritical");
  const rewardHigh = watch("rewardHigh");
  const rewardMedium = watch("rewardMedium");
  const rewardLow = watch("rewardLow");

  const totalAmount = () => {
    const sum =
      parseInt(rewardCritical.toString()) +
      parseInt(rewardHigh.toString()) +
      parseInt(rewardMedium.toString()) +
      parseInt(rewardLow.toString());
    console.log(sum);
    return sum;
  };

  const totalRewardAmount = totalAmount();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex">
      <Image
        src="/coin.png"
        alt="coin"
        width={220}
        height={220}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
      />
      <div className="w-1/2">
        <label htmlFor="rewardCritical" className="font-medium">
          Rewards for{" "}
          <span className="font-bold text-primary-red">Critical</span>{" "}
          Vulnerabilities
        </label>
        <div className="h-2" />
        <Input
          type="number"
          placeholder="Type USDC amount"
          {...register("rewardCritical")}
          onChange={handleInputChange("rewardCritical")}
          error={errors.rewardCritical && errors.rewardCritical.message}
          className="w-full"
          max={10000}
        />
        <div className="h-8" />
        <label htmlFor="rewardHigh" className="font-medium">
          Rewards for{" "}
          <span className="font-bold text-primary-orange">High</span>{" "}
          Vulnerabilities
        </label>
        <div className="h-2" />
        <Input
          type="number"
          placeholder="Type USDC amount"
          {...register("rewardHigh")}
          onChange={handleInputChange("rewardHigh")}
          error={errors.rewardHigh && errors.rewardHigh.message}
          className="w-full"
          max={10000}
        />
        <div className="h-8" />
        <label htmlFor="rewardMedium" className="font-medium">
          Rewards for{" "}
          <span className="font-bold text-primary-yellow">Medium</span>{" "}
          Vulnerabilities
        </label>
        <div className="h-2" />
        <Input
          type="number"
          placeholder="Type USDC amount"
          {...register("rewardMedium")}
          onChange={handleInputChange("rewardMedium")}
          error={errors.rewardMedium && errors.rewardMedium.message}
          className="w-full"
          max={10000}
        />
        <div className="h-8" />
        <label htmlFor="rewardLow" className="font-medium">
          Rewards for <span className="font-bold text-primary-green">Low</span>{" "}
          Vulnerabilities
        </label>
        <div className="h-2" />
        <Input
          type="number"
          placeholder="Type USDC amount"
          {...register("rewardLow")}
          onChange={handleInputChange("rewardLow")}
          error={errors.rewardLow && errors.rewardLow.message}
          className="w-full"
          max={10000}
        />
      </div>
      <div className="w-1/2">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-5xl font-bold text-textLight">
            Total USDC to reward
          </h3>
          <div className="h-[52px]" />
          <h2 className="w-[200px] text-[128px] font-bold text-textLight">
            ${totalRewardAmount}
          </h2>
        </div>
        <div className="h-[52px]" />
        <div className="flex justify-end">
          <Button className="rounded-lg bg-primary-green px-4 py-2 text-2xl font-bold text-dark-darkMain">
            Deposit Rewards
          </Button>
        </div>
      </div>
    </form>
  );
}
