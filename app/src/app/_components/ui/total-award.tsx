import Image from "next/image";

export default function TotalAward() {
  return (
    <div className="flex ">
      <div className="w-1/4">
        <Image
          src="/coin.png"
          alt="coin"
          width={114}
          height={114}
          className="h-[114px] w-[114px]"
        />
      </div>
      <div className="w-4/6">
        <p className="text-[24px] font-medium">Total Awarded</p>
        <p className="text-5xl">
          <span className="font-bold">$2500</span> USDC
        </p>
      </div>
    </div>
  );
}
