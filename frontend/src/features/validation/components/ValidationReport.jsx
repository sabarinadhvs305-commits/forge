export default function ValidationReport({ critique, recommendations }) {
  return (
    <div className="p-6 bg-[#111111] border border-[#232323] rounded-xl space-y-5">
      <div>
        <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">AI Architectural Critique</h4>
        <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{critique}</p>
      </div>

      <div className="border-t border-[#1c1c1c] pt-4 space-y-2">
        <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Recommended Pivot Tactics</h4>
        <ul className="space-y-2.5 text-sm text-zinc-400">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#D97706] font-mono mt-0.5">[{idx + 1}]</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}