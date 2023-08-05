"use client";
import { useTheme } from "next-themes";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
const roboto = Roboto({
  subsets: ['latin'],
  weight: '100'
});

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [ mounted, setMounted ] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex content-center items-center">
      <div className="flex content-center items-center shrink-0">
        <p className="dark:text-red-900 text-black">The current theme is: ${currentTheme}</p>
        <button onClick={() => setTheme('light')}>Light mode</button>
        <button onClick={() => setTheme('dark')}>Dark mode</button>
      </div>
    </main>
  );
}
