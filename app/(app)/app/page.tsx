import { getWorkspacesForUser } from "@/server/workspaces/queries";
import { redirect } from "next/navigation";

export default async function AppPage() {
  const workspaces = await getWorkspacesForUser();

  if (workspaces.length === 0) {
    redirect("/app/create-workspace");
  }
}
