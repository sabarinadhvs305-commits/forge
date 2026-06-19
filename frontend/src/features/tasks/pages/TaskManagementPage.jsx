import { useState } from "react";
import TaskForm from "../../../components/forms/TaskForm"; // Adjust relative path as needed
// Note: Alternatively imported from "../../../components/forms/TaskForm"

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState([
    {
      id: 101,
      title: "Configure PostgreSQL Connections",
      description: "Setup async connection pooling loops using SQLAlchemy inside FastAPI core config files.",
      assigned_to: "1",
      priority: "high",
      status: "in_progress",
      due_date: "2026-07-01"
    }
  ]);

  // Mocked project team roster derived from project_members table query
  const [mockMembers] = useState([
    { id: "1", name: "Sabarish", assigned_role: "Backend Lead" },
    { id: "2", name: "Alex", assigned_role: "Frontend Engineer" }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleTaskSubmit = async (newTaskData) => {
    // 1. In production, this triggers your FastAPI service: await taskService.create(newTaskData)
    const taskNode = {
      id: Date.now(), // Temporary unique timestamp ID
      ...newTaskData
    };

    // 2. Optimistically update local application UI state matrix
    setTasks((prev) => [...prev, taskNode]);
    setIsAddingTask(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Sprint Task Matrix</h1>
          <p className="text-sm text-zinc-400">Delegate pipeline responsibilities and manage current execution states.</p>
        </div>
        
        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-[#232323] text-xs font-mono rounded-md transition-all"
        >
          {isAddingTask ? "✕ Close Form" : "+ Create New Sprint Task"}
        </button>
      </div>

      {/* Conditionally Render the Reusable TaskForm Component */}
      {isAddingTask && (
        <div className="p-6 bg-[#111111] border border-[#232323] rounded-xl max-w-xl mx-auto">
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-500 mb-4">Initialize Task Payload</h3>
          <TaskForm 
            projectMembers={mockMembers} 
            onSubmit={handleTaskSubmit} 
            onCancel={() => setIsAddingTask(false)} 
          />
        </div>
      )}

      {/* Simplified List of Rendered Database Tasks */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Active Task Boards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-[#111111] border border-[#232323] rounded-lg space-y-3 font-mono text-xs">
              <div className="flex items-start justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  task.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {task.priority.toUpperCase()}
                </span>
                <span className="text-zinc-500">Due: {task.due_date}</span>
              </div>
              <h4 className="text-sm font-bold text-zinc-200">{task.title}</h4>
              <p className="text-zinc-400 font-sans text-xs leading-relaxed">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}