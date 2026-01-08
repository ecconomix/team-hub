import "server-only";
import { prisma } from "@/lib/db";
import { TaskStatus } from "@prisma/client";
import { getWorkspaceMembership } from "@/server/workspaces";
import { AppError, AppErrorCode } from "@/server/errors";

interface CreateTaskProps {
  title: string;
  projectId: string;
  userId: string;
}

export const createTask = async ({
  title,
  projectId,
  userId,
}: CreateTaskProps) => {
  const currentTitle = title.trim();

  if (!currentTitle) {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Task title is required");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { workspaceId: true },
  });

  if (!project) {
    throw new AppError(AppErrorCode.NOT_FOUND, "Project not found");
  }

  const membership = await getWorkspaceMembership(userId, project.workspaceId);

  if (!membership) {
    throw new AppError(
      AppErrorCode.FORBIDDEN,
      "You do not have permission to create tasks in this project"
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      projectId,
      status: TaskStatus.TODO,
    },
    select: { id: true },
  });

  return { taskId: task.id };
};
