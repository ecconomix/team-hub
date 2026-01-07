import "server-only";

import { prisma } from "@/lib/db";

export const getProjectsByWorkspaceId = async (workspaceId: string) => {
  const projects = await prisma.project.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return projects;
};
