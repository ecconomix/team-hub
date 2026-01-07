import "server-only";

import { prisma } from "@/lib/db";

export const getWorkspacesForUser = async (userId: string) => {
  const workspaces = await prisma.workspaceMember.findMany({
    where: { userId },
    select: {
      role: true,
      workspace: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: {
      workspace: {
        updatedAt: "desc",
      },
    },
  });

  return workspaces.map(({ workspace, role }) => {
    return {
      id: workspace.id,
      name: workspace.name,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
      role,
    };
  });
};
