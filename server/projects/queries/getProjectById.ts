import { prisma } from "@/lib/db";

export const getProjectById = async (projectId: string) => {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};
