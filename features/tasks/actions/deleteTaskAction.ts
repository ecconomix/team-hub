"use server";

import { getUserID } from "@/lib/auth";
import { AppError, AppErrorCode } from "@/server/errors";
import { deleteTask } from "@/server/tasks";
import { revalidatePath } from "next/cache";

export const deleteTaskAction = async (formData: FormData) => {
  const userId = await getUserID();

  const taskId = formData.get("taskId");

  if (typeof taskId !== "string") {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid task ID");
  }

  const { workspaceId, projectId } = await deleteTask({
    taskId,
    userId,
  });

  revalidatePath(`/app/w/${workspaceId}/projects/${projectId}`);
};
