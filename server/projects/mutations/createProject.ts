import { getUserID } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canCreateProject } from "@/lib/permissions";
import { AppError, AppErrorCode } from "@/server/errors";
import { getWorkspaceMembership } from "@/server/workspaces";

interface CreateProjectProps {
  workspaceId: string;
  name: string;
  userId: string;
}

export const createProject = async ({
  workspaceId,
  name,
}: CreateProjectProps) => {
  const userId = await getUserID();

  const currentName = name.trim();
  const membership = await getWorkspaceMembership(userId, workspaceId);

  if (!membership || !canCreateProject(membership.role)) {
    throw new AppError(
      AppErrorCode.FORBIDDEN,
      "User does not have permission to create projects"
    );
  }

  if (!currentName) {
    throw new AppError(AppErrorCode.BAD_REQUEST, "Project name is required");
  }

  const project = await prisma.project.create({
    data: {
      name: currentName,
      workspaceId,
    },
    select: { id: true },
  });

  return { projectId: project.id };
};
