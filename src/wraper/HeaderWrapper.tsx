"use client";

import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function HeaderWrapper() {
  const { language, setLanguage } = useLanguage();

  return <Header language={language} onLanguageChange={setLanguage} />;
}
 