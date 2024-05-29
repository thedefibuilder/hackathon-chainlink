import "@/styles/globals.css";
import { Darker_Grotesque } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/ui/header";
import Footer from "./_components/ui/footer";
import NextAuthProvider from "@/providers/next-auth";

export const metadata = {
  title: "DeFi Builder AI",
  description: "Audit your smart contract in seconds with DeFi Builder AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const darkerGrotesque = Darker_Grotesque({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={darkerGrotesque.className}>
        <Header />
        <div className="h-16" />
        <NextAuthProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
