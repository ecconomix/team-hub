import { getUserID } from "@/lib/auth";
import {
  getWorkspaceMembership,
  getWorkspacesForUser,
} from "@/server/workspaces";
import { getWorkspace } from "@/server/workspaces/queries/getWorkspace";
import { redirect } from "next/navigation";

export default async function WorkspaceLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}>) {
  const userId = await getUserID();
  const { workspaceId } = await params;

  const membership = await getWorkspaceMembership(userId, workspaceId);
  const [workspaces, workspace] = await Promise.all([
    getWorkspacesForUser(userId),
    getWorkspace(workspaceId),
  ]);

  if (!membership || !workspace) {
    redirect("/app");
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>Current workspace: {workspace.name}</h1>
      </div>
      {children}
    </>
  );
}
