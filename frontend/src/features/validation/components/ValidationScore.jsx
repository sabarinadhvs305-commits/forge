export default function ValidationScore({ score, feasibility }) {
  return (
    <div className="p-6 bg-[#111111] border border-[#232323] rounded-xl flex flex-col items-center justify-center text-center space-y-2">
      <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">Alignment Score</span>
      <div className="text-5xl font-extrabold text-emerald-500 font-mono tracking-tighter">
        {score}%
      </div>
      <span className="text-xs text-zinc-400 font-medium px-2 py-0.5 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-900/40">
        Verdict: {feasibility}
      </span>
    </div>
  );
}