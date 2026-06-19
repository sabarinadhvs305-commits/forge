import { useState } from "react";

export default function ProjectForm({ onSubmit, onCancel, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    title: "",
    timeline_weeks: 12,
    description: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeline_weeks" ? parseInt(value, 10) || 0 : value,
    }));
    // Clear error dynamically when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation schema before sending to FastAPI
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Project architecture needs a title.";
    if (!formData.description.trim()) newErrors.description = "A brief summary description is required.";
    if (!formData.idea.trim()) newErrors.idea = "Provide the core raw concept for the Llama 3 validator engine.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-zinc-200">
      {/* Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
          Project Core Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Smart Campus Resource Optimizer"
          className={`w-full px-4 py-2.5 bg-[#151515] border ${
            errors.title ? "border-red-500/50" : "border-[#232323]"
          } rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors`}
        />
        {errors.title && <p className="text-xs text-red-400 font-mono">{errors.title}</p>}
      </div>

      {/* Timeline Input */}
      <div className="space-y-2">
        <label htmlFor="timeline_weeks" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
          Sprints Horizon Allocation ({formData.timeline_weeks} Weeks)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            id="timeline_weeks"
            name="timeline_weeks"
            min="4"
            max="24"
            step="1"
            value={formData.timeline_weeks}
            onChange={handleChange}
            className="flex-1 accent-[#D97706] bg-[#1c1c1c] h-1 rounded-lg dynamic-slider cursor-pointer"
          />
          <span className="w-12 text-center text-sm font-mono bg-[#111111] border border-[#232323] px-2 py-1 rounded text-zinc-300">
            {formData.timeline_weeks}w
          </span>
        </div>
      </div>

      {/* Brief Summary Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
          High-Level Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief baseline target or problem statement..."
          className={`w-full px-4 py-2.5 bg-[#151515] border ${
            errors.description ? "border-red-500/50" : "border-[#232323]"
          } rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors`}
        />
        {errors.description && <p className="text-xs text-red-400 font-mono">{errors.description}</p>}
      </div>

      {/* Deep Raw Idea Box (For AI Parsing) */}
      <div className="space-y-2">
        <label htmlFor="idea" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
          Raw Architectural Idea & Feature Scope
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={5}
          value={formData.idea}
          onChange={handleChange}
          placeholder="Describe your operational model, technological targets, core workflow algorithms, and parameters for processing..."
          className={`w-full px-4 py-2.5 bg-[#151515] border ${
            errors.idea ? "border-red-500/50" : "border-[#232323]"
          } rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors resize-none`}
        />
        {errors.idea && <p className="text-xs text-red-400 font-mono">{errors.idea}</p>}
        <p className="text-[11px] text-zinc-500 font-mono">This pipeline text element serves as primary context input for DeepSeek / Llama 3 engines.</p>
      </div>

      {/* Action Footers */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1c1c1c]">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-mono border border-[#232323] hover:bg-[#151515] rounded text-zinc-400 hover:text-zinc-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-mono font-semibold bg-[#D97706] text-black rounded hover:bg-[#b56205] transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Initializing Pipeline...
            </>
          ) : (
            "Forge Project Matrix →"
          )}
        </button>
      </div>
    </form>
  );
}