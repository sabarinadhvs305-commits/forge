import { useState } from "react";

export default function MemberForm({ onAddMember, currentMembers = [] }) {
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");

  const handleAddClick = (e) => {
    e.preventDefault();
    setError("");

    // Input verification schemas
    if (!email.trim()) {
      setError("Teammate email target identity is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please input a structurally valid email reference address.");
      return;
    }
    if (!skills.trim()) {
      setError("Specify at least one development skill or baseline competency vector.");
      return;
    }

    // Guard against duplicate pipeline allocations
    const isDuplicate = currentMembers.some(
      (m) => m.email.toLowerCase() === email.toLowerCase()
    );
    if (isDuplicate) {
      setError("This developer is already provisioned inside this project matrix.");
      return;
    }

    // Bubble structured payload upstream to orchestrator
    onAddMember({
      email: email.trim(),
      skills: skills.trim(),
      assigned_role: "Pending Validation" // Will be mutated by Llama 3 role engine later
    });

    // Reset local field states
    setEmail("");
    setSkills("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Email Context Frame */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Developer Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teammate@university.edu"
            className="w-full px-4 py-2 bg-[#151515] border border-[#232323] rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors"
          />
        </div>

        {/* Skills Track Input */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Competency Matrix Vectors (Skills)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., React.js, Python, FastAPI"
              className="flex-1 px-4 py-2 bg-[#151515] border border-[#232323] rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors"
            />
            <button
              onClick={handleAddClick}
              className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-[#232323] font-mono text-xs rounded-md transition-all whitespace-nowrap"
            >
              + Provision
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-red-400 font-mono animate-pulse">{error}</p>}
    </div>
  );
}