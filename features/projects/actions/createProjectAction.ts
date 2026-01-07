"use server";

import { revalidatePath } from "next/cache";
import { getUserID } from "@/lib/auth";
import { createProject } from "@/server/projects/mutations/createProject";

export async function createProjectAction(formData: FormData) {
  const userId = await getUserID();
  const projectName = formData.get("project-name");
  const workspaceId = formData.get("workspaceId");

  if (typeof workspaceId !== "string") {
    throw new Error("Invalid workspace ID");
  }

  if (typeof projectName !== "string") {
    throw new Error("Invalid project name");
  }

  await createProject({
    workspaceId,
    name: projectName,
    userId,
  });

  revalidatePath(`/app/w/${workspaceId}`);
}
