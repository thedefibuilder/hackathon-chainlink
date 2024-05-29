"use client";

import Image from "next/image";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { SearchSchema } from "types/schema";
import Button from "./button";
import { cn } from "lib/utils";

export default function SearchReview() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = (data: z.infer<typeof SearchSchema>) => {
    console.log(data);
  };
  const search = watch("search");
  console.log(search);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <div className="w-[90%]">
          <Input
            type="text"
            placeholder="Search by keyword, user name or/and protocol name"
            {...register("search")}
            // error={errors.search && errors.search.message}
            className="w-full"
            iconLeft={
              <Image
                src="/search.svg"
                alt="Search Icon"
                width={24}
                height={24}
              />
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Button className="flex items-center gap-2 rounded-lg bg-dark-darkLight px-4 py-2 text-xl font-bold text-primary-purpleMedium">
              <Image src="/tune.svg" alt="Tune Icon" width={24} height={24} />
              Filters
            </Button>
          </div>
          <div>
            <Button className="rounded-lg bg-primary-green px-4 py-2 text-xl font-bold text-dark-darkMain">
              Search
            </Button>
          </div>
        </div>
      </form>
      <div className="h-8" />
      <div>
        <h3 className="text-2xl font-bold text-primary-green">Your search</h3>
        <div className="h-4" />
        {/* <p
          className={cn([
            "hidden border border-transparent text-primary-purpleMedium",
            search && search === ""
              ? ""
              : "inline-flex items-center gap-2 rounded-full border border-primary-purpleMedium px-3 py-1",
          ])}
        >
          {search}
        </p> */}
        <div className="flex w-full items-center gap-2">
          <div
            className={cn([
              "inline-flex items-start gap-2 rounded-full border border-primary-purpleMedium px-3 py-1 font-bold text-primary-purpleMedium",
            ])}
          >
            <p className="-mt-0.5">Swap</p>
            <Button>
              <Image src="/close.svg" alt="Close Icon" width={24} height={24} />
            </Button>
          </div>
          <div
            className={cn([
              "inline-flex items-start gap-2 rounded-full border border-primary-purpleMedium px-3 py-1 font-bold text-primary-purpleMedium",
            ])}
          >
            <p className="-mt-0.5">Swap</p>
            <Button>
              <Image src="/close.svg" alt="Close Icon" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
