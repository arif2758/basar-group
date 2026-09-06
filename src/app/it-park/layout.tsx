function ITParkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-grow flex flex-col">
      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </section>
  );
}

export default ITParkLayout;
