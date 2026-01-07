import { prisma } from "@/lib/db";
import { canCreateProject } from "@/lib/permissions";
import { getWorkspaceMembership } from "@/server/workspaces";

interface CreateProjectProps {
  workspaceId: string;
  name: string;
  userId: string;
}

export const createProject = async ({
  workspaceId,
  name,
  userId,
}: CreateProjectProps) => {
  const currentName = name.trim();
  const membership = await getWorkspaceMembership(userId, workspaceId);

  if (!membership) {
    throw new Error("User is not a member of the workspace");
  }

  if (!canCreateProject(membership.role)) {
    throw new Error("User does not have permission to create projects");
  }

  if (!currentName) {
    throw new Error("Project name is required");
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
