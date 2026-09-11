import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main className="flex-grow flex flex-col w-full overflow-x-clip">
        {children}
      </main>
      <Footer />
    </div>
  );
}
