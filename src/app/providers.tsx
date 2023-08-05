"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Providers({ children }: { children: React.ReactNode}) {
  const [ mounted, setMounted ] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
