"use client";
import Image from "next/image";
import Button from "../button";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SmartContractSchema } from "types/schema";
import { Input } from "../Input";

export default function SmartContractForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof SmartContractSchema>>({
    resolver: zodResolver(SmartContractSchema),
    defaultValues: {},
  });
  const onSubmit = (data: z.infer<typeof SmartContractSchema>) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
      <div className="w-full">
        <div className="flex w-full gap-2">
          <Input
            type="text"
            placeholder="Give your code a Title"
            {...register("title")}
            error={errors.title?.message}
            className="w-full"
          />
          <div className="w-1/2">
            <Input
              type="text"
              placeholder="Give it an author name"
              {...register("authorName")}
              error={errors.authorName?.message}
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
        <div className="bg-custom-gradient rounded-b-[32px] px-6">
          wip
          <div className="h-40"></div>
          <div className="h-28"></div>
        </div>
      </div>
      <div className="relative flex w-1/4 flex-col ">
        <Image
          src="/starsIcons.png"
          alt="Stars Icons"
          width={160}
          height={111}
          className="absolute right-1 top-4 h-28 w-40"
        />
        <div className="h-3" />
        <p className="relative z-40 pr-6 text-2xl font-bold">
          Deliver safer code, and get audited in seconds with data rich AI.
        </p>
        <div className="h-[200px]"></div>
        <Button className="bg-primary-green text-dark-darkMain w-full rounded-lg px-4 py-2 text-2xl font-bold">
          Audit my Smart Contract
        </Button>
      </div>
    </form>
  );
}
