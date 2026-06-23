import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css"
import { LanguageProvider } from "@/context/LanguageContext";

import FooterWraper from "@/wraper/FooterWraper";
import Navbar from "@/components/Navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BASAR Group",
    template: "%s | BASAR Group",
  },
  description:
    "BASAR Group - A trusted name in retail, technology, and innovation. From BASAR Super Shop to BASAR IT Park, we are shaping the future with quality, integrity, and customer-first approach.",
  keywords: [
    "BASAR Group",
    "BASAR Super Shop",
    "BASAR IT Park",
    "Retail",
    "Technology",
    "Grocery Shop",
    "Bangladesh Business",
    "Innovation",
    "Super Shop",
    "Digital Solutions",
    "Customer First",
  ],
  icons: {
    icon: "/basar-group-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AntdRegistry>
          <LanguageProvider>
            <Navbar />

            <main className="min-h-screen flex flex-col">
              {children}
            </main>
            <FooterWraper />
          </LanguageProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
