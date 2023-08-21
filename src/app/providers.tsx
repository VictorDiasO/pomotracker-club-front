"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { TimerContextProvider } from "@/contexts/timer";

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
