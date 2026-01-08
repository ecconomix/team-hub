"use server";

import { getUserID } from "@/lib/auth";
import { AppError, AppErrorCode } from "@/server/errors";
import { updateTask } from "@/server/tasks";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTaskAction = async (formData: FormData) => {
  const userId = await getUserID();

  const taskId = formData.get("taskId");
  const title = formData.get("title");
  const status = formData.get("status") as TaskStatus | undefined;

  if (typeof taskId !== "string") {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid task ID");
  }

  const hasTitle = typeof title === "string";
  const hasStatus = typeof status === "string";

  if (!hasTitle && !hasStatus) {
    throw new AppError(AppErrorCode.BAD_REQUEST, "No changes to update");
  }

  if (hasTitle && !title.trim()) {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Title cannot be empty");
  }

  if (hasStatus && !Object.values(TaskStatus).includes(status)) {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Invalid status");
  }

  const { workspaceId, projectId } = await updateTask({
    taskId,
    title: hasTitle ? title : undefined,
    status: hasStatus ? status : undefined,
    userId,
  });

  revalidatePath(`/app/w/${workspaceId}/projects/${projectId}`);
};
