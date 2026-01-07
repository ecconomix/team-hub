import "server-only";
import { prisma } from "@/lib/db";

export const getWorkspace = async (workspaceId: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { id: true, name: true },
  });

  return workspace;
};
