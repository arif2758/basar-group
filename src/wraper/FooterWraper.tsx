"use client";

import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

function FooterWraper() {
  const { language } = useLanguage();
  return <Footer language={language} />;
}

export default FooterWraper;
