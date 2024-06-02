import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" bg-dark-darkLight px-8">
      <div className="h-6" />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-6" />
          <Image
            className="h-[62px] w-[48px]"
            src="/logo_footer.png"
            alt="Logo Footer"
            width={48}
            height={62}
          />
          <div className="text-textLight">
            <h2 className="pb-0 text-xl">
              DeFi <span className="text-gradient">Builder</span>
            </h2>
            <p className="pb-0 text-2xl font-bold">
              The Go-To AI for Smart Contracts
            </p>
            <p className="text-[16px]">
              Built and trained by sweaty human hands.
            </p>
          </div>
        </div>
        <div className="text-textLight">
          <p className="text-[16px]">You saw it first on:</p>
          <Image
            className="h-[49px] w-[160px]"
            src="/block_magic_logo.png"
            alt="Block Magic Logo Logo"
            width={160}
            height={49}
          />
        </div>
      </div>
      <div className="h-6" />
    </footer>
  );
}
