import FooterGranthagar from "./granthagarComponents/FooterGranthagar";


function GranthagarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    

      {children}
      <FooterGranthagar />
    </div>
  );
}

export default GranthagarLayout;
