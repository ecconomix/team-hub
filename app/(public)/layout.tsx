export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>Public layout here {children}</div>;
}
