import { createWorkspaceAction } from "@/features/workspace/actions";

export default async function CreateWorkspacePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form action={createWorkspaceAction} className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Create Workspace</h1>
        <label htmlFor="workspace-name">Workspace Name</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          id="workspace-name"
          name="workspace-name"
        />
        <button
          className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
          type="submit"
        >
          Create Workspace
        </button>
      </form>
    </main>
  );
}
