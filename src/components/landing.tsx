import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, X } from 'lucide-react';
import McCainLogo from '../imports/McCainLogo1-33-97';

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  team: string;
  addedBy: string;
  timestamp: string;
}

interface LandingProps {
  onCreateRequirement: (data: any) => void;
  onOpenExisting: (reqId: string) => void;
}

export function Landing({ onCreateRequirement, onOpenExisting }: LandingProps) {
  const [projectMode, setProjectMode] = useState<'existing' | 'new'>('existing');
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [showStakeholderModal, setShowStakeholderModal] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingId, setTrackingId] = useState('');
  
  // Stakeholder modal form state
  const [stakeholderForm, setStakeholderForm] = useState({
    name: '',
    role: '',
    team: ''
  });

  // Requirement modal form state
  const [requirementForm, setRequirementForm] = useState({
    name: '',
    businessArea: '',
    process: '',
    kpis: ''
  });

  const roleOptions = [
    'Developer',
    'Designer',
    'Tester',
    'Business Analyst',
    'Architect',
    'Trainer',
    'Business Owner',
    'Project Manager'
  ];

  const teamOptions = [
    'UI5 Frontend',
    'ABAP Backend',
    'Integration/APIs',
    'Config/IMG',
    'Testing',
    'Training',
    'Architecture',
    'Data & Security',
    'Business'
  ];

  const departmentOptions = ['SAP', 'Non‑SAP', 'Cross‑platform'];

  const handleAddStakeholder = () => {
    if (!stakeholderForm.name || !stakeholderForm.role || !stakeholderForm.team) {
      return;
    }

    const newStakeholder: Stakeholder = {
      id: Math.random().toString(36).substr(2, 9),
      name: stakeholderForm.name,
      role: stakeholderForm.role,
      team: stakeholderForm.team,
      addedBy: 'Current User',
      timestamp: new Date().toISOString()
    };

    setStakeholders([...stakeholders, newStakeholder]);
    setStakeholderForm({ name: '', role: '', team: '' });
    setShowStakeholderModal(false);
  };

  const handleRemoveStakeholder = (id: string) => {
    setStakeholders(stakeholders.filter(s => s.id !== id));
  };

  const handleCreateRequirement = () => {
    if (!requirementForm.name) {
      alert('Please provide a requirement name');
      return;
    }

    const requirementData = {
      ...requirementForm,
      stakeholders,
      id: `REQ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };

    onCreateRequirement(requirementData);
  };

  const handleToggleFunction = (func: string) => {
    if (stakeholderForm.functions.includes(func)) {
      setStakeholderForm({
        ...stakeholderForm,
        functions: stakeholderForm.functions.filter(f => f !== func)
      });
    } else {
      setStakeholderForm({
        ...stakeholderForm,
        functions: [...stakeholderForm.functions, func]
      });
    }
  };

  const mockApprovals = [
    { phase: 'BRD', title: 'O2C Enhancement', assignee: 'John Smith', dueDate: '2025-12-20' },
    { phase: 'Design', title: 'P2P Automation', assignee: 'Sarah Jones', dueDate: '2025-12-18' }
  ];

  const mockProjects = [
    { title: 'O2C Enhancement', phase: 'Design', updated: '2 hours ago' },
    { title: 'P2P Automation', phase: 'Coding Tracker', updated: '5 hours ago' },
    { title: 'Inventory Module', phase: 'Test Suite', updated: '1 day ago' },
    { title: 'Sales Dashboard', phase: 'Training', updated: '2 days ago' },
    { title: 'Finance Integration', phase: 'Deployment', updated: '3 days ago' }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="w-28 h-14">
              <McCainLogo />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Global Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search Requirement ID/name/owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                />
              </div>

              {/* Project Switcher */}
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <span>Current Project</span>
                <ChevronDown size={16} />
              </button>

              {/* Dynamic Counts */}
              <div className="flex items-center gap-4 px-4 py-2 bg-[var(--color-mccain-yellow)] bg-opacity-10 rounded-lg">
                <span className="text-sm">Approvals pending:</span>
                <span className="text-sm font-semibold">BRD [2]</span>
                <span className="text-sm">|</span>
                <span className="text-sm font-semibold">Design [1]</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8 pb-16">
        {/* Start Project Section */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="mb-4">Start Project</h2>
            
            {/* Segmented Control */}
            <div className="inline-flex rounded-lg border border-gray-300 mb-6">
              <button
                onClick={() => setProjectMode('existing')}
                className={`px-6 py-2 rounded-l-lg transition-colors ${
                  projectMode === 'existing'
                    ? 'bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                Edit in existing project
              </button>
              <button
                onClick={() => setProjectMode('new')}
                className={`px-6 py-2 rounded-r-lg transition-colors border-l border-gray-300 ${
                  projectMode === 'new'
                    ? 'bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                Start a new project
              </button>
            </div>

            {/* Cards based on mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectMode === 'existing' && (
                <>
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-[var(--color-mccain-yellow)] transition-colors">
                    <h3 className="mb-2">Start a Requirement in this project</h3>
                    <p className="text-gray-600 mb-4">Create a new SAP SDLC item under the selected project</p>
                    <button
                      onClick={() => setShowRequirementModal(true)}
                      className="w-full px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      New Requirement
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:border-[var(--color-mccain-yellow)] transition-colors">
                    <h3 className="mb-2">Track existing requirement</h3>
                    <p className="text-gray-600 mb-4">Open and continue work on an existing requirement</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Requirement ID"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                      />
                      <button
                        onClick={() => trackingId && onOpenExisting(trackingId)}
                        disabled={!trackingId}
                        className="px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </>
              )}

              {projectMode === 'new' && (
                <div className="border border-gray-200 rounded-lg p-6 hover:border-[var(--color-mccain-yellow)] transition-colors">
                  <h3 className="mb-2">Start a Requirement</h3>
                  <p className="text-gray-600 mb-4">Create a new SAP SDLC item</p>
                  <button
                    onClick={() => setShowRequirementModal(true)}
                    className="w-full px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    New Requirement
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* View Approvals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="mb-4">View approvals</h3>
            <div className="space-y-3">
              {mockApprovals.map((approval, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-[var(--color-mccain-yellow)] bg-opacity-20 text-xs rounded">{approval.phase}</span>
                      <span className="font-medium">{approval.title}</span>
                    </div>
                    <p className="text-gray-600">Assignee: {approval.assignee}</p>
                  </div>
                  <span className="text-sm text-gray-500">Due: {approval.dueDate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="mb-4">My projects</h3>
            <div className="space-y-3">
              {mockProjects.map((project, idx) => (
                <div key={idx} className="py-2 border-b border-gray-100 last:border-0">
                  <div className="font-medium mb-1">{project.title}</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phase: {project.phase}</span>
                    <span className="text-gray-500">{project.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex gap-4 pb-12">
          <button
            onClick={() => setShowRequirementModal(true)}
            className="px-6 py-3 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 transition-colors"
          >
            New Requirement
          </button>
          <button
            disabled={projectMode !== 'existing'}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Open existing project
          </button>
        </div>
      </main>

      {/* Add Stakeholder Modal */}
      {showStakeholderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3>Add Stakeholder</h3>
              <button onClick={() => setShowStakeholderModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2">Stakeholder (people picker)</label>
                <input
                  type="text"
                  value={stakeholderForm.name}
                  onChange={(e) => setStakeholderForm({ ...stakeholderForm, name: e.target.value })}
                  placeholder="Enter name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                />
              </div>

              <div>
                <label className="block mb-2">Role</label>
                <select
                  value={stakeholderForm.role}
                  onChange={(e) => setStakeholderForm({ ...stakeholderForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                >
                  <option value="">Select role...</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Team</label>
                <select
                  value={stakeholderForm.team}
                  onChange={(e) => setStakeholderForm({ ...stakeholderForm, team: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                >
                  <option value="">Select team...</option>
                  {teamOptions.map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowStakeholderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStakeholder}
                disabled={!stakeholderForm.name || !stakeholderForm.role || !stakeholderForm.team}
                className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Requirement Modal */}
      {showRequirementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3>New Requirement</h3>
              <button onClick={() => setShowRequirementModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Requirement Details */}
              <div className="space-y-4">
                <h4>Requirement Details</h4>
                
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    value={requirementForm.name}
                    onChange={(e) => setRequirementForm({ ...requirementForm, name: e.target.value })}
                    placeholder="Enter requirement name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Business Area</label>
                    <select
                      value={requirementForm.businessArea}
                      onChange={(e) => setRequirementForm({ ...requirementForm, businessArea: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                    >
                      <option value="">Select...</option>
                      <option value="Sales">Sales</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Supply Chain">Supply Chain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">Project Type</label>
                    <input
                      type="text"
                      value="SAP"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Process</label>
                  <select
                    value={requirementForm.process}
                    onChange={(e) => setRequirementForm({ ...requirementForm, process: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                  >
                    <option value="">Select...</option>
                    <option value="O2C">Order to Cash (O2C)</option>
                    <option value="P2P">Procure to Pay (P2P)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">KPIs</label>
                  <textarea
                    value={requirementForm.kpis}
                    onChange={(e) => setRequirementForm({ ...requirementForm, kpis: e.target.value })}
                    placeholder="Enter KPIs..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                  />
                </div>
              </div>

              {/* Stakeholder Assignment */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4>Stakeholder Assignment</h4>
                  <button
                    onClick={() => setShowStakeholderModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 text-sm"
                  >
                    <Plus size={16} />
                    Add Stakeholder
                  </button>
                </div>

                {stakeholders.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-sm">Name</th>
                          <th className="text-left py-2 px-3 text-sm">Role</th>
                          <th className="text-left py-2 px-3 text-sm">Team</th>
                          <th className="text-left py-2 px-3 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stakeholders.map((stakeholder) => (
                          <tr key={stakeholder.id} className="border-t border-gray-200">
                            <td className="py-2 px-3 text-sm">{stakeholder.name}</td>
                            <td className="py-2 px-3 text-sm">{stakeholder.role}</td>
                            <td className="py-2 px-3 text-sm">{stakeholder.team}</td>
                            <td className="py-2 px-3 text-sm">
                              <button
                                onClick={() => handleRemoveStakeholder(stakeholder.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
                    <p className="text-sm">No stakeholders added yet. Click "Add Stakeholder" to get started.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowRequirementModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequirement}
                disabled={!requirementForm.name}
                className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}