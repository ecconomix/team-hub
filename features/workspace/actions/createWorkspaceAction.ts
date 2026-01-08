"use server";

import { redirect } from "next/navigation";
import { createWorkspace } from "@/server/workspaces/mutations/createWorkspace";
import { getUserID } from "@/lib/auth";

export async function createWorkspaceAction(formData: FormData) {
  const userId = await getUserID();

  const workspaceName = formData.get("workspace-name");

  if (typeof workspaceName !== "string") {
    throw new Error("Invalid workspace name");
  }

  const { workspaceId } = await createWorkspace({
    userId: userId,
    name: workspaceName,
  });

  redirect(`/app/w/${workspaceId}/projects`);
}
