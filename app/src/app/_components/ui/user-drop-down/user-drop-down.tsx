import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "../drop-down";
import Button from "../button";
import ENSName from "../../wallet/dropdown/details/ens-name";

export default function UserDropDown() {
  const isGithubConnected = true;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/* TODO: isGithubConnected ? showAvatar : showDefaultAvatar */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] border-primary-purpleMedium bg-dark-darkMain text-textLight">
        {isGithubConnected ? (
          <DropdownMenuLabel className="border-b border-primary-purpleMedium pb-2 text-2xl">
            Roland Flavius
          </DropdownMenuLabel>
        ) : (
          <Button className="rounded-full bg-primary-green px-4 py-1 font-bold text-dark-darkMain">
            Connect Github
          </Button>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ENSName address="0x1234567890" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-l flex w-full  items-center justify-between font-bold">
              <p>Balance</p>
              <p>0.03 ETH</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-l flex w-full  items-center justify-between font-bold">
              <p>Network</p>
              <p>Ethereum</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuLabel className="border-b  border-primary-purpleMedium pb-2 text-xl">
          Actions
        </DropdownMenuLabel>
        <div className="h-2" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="text-l flex w-full  items-center gap-2 font-bold">
              <Image
                src="/copy_link.svg"
                alt="Copy Link Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <p>Copy Address</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-l flex w-full  items-center gap-2 font-bold">
              <Image
                src="/qrcode.svg"
                alt="QR Code Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <p>Address QR Code</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-l flex w-full  items-center gap-2 font-bold">
              <Image
                src="/replace.svg"
                alt="Replace Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <p>Switch Network</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-l flex w-full  items-center gap-2 font-bold text-error-600">
              <Image
                src="/logout.svg"
                alt="Logout Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <p>Disconect</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
