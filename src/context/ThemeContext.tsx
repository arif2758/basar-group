"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme, ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    theme: (theme as "light" | "dark" | "system") || "system",
    resolvedTheme: (resolvedTheme as "light" | "dark") || "light",
    setTheme: (t: "light" | "dark" | "system") => setTheme(t),
    toggleTheme,
    mounted,
  };
}
