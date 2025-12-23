import { auth } from "@/auth";
import Link from "next/link";

export default async function AppPage() {
  const session = await auth();

  return (
    <main>
      <header className="h-14 flex items-center justify-end px-4 gap-1">
        <p className="text-sm text-gray-500">{session?.user?.name}</p>
        <Link
          href="/api/auth/signout"
          className="bg-blue-500 text-white px-4 py-1 rounded-md"
        >
          Sign out
        </Link>
      </header>
    </main>
  );
}
