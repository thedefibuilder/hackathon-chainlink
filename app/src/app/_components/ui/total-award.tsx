import Image from "next/image";

export default function TotalAward() {
  return (
    <div className="flex w-full justify-between">
      <div className="w-[35%]">
        <Image
          src="/coin.png"
          alt="coin"
          width={114}
          height={114}
          className="h-[114px] w-[114px]"
        />
      </div>
      <div className="w-[60%]">
        <p className="text-[24px] font-medium">Total Awarded</p>
        <p className="text-5xl">
          <span className="font-bold">$2500</span> USDC
        </p>
      </div>
    </div>
  );
}
