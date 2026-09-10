import Navbar from "@/components/Navbar";
import FooterIT from "./ITcomponents/FooterIT";

function ITParkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-grow flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>
      <FooterIT />
    </div>
  );
}

export default ITParkLayout;
