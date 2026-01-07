import { WorkspaceRole } from "@prisma/client";

export const canCreateProject = (workspaceRole: WorkspaceRole) => {
  return (
    workspaceRole === WorkspaceRole.OWNER ||
    workspaceRole === WorkspaceRole.MEMBER
  );
};
