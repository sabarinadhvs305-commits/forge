import { useNavigate } from "react-router-dom";

export default function ProjectsListPage() {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Forge",
      status: "In Progress",
      progress: 65,
      description:
        "AI-powered project mentor for student teams.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Projects
          </h1>

          <p className="text-zinc-400 mt-1">
            Manage and track all your active projects.
          </p>
        </div>

        <button
          onClick={() => navigate("/projects/new")}
          className="px-4 py-2 bg-[#D97706] text-black rounded-lg font-medium hover:bg-[#b56205]"
        >
          Create Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#111111] border border-[#232323] rounded-xl p-6 hover:border-zinc-700 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {project.description}
                </p>
              </div>

              <span className="px-3 py-1 text-xs rounded-full bg-amber-500/10 text-[#D97706] border border-amber-500/20">
                {project.status}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-500">
                  Progress
                </span>

                <span className="text-zinc-300">
                  {project.progress}%
                </span>
              </div>

              <div className="w-full h-2 bg-[#1c1c1c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D97706]"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() =>
                navigate(`/projects/${project.id}`)
              }
              className="mt-6 px-4 py-2 border border-[#232323] rounded-lg text-zinc-300 hover:text-white hover:border-zinc-600"
            >
              View Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}