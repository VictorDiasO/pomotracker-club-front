"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { TimerContextProvider } from "@/contexts";

export default function Providers({ children }: { children: React.ReactNode}) {
  const [ mounted, setMounted ] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeProvider attribute="class" themes={['light', 'lightshortbreak', 'lightlongbreak', 'dark', 'darkshortbreak', 'darklongbreak']}>
      <TimerContextProvider>
        {children}
      </TimerContextProvider>
    </ThemeProvider>
  );
}
