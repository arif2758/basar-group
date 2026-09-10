import Navbar from "@/components/Navbar";
import FooterFoundation from "./foundationComponents/FooterFoundation";

function FoundationLayout({
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
      <FooterFoundation />
    </div>
  );
}

export default FoundationLayout;
