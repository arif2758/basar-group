import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/animations.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import FooterWraper from "@/wraper/FooterWraper";
import Navbar from "@/components/Navbar";

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "BASAR Group | বাছার গ্রুপ - মানবসেবা ও সমাজকল্যাণ",
    template: "%s | BASAR Group",
  },
  description:
    "বাছার গ্রুপ (BASAR Group) একটি অলাভজনক সামাজিক ও মানবিক সংস্থা। শিক্ষা সহায়তা, ডিজিটাল আইটি পার্ক, কমিউনিটি গ্রন্থাগার ও ত্রাণ কার্যক্রমে নিবেদিত।",
  keywords: [
    "বাছার গ্রুপ",
    "BASAR Group",
    "বাছার ফাউন্ডেশন",
    "BASAR Foundation",
    "বাছার গ্রন্থাগার",
    "BASAR Library",
    "বাছার আইটি পার্ক",
    "BASAR IT Park",
    "বাছার সুপার শপ",
    "BASAR Super Shop",
    "বংশলতিকা",
    "Family Tree Bangladesh",
    "Social NGO Bangladesh",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoBengali.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="font-[family-name:var(--font-noto-bengali),var(--font-inter),sans-serif] antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-300 selection:bg-emerald-500 selection:text-white overflow-x-hidden w-full max-w-[100vw]"
      >
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <div className="min-h-screen flex flex-col flex-1 overflow-x-hidden w-full">
              {children}
            </div>
            <FooterWraper />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
