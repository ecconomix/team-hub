export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="container mx-auto px-4 py-4">{children}</main>;
}
