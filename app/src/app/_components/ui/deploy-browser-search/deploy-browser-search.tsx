"use client";
import Image from "next/image";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SearchSchema } from "types/schema";
import { Input } from "../Input";
import { protocolTag, reportTag } from "content";

export default function DeployBrowserSearch() {
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
            placeholder="Search by keyword"
            {...register("search")}
            error={errors.search?.message}
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
      </form>
      <div className="h-4" />
      <div>
        <h4 className="border-b border-b-primary-purpleMedium py-2 font-medium">
          Report Tag:
        </h4>
        <div className="flex w-full flex-wrap gap-2">
          {reportTag.map((item, index) => {
            return (
              <div
                className="rounded-full bg-dark-darkMedium px-3 py-1"
                key={index}
              >
                <p className="font-bold">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-4" />
      <div>
        <h4 className="border-b border-b-primary-purpleMedium py-2 font-medium">
          Protocol Category
        </h4>
        <div className="flex w-full flex-wrap gap-2">
          {protocolTag.map((item, index) => {
            return (
              <div
                className="inline-flex items-center gap-1 rounded-full bg-dark-darkMedium px-3 py-1"
                key={index}
              >
                <Image
                  src={item.iconSrc}
                  alt="icon"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <p className="font-bold">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
