import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PublicPage from "./(public)/page";

export default async function Page() {
  const session = await auth();

  if (session) {
    return redirect("/app");
  }

  return <PublicPage />;
}
