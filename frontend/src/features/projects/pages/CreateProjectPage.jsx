import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../../../components/forms/ProjectForm";
import MemberForm from "../../../components/forms/MemberForm";

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Storage states mirroring project and project_members tables
  const [projectMetadata, setProjectMetadata] = useState(null);
  const [teamRoster, setTeamRoster] = useState([]);

  const handleMetadataSubmit = (formData) => {
    setProjectMetadata(formData);
    setCurrentStep(2); // Advance step seamlessly to team construction
  };

  const handleAddMemberPayload = (member) => {
    setTeamRoster((prev) => [...prev, member]);
  };

  const handleRemoveMember = (indexToRemove) => {
    setTeamRoster((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleFinalizeProjectMatrix = async () => {
    setLoading(true);
    try {
      const finalPayload = {
        ...projectMetadata,
        members: teamRoster
      };
      
      console.log("Transmitting absolute relational payload to FastAPI backend:", finalPayload);
      
      // 1. Production Setup (Uncomment this when API is ready):
      // const response = await projectService.create(finalPayload);
      // const dynamicProjectId = response.id;
      
      // 2. Local State Router Fix:
      // For now, we mock an assignment ID (e.g., 1) to pass straight through to the route parameter
      const temporaryProjectId = 1; 

      // 3. Redirection Routing Update:
      // Direct deep link straight into the validation pipeline screen instead of back to workspace dashboard
      navigate(`/validation/${temporaryProjectId}`);
    } catch (error) {
      console.error("Relational commit execution fault:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Visual Step Tracker Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            {currentStep === 1 ? "Initialize New Project Matrix" : "Assemble Project Team Matrix"}
          </h1>
          <p className="text-sm text-zinc-400">Step {currentStep} of 2 — Compiling framework configurations.</p>
        </div>
        <div className="flex gap-1.5 font-mono text-xs">
          <span className={`w-2 h-2 rounded-full ${currentStep >= 1 ? "bg-[#D97706]" : "bg-zinc-800"}`} />
          <span className={`w-2 h-2 rounded-full ${currentStep === 2 ? "bg-[#D97706]" : "bg-zinc-800"}`} />
        </div>
      </div>

      {currentStep === 1 ? (
        <div className="p-6 bg-[#111111] border border-[#232323] rounded-xl">
          <ProjectForm 
            onSubmit={handleMetadataSubmit} 
            onCancel={() => navigate("/dashboard")} 
            isSubmitting={loading} 
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#232323] rounded-xl space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400">Add Team Allocation Paths</h3>
            <MemberForm onAddMember={handleAddMemberPayload} currentMembers={teamRoster} />
          </div>

          {/* Staged Team List Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Staged Roster Row Allocations</h3>
            {teamRoster.length === 0 ? (
              <div className="p-6 border border-dashed border-[#232323] bg-[#111111]/50 rounded-lg text-center text-xs text-zinc-600 font-mono">
                No external developer routes provisioned yet. Project owner remains sole node.
              </div>
            ) : (
              <div className="space-y-2">
                {teamRoster.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#111111] border border-[#232323] rounded-lg font-mono text-xs">
                    <div>
                      <div className="text-zinc-200 font-medium">{member.email}</div>
                      <div className="text-zinc-500 mt-1">Skills: <span className="text-zinc-400">{member.skills}</span></div>
                    </div>
                    <button 
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-500 hover:text-red-400 hover:underline px-2 py-1"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stepper Finalize Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1c1c1c]">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-mono border border-[#232323] hover:bg-[#151515] rounded text-zinc-400 hover:text-zinc-200 transition-all"
            >
              ← Back to Project Details
            </button>
            <button
              onClick={handleFinalizeProjectMatrix}
              disabled={loading}
              className="px-5 py-2 text-xs font-mono font-semibold bg-[#D97706] text-black rounded hover:bg-[#b56205] transition-all flex items-center gap-2"
            >
              {loading ? "Provisioning Architecture..." : "Finalize & Launch Idea Validation →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}