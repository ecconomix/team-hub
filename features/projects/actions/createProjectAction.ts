"use server";

import { revalidatePath } from "next/cache";
import { getUserID } from "@/lib/auth";
import { createProject } from "@/server/projects/mutations/createProject";
import { AppError, AppErrorCode } from "@/server/errors";

export async function createProjectAction(formData: FormData) {
  const userId = await getUserID();
  const projectName = formData.get("project-name");
  const workspaceId = formData.get("workspaceId");

  if (typeof workspaceId !== "string") {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid workspace ID");
  }

  if (typeof projectName !== "string") {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid project name");
  }

  await createProject({
    workspaceId,
    name: projectName,
    userId,
  });

  revalidatePath(`/app/w/${workspaceId}/projects`);
}
