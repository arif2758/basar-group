import FooterFoundation from "./foundationComponents/FooterFoundation";


function FoundationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-grow flex flex-col">
     

      <div className="flex-grow flex flex-col">
        {children}
      </div>
      <FooterFoundation />
    </section>
  );
}

export default FoundationLayout;
