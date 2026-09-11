"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme, ThemeProvider as NextThemesProvider } from "next-themes";
import { ConfigProvider, theme as antdTheme, App } from "antd";
import bnBD from "antd/locale/bn_BD";

// Suppress false positive warnings in development:
// 1. React 19 / next-themes script tag injection warning
// 2. Ant Design static message warning when called outside App context
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origError = console.error;
  const origWarn = console.warn;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Encountered a script tag") ||
        args[0].includes("Static function can not consume context"))
    ) {
      return;
    }
    origError.apply(console, args);
  };
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Static function can not consume context")
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
}

function AntdConfigWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <ConfigProvider
      locale={bnBD}
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          fontFamily: "var(--font-inter), var(--font-noto-bengali), system-ui, sans-serif",
          colorBgContainer: isDark ? "#141414" : "#ffffff",
          colorBgElevated: isDark ? "#1c1c1c" : "#ffffff",
          colorBorder: isDark ? "#2a2a2a" : "#e2e8f0",
          colorBorderSecondary: isDark ? "#222222" : "#f1f5f9",
          colorText: isDark ? "#f1f5f9" : "#0f172a",
          colorTextSecondary: isDark ? "#94a3b8" : "#64748b",
          colorLink: isDark ? "#ffffff" : "#0f172a",
          colorLinkHover: isDark ? "#93c5fd" : "#1677ff",
        },
        components: {
          Table: {
            headerBg: isDark ? "#1a1a1a" : "#f8fafc",
            headerColor: isDark ? "#f8fafc" : "#0f172a",
            headerBorderRadius: 8,
            rowHoverBg: isDark ? "#222222" : "#f8fafc",
            borderColor: isDark ? "#2a2a2a" : "#e2e8f0",
            colorBgContainer: isDark ? "#141414" : "#ffffff",
          },
          Select: {
            colorBgContainer: isDark ? "#1c1c1c" : "#ffffff",
            colorBorder: isDark ? "#2e2e2e" : "#d9d9d9",
            colorText: isDark ? "#f1f5f9" : "#0f172a",
            colorBgElevated: isDark ? "#1f1f1f" : "#ffffff",
          },
          Input: {
            colorBgContainer: isDark ? "#1c1c1c" : "#ffffff",
            colorBorder: isDark ? "#2e2e2e" : "#d9d9d9",
            colorText: isDark ? "#f1f5f9" : "#0f172a",
          },
          Tabs: {
            colorText: isDark ? "#94a3b8" : "#64748b",
            colorTextHeading: isDark ? "#f1f5f9" : "#0f172a",
          },
          Pagination: {
            colorBgContainer: isDark ? "#1c1c1c" : "#ffffff",
            colorText: isDark ? "#f1f5f9" : "#0f172a",
          },
          Card: {
            colorBgContainer: isDark ? "#141414" : "#ffffff",
            colorBorderSecondary: isDark ? "#262626" : "#e2e8f0",
          },
          Popconfirm: {
            colorBgElevated: isDark ? "#1f1f1f" : "#ffffff",
          },
          Drawer: {
            colorBgElevated: isDark ? "#141414" : "#ffffff",
            colorBgContainer: isDark ? "#1c1c1c" : "#f8fafc",
            colorBorder: isDark ? "#2a2a2a" : "#e2e8f0",
            colorText: isDark ? "#f1f5f9" : "#0f172a",
            colorTextHeading: isDark ? "#ffffff" : "#0f172a",
            colorIcon: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
            colorIconHover: isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.88)",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AntdConfigWrapper>{children}</AntdConfigWrapper>
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
