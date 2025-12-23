import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "TeamHub",
  description: "Workspace-first team collaboration SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
