import Navbar from "@/components/Navbar";
import FooterGranthagar from "./granthagarComponents/FooterGranthagar";

function GranthagarLayout({
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
      <FooterGranthagar />
    </div>
  );
}

export default GranthagarLayout;
