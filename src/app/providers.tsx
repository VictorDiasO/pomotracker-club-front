"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode}) {
  const [ mounted, setMounted ] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
