import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" bg-dark-darkLight px-8">
      <div className="h-16" />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16" />
          <Image
            className="h-[96px] w-[74px]"
            src="/logo_footer.png"
            alt="Logo Footer"
            width={74}
            height={96}
          />
          <div className="text-textLight">
            <h2 className="text-[32px]">
              DeFi <span className="text-gradient">Builder</span>
            </h2>
            <p className="text-2xl font-bold">
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
            className="h-[73px] w-[241px]"
            src="/block_magic_logo.png"
            alt="Block Magic Logo Logo"
            width={241}
            height={73}
          />
        </div>
      </div>
      <div className="h-16" />
    </footer>
  );
}
