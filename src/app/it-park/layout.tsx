import FooterIT from "./ITcomponents/FooterIT";


function ITParkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
   

      {children}
      <FooterIT />
    </section>
  );
}

export default ITParkLayout;
