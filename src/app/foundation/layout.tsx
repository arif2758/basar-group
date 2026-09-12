import Navbar from "@/components/Navbar";
import FoundationSubNav from "./foundationComponents/FoundationSubNav";
import Footer from "@/components/Footer";

function FoundationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-grow flex flex-col min-h-screen w-full bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-clip">
      <Navbar />

      {/* Foundation Centered Title & Subtitle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 w-full">
        <div className="text-center mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            বাছার ফাউন্ডেশন
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            শিক্ষা, স্বাস্থ্যসেবা ও মানবিক উন্নয়ন কার্যক্রম • Learn. Earn. Empower.
          </p>
        </div>
      </div>

      {/* Sticky Sub Navbar */}
      <FoundationSubNav />

      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* Central Unified Site Footer */}
      <Footer />
    </div>
  );
}

export default FoundationLayout;
