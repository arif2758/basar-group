import type { Metadata } from "next";
import ITParkWrapperClient from "./ITcomponents/ITParkWrapperClient";

export const metadata: Metadata = {
  title: "BASAR IT Park | Come. Grow. Serve.",
  description:
    "BASAR IT Park is a hub for learning, innovation, and opportunities. Explore skill development, student help desk, co-working spaces, job boards, virtual tours, and events designed to empower youth and professionals.",
  keywords: [
    "BASAR IT Park",
    "IT Park Bangladesh",
    "Skill Development",
    "Job Board",
    "Co-Working Space",
    "Virtual Tour",
    "Student Help Desk",
    "Learn Grow Serve",
  ],
  openGraph: {
    title: "BASAR IT Park | Come. Grow. Serve.",
    description:
      "Explore BASAR IT Park – a hub for skills, jobs, co-working spaces, and student support. Learn, grow, and serve with us.",
    url: "https://yourdomain.com/it-park",
    siteName: "BASAR Foundation",
    images: [
      {
        url: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg",
        width: 1200,
        height: 630,
        alt: "BASAR IT Park",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BASAR IT Park | Come. Grow. Serve.",
    description:
      "Join BASAR IT Park to learn skills, explore opportunities, and make an impact.",
    images: [
      "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg",
    ],
  },
  alternates: {
    canonical: "https://yourdomain.com/it-park",
  },
};

function ITParkPage() {
  return <ITParkWrapperClient />;
}

export default ITParkPage;
