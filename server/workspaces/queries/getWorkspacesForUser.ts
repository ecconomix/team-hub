import { prisma } from "@/lib/db";

export const getWorkspacesForUser = async () => {
  const workspaces = await prisma.workspace.findMany();

  return workspaces;
};
