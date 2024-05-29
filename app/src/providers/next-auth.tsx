"use client";

import React from "react";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

type TSessionProviderProperties = PropsWithChildren;

export default function NextAuthProvider({
  children,
}: TSessionProviderProperties) {
  return <SessionProvider>{children}</SessionProvider>;
}
