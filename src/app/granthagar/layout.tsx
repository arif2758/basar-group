import FooterGranthagar from "./granthagarComponents/FooterGranthagar";


function GranthagarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-grow flex flex-col">
    

      <div className="flex-grow flex flex-col">
        {children}
      </div>
      <FooterGranthagar />
    </div>
  );
}

export default GranthagarLayout;
