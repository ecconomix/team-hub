"use server";

import { getUserID } from "@/lib/auth";
import { AppError, AppErrorCode } from "@/server/errors";
import { createTask } from "@/server/tasks";
import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
  const userId = await getUserID();

  const title = formData.get("title");
  const projectId = formData.get("projectId");
  const workspaceId = formData.get("workspaceId");

  if (typeof title !== "string") {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid title");
  }

  if (typeof projectId !== "string") {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid project ID");
  }

  await createTask({
    title,
    projectId,
    userId,
  });

  revalidatePath(`/app/w/${workspaceId}/projects/${projectId}`);
}
