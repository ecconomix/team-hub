import {
  createTaskAction,
  deleteTaskAction,
  updateTaskAction,
} from "@/features/tasks/actions";

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
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Project: {project.name}</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Tasks</h2>
        {project.tasks.map((task) => (
          <div
            key={task.id}
            className="flex gap-2 items-center border border-gray-300 rounded-md p-2"
          >
            <div>{task.title}</div>
            <form
              action={updateTaskAction}
              key={`${task.id}-${task.title}-${task.status}-update`}
              className="flex gap-2"
            >
              <input type="hidden" name="taskId" value={task.id} />
              <input
                className="border border-gray-300 rounded-md p-2"
                type="text"
                name="title"
                defaultValue={task.title}
              />
              <select
                className="border border-gray-300 rounded-md p-2"
                name="status"
                defaultValue={task.status}
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
              <button
                className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
                type="submit"
              >
                Update Task
              </button>
            </form>
            <form
              action={deleteTaskAction}
              key={`${task.id}-${task.title}-${task.status}-delete`}
            >
              <input type="hidden" name="taskId" value={task.id} />
              <button
                className="bg-red-500 text-white rounded-md p-2 cursor-pointer"
                type="submit"
              >
                Delete Task
              </button>
            </form>
          </div>
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
