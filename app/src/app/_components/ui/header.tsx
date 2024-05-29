import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import UserDropDown from "./user-drop-down/user-drop-down";

const links = [
  {
    text: "Audit",
    link: "/audit",
  },
  {
    text: "Review",
    link: "/review-ai-audits",
  },
  {
    text: "Deploy",
    link: "/deploy-browser",
  },
];

const isLogin = true;

export default function Header() {
  return (
    <header className="fixed z-50 w-full bg-dark-darkMain">
      <div className="h-4" />
      <nav className="flex justify-between px-24">
        <div className="flex items-center gap-20">
          <Image src="/logo.png" alt="logo" width={108} height={108} />
          <ul className="flex items-center gap-8">
            {links.map((item, index) => {
              return (
                <li key={index} className="font-extrabold text-white">
                  <Link href={item.link}>{item.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        {isLogin ? (
          <UserDropDown />
        ) : (
          <Link href="/">
            <Button className="text-greenDark rounded-full bg-primary-green px-4 py-1 text-base font-bold">
              Log In
            </Button>
          </Link>
        )}
      </nav>
      <div className="h-4" />
    </header>
  );
}