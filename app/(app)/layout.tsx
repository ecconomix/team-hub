import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Header } from "@/components/header";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
}
