import type { Metadata } from "next";
import FoundationWrapperClient from "./foundationComponents/FoundationWrapperClient";



export const metadata: Metadata = {
  title: "Basar Foundation | Empowering Lives, Creating Hope",
  description:
    "Discover how Basar Foundation is transforming communities with education, healthcare, and humanitarian aid. Join us in creating a lasting impact.",
  keywords: [
    "Basar Foundation",
    "NGO Bangladesh",
    "Nonprofit Organization",
    "Education Support",
    "Healthcare Aid",
    "Humanitarian Work",
    "Charity in Bangladesh",
  ],
  openGraph: {
    title: "Basar Foundation | Empowering Lives",
    description:
      "Empowering communities with education, healthcare, and essential support. Together, we build a brighter future.",
    url: "https://yourdomain.com/foundation",
    siteName: "Basar Foundation",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Basar Foundation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basar Foundation | Empowering Lives",
    description:
      "Join Basar Foundation in creating opportunities and lasting impact.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function FoundationPage() {
  return <FoundationWrapperClient />;
}
