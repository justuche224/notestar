import Nav from "./_components/Nav";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <Nav />
      <section className="mt-20"> {children}</section>
    </section>
  );
}
