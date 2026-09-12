// src/app/granthagar/layout.tsx
import GranthagarHeader from "@/components/granthagar/layout/GranthagarHeader";
import FooterGranthagar from "./granthagarComponents/FooterGranthagar";
import { BookCartProvider } from "@/context/BookCartContext";
function GranthagarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookCartProvider>
      <div className="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-[#141414] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden selection:bg-blue-600 selection:text-white">
        <GranthagarHeader />
        <main className="flex-grow flex flex-col w-full">
          {children}
        </main>
        <FooterGranthagar />
      </div>
    </BookCartProvider>
  );
}

export default GranthagarLayout;
