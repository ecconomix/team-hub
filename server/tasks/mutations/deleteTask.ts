import { prisma } from "@/lib/db";
import { AppError, AppErrorCode } from "@/server/errors";
import { getWorkspaceMembership } from "@/server/workspaces";

interface DeleteTaskProps {
  userId: string;
  taskId: string;
}

export const deleteTask = async ({ taskId, userId }: DeleteTaskProps) => {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      id: true,
      projectId: true,
      project: { select: { workspaceId: true } },
    },
  });

  if (!existingTask) {
    throw new AppError(AppErrorCode.NOT_FOUND, "Task not found");
  }

  const membership = await getWorkspaceMembership(
    userId,
    existingTask.project.workspaceId
  );

  if (!membership) {
    throw new AppError(
      AppErrorCode.FORBIDDEN,
      "You do not have permission to delete this task"
    );
  }

  await prisma.task.delete({
    where: { id: taskId },
    select: { id: true },
  });

  return {
    taskId: existingTask.id,
    projectId: existingTask.projectId,
    workspaceId: existingTask.project.workspaceId,
  };
};
