import Link from "next/link";

export default function PublicPage() {
  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-gray-50 to-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">TeamHub</div>
            <Link
              href="/api/auth/signin"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Lightweight project management for
            <span className="text-blue-600"> small teams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A clear and fast way to organize your work without the overhead of
            large project management tools.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/app"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-10 pb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Focused on what matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Workspace-First
              </h3>
              <p className="text-gray-600">
                Organize work in isolated workspaces with clear member roles and
                permissions. Invite your team and get started in minutes.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Simple Kanban Boards
              </h3>
              <p className="text-gray-600">
                Visualize work with intuitive Kanban boards. Drag and drop tasks
                between Todo, In Progress, and Done with fast, optimistic
                updates.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Role-Based Access
              </h3>
              <p className="text-gray-600">
                Control who can manage settings and invite members. Clean
                separation between owners and members keeps permissions simple.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Footer */}
      <footer className="shrink-0 w-full px-4 py-6 border-t border-gray-200 bg-white">
        <div className="text-center text-gray-600">
          <p>
            &copy; 2025 TeamHub. Built for small teams and freelancers who value
            clarity over complexity.
          </p>
        </div>
      </footer>
    </div>
  );
}
