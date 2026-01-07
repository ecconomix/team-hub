"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createWorkspace } from "@/server/workspaces/mutations/createWorkspace";

export async function createWorkspaceAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const workspaceName = formData.get("workspace-name");

  if (typeof workspaceName !== "string") {
    throw new Error("Invalid workspace name");
  }

  const { workspaceId } = await createWorkspace({
    userId: session.user.id,
    name: workspaceName,
  });

  redirect(`/app/w/${workspaceId}`);
}
