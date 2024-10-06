"use client";
// can be used for recoil:app state mgt lib or themeprovider:light dark mode wala
// learn context api in react
import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
// there is a down side of adding any provider in layout.tsx by
// directly wrapping childrem
// bcz sessionprovider needs clientcomponent
// and adding it in layout can make it very problematic
