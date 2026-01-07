import "server-only";

import { prisma } from "@/lib/db";
import { WorkspaceRole } from "@prisma/client";

interface CreateWorkspaceProps {
  userId: string;
  name: string;
}

export async function createWorkspace({ userId, name }: CreateWorkspaceProps) {
  if (!name.trim()) {
    throw new Error("Workspace name is required");
  }

  const workspace = await prisma.workspace.create({
    data: {
      name: name.trim(),
      ownerId: userId,
      members: {
        create: {
          userId,
          role: WorkspaceRole.OWNER,
        },
      },
    },
    select: { id: true },
  });

  return { workspaceId: workspace.id };
}
