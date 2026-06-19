import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import RecentProjects from "../components/RecentProjects";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState([
    {
      id: 1,
      title: "Smart Campus Optimizer",
      description: "Real-time tracking of classroom and laboratory occupancy metrics.",
      status: "In Progress",
      timeline_weeks: 12,
      completion: 65,
      tasks_open: 4,
      validated: true,
      scope_checked: true,
      pitch_ready: false,
    }
  ]);

  const totalOpenTasks = activeProjects.reduce((acc, curr) => acc + curr.tasks_open, 0);

  return (
    <div className="space-y-8">
      {/* Upper Context Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#232323]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Active Workspace Engine
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage framework resources, track pipeline tasks, and synthesize AI metrics.
          </p>
        </div>
        
        <button onClick={() => navigate("/projects/new")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D97706] text-black font-semibold text-sm rounded-md hover:bg-[#b56205] transition-all shadow-lg shadow-[#D97706]/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Initialize New Project
        </button>
      </div>

      {/* Extracted Modular Analytics Scorecards */}
      <SummaryCards 
        activeProjectsCount={activeProjects.length} 
        openTasksCount={totalOpenTasks} 
      />

      {/* Layout Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Space: Extracted Projects Map */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Tracked Pipelines</h2>
          <RecentProjects projects={activeProjects} />
        </div>

        {/* Right Space: Forge Workflow Mentor */}
        <div className="space-y-4">
          <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Forge Workflow Mentor</h2>
          <div className="p-6 bg-[#111111] border border-dashed border-[#232323] rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider">Next Operational Stage</span>
            </div>
            
            <h4 className="text-md font-bold text-zinc-200">Synthesize Investor Pitch Deck</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your idea validation, team matrix configuration, and core sprint scope have been processed. You are ready to generate your presentation summary.
            </p>

            <button className="w-full py-2 bg-[#1c1c1c] hover:bg-[#252525] text-zinc-300 hover:text-white font-mono text-xs border border-[#232323] transition-all rounded-md">
              Execute Llama 3 Pitch Generator →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}