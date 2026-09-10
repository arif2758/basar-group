"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme, ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress the React 19 false positive warning for next-themes script tag injection
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) return;
    origError.apply(console, args);
  };
}

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
