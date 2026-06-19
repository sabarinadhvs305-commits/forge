import { useState } from "react";

export default function TaskForm({ projectMembers = [], onSubmit, onCancel, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigned_to: "", // Maps to user_id/member context
    priority: "medium",
    status: "todo",
    due_date: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Task requires a clear tracking title.";
    if (!formData.description.trim()) newErrors.description = "Provide an execution breakdown description.";
    if (!formData.assigned_to) newErrors.assigned_to = "Assign this task item to a team member node.";
    if (!formData.due_date) newErrors.due_date = "Sprints require an explicit due date limit.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-zinc-200">
      
      {/* Task Title */}
      <div className="space-y-1">
        <label htmlFor="title" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
          Task Title / Sprint Objective
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Integrate Groq API Endpoint Wrapper"
          className={`w-full px-4 py-2 bg-[#151515] border ${
            errors.title ? "border-red-500/50" : "border-[#232323]"
          } rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors`}
        />
        {errors.title && <p className="text-xs text-red-400 font-mono">{errors.title}</p>}
      </div>

      {/* Grid Layout for Assignment and Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Assign To Member Dropdown */}
        <div className="space-y-1">
          <label htmlFor="assigned_to" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Assign Node Vector
          </label>
          <select
            id="assigned_to"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-[#151515] border ${
              errors.assigned_to ? "border-red-500/50" : "border-[#232323]"
            } rounded-md text-sm text-zinc-100 focus:outline-none focus:border-[#D97706] transition-colors`}
          >
            <option value="" className="text-zinc-600">Select Team Member...</option>
            {projectMembers.map((member) => (
              <option key={member.id || member.user_id} value={member.id || member.user_id}>
                {member.name || member.email} {member.assigned_role ? `(${member.assigned_role})` : ''}
              </option>
            ))}
          </select>
          {errors.assigned_to && <p className="text-xs text-red-400 font-mono">{errors.assigned_to}</p>}
        </div>

        {/* Due Date Picker */}
        <div className="space-y-1">
          <label htmlFor="due_date" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Due Date Timeline
          </label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-[#151515] border ${
              errors.due_date ? "border-red-500/50" : "border-[#232323]"
            } rounded-md text-sm text-zinc-100 focus:outline-none focus:border-[#D97706] transition-colors color-scheme-dark`}
          />
          {errors.due_date && <p className="text-xs text-red-400 font-mono">{errors.due_date}</p>}
        </div>
      </div>

      {/* Priority and Initial Status Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Priority Selector */}
        <div className="space-y-1">
          <label htmlFor="priority" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Priority Tier Allocation
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#151515] border border-[#232323] rounded-md text-sm text-zinc-100 focus:outline-none focus:border-[#D97706] transition-colors"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority / Critical</option>
          </select>
        </div>

        {/* Workflow Lifecycle Status */}
        <div className="space-y-1">
          <label htmlFor="status" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Initial Lifecycle State
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#151515] border border-[#232323] rounded-md text-sm text-zinc-100 focus:outline-none focus:border-[#D97706] transition-colors"
          >
            <option value="todo">To Do (Backlog)</option>
            <option value="in_progress">In Progress (Active Execution)</option>
            <option value="review">Under Code Review</option>
            <option value="completed">Completed / Merged</option>
          </select>
        </div>
      </div>

      {/* Task Description Textarea */}
      <div className="space-y-1">
        <label htmlFor="description" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
          Execution Details & Technical Acceptance Criteria
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="State structural guidelines, architectural dependencies, or checklist specifications for this task block..."
          className={`w-full px-4 py-2 bg-[#151515] border ${
            errors.description ? "border-red-500/50" : "border-[#232323]"
          } rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors resize-none`}
        />
        {errors.description && <p className="text-xs text-red-400 font-mono">{errors.description}</p>}
      </div>

      {/* Form Action Controls Footer */}
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
        )}</div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-mono font-semibold bg-[#D97706] text-black rounded hover:bg-[#b56205] transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? "Committing Task Element..." : "Deploy Task to Board →"}
        </button>
      </form>
  );
}