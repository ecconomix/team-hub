import { getProjectById } from "@/server/projects";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1>Project page</h1>
      <h2>{project.name}</h2>
      <div className="flex flex-col gap-2">
        {project.tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
    </div>
  );
}
