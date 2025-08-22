import FooterFoundation from "./foundationComponents/FooterFoundation";


function FoundationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
     

      {children}
      <FooterFoundation />
    </section>
  );
}

export default FoundationLayout;
