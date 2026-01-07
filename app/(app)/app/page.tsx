import { getUserID } from "@/lib/auth";
import { getWorkspacesForUser } from "@/server/workspaces/queries";
import { redirect } from "next/navigation";

export default async function AppPage() {
  const userId = await getUserID();

  const workspaces = await getWorkspacesForUser(userId);

  if (workspaces.length === 0) {
    redirect("/app/create-workspace");
  }

  redirect(`/app/w/${workspaces[0].id}/projects`);
}
