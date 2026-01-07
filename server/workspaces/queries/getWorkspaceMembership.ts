import "server-only";

import { prisma } from "@/lib/db";

export const getWorkspaceMembership = async (
  userId: string,
  workspaceId: string
) => {
  const membership = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { role: true },
  });

  return membership;
};
