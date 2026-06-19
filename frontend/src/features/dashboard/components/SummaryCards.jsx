export default function SummaryCards({ activeProjectsCount, openTasksCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 bg-[#111111] border border-[#232323] rounded-lg">
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Total Registries</div>
        <div className="text-3xl font-bold mt-2 font-mono text-white">{activeProjectsCount}</div>
        <div className="text-xs text-zinc-400 mt-1">Active deployment vectors</div>
      </div>
      
      <div className="p-5 bg-[#111111] border border-[#232323] rounded-lg">
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Open Pipeline Tasks</div>
        <div className="text-3xl font-bold mt-2 font-mono text-white">{openTasksCount}</div>
        <div className="text-xs text-amber-600 font-medium mt-1">Requires active sprint triage</div>
      </div>

      <div className="p-5 bg-[#111111] border border-[#232323] rounded-lg">
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Validation Engine Score</div>
        <div className="text-3xl font-bold mt-2 font-mono text-emerald-500">88%</div>
        <div className="text-xs text-zinc-400 mt-1">Aggregated Llama 3 alignment</div>
      </div>

      <div className="p-5 bg-[#111111] border border-[#232323] rounded-lg">
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Project Jam Timeline</div>
        <div className="text-3xl font-bold mt-2 font-mono text-white">2026</div>
        <div className="text-xs text-zinc-400 mt-1">Active development cycle</div>
      </div>
    </div>
  );
}