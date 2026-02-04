import { prisma } from "@/lib/db";
import { AppError, AppErrorCode } from "@/server/errors";
import { getWorkspaceMembership } from "@/server/workspaces";
import { TaskStatus } from "@prisma/client";

interface UpdateTaskProps {
  userId: string;
  taskId: string;
  title?: string;
  status?: TaskStatus;
}

export const updateTask = async ({
  taskId,
  userId,
  title,
  status,
}: UpdateTaskProps) => {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      id: true,
      title: true,
      status: true,
      projectId: true,
      project: {
        select: {
          workspaceId: true,
        },
      },
    },
  });

  if (!existingTask) {
    throw new AppError(AppErrorCode.NOT_FOUND, "Task not found");
  }

  const membership = await getWorkspaceMembership(
    userId,
    existingTask.project.workspaceId,
  );

  if (!membership) {
    throw new AppError(
      AppErrorCode.FORBIDDEN,
      "You do not have permission to update this task",
    );
  }

  const data: { title?: string; status?: TaskStatus } = {};

  if (typeof title === "string") {
    const trimmedTitle = title.trim();

    if (!trimmedTitle)
      throw new AppError(AppErrorCode.BAD_REQUEST, "Task title is required");

    if (trimmedTitle !== existingTask.title) {
      data.title = trimmedTitle;
    }
  }

  if (typeof status === "string" && status !== existingTask.status) {
    data.status = status;
  }

  if (Object.keys(data).length === 0) {
    throw new AppError(AppErrorCode.BAD_REQUEST, "No changes to update");
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data,
    select: { id: true },
  });

  return {
    taskId: updatedTask.id,
    projectId: existingTask.projectId,
    workspaceId: existingTask.project.workspaceId,
  };
};
