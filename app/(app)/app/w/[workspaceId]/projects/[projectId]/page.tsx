import { createTaskAction } from "@/features/tasks/actions";
import { getProjectById } from "@/server/projects";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string; workspaceId: string }>;
}) {
  const { projectId, workspaceId } = await params;

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
      <form action={createTaskAction}>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          name="title"
        />
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <button
          className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
