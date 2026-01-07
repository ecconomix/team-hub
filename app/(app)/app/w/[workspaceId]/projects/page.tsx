import { createProjectAction } from "@/features/projects/actions";
import { getProjectsByWorkspaceId } from "@/server/projects";
import Link from "next/link";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const projects = await getProjectsByWorkspaceId(workspaceId);
  return (
    <>
      <form action={createProjectAction}>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          name="project-name"
        />
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <button
          className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
          type="submit"
        >
          Create Project
        </button>
      </form>

      <h2>Projects list</h2>
      <div className="flex flex-col gap-2">
        {projects.map((project) => (
          <Link
            href={`/app/w/${workspaceId}/projects/${project.id}`}
            key={project.id}
            className="cursor-pointer"
          >
            {project.name}
          </Link>
        ))}
      </div>
    </>
  );
}
