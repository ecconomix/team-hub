export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>App layout here {children}</div>;
}
