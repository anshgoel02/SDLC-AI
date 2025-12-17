import React, { useState } from 'react';
import { Plus, Link as LinkIcon, Users, Calendar } from 'lucide-react';

interface CodingTrackerProps {
  requirementId: string;
  onReadyForGates: () => void;
}

interface Task {
  id: string;
  title: string;
  tag: 'ui5' | 'abap' | 'api' | 'config';
  team: string;
  assignee: string;
  status: 'Generation queued' | 'Generated' | 'Refined' | 'Ready for Gates';
  dueDate: string;
  lastUpdated: string;
}

interface Team {
  name: string;
  lead: string;
  members: number;
  contact: string;
  status: 'Not Started' | 'In Progress' | 'Blocked' | 'Done';
}

interface Milestone {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Done';
  dueDate: string;
  owner: string;
}

export function CodingTracker({ requirementId, onReadyForGates }: CodingTrackerProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Order Entry UI Component', tag: 'ui5', team: 'UI5 Frontend', assignee: 'Jane Smith', status: 'Refined', dueDate: '2025-12-18', lastUpdated: '2 hours ago' },
    { id: '2', title: 'Order Processing ABAP Function', tag: 'abap', team: 'ABAP Backend', assignee: 'John Doe', status: 'Generated', dueDate: '2025-12-20', lastUpdated: '5 hours ago' },
    { id: '3', title: 'Customer Search API', tag: 'api', team: 'Integration/APIs', assignee: 'Mike Johnson', status: 'Ready for Gates', dueDate: '2025-12-17', lastUpdated: '1 day ago' },
    { id: '4', title: 'Order Type Configuration', tag: 'config', team: 'Config/IMG', assignee: 'Sarah Lee', status: 'Generation queued', dueDate: '2025-12-22', lastUpdated: '3 hours ago' }
  ]);

  const [teams] = useState<Team[]>([
    { name: 'UI5 Frontend', lead: 'Jane Smith', members: 4, contact: 'jane.smith@mccain.com', status: 'In Progress' },
    { name: 'ABAP Backend', lead: 'John Doe', members: 3, contact: 'john.doe@mccain.com', status: 'In Progress' },
    { name: 'Integration/APIs', lead: 'Mike Johnson', members: 2, contact: 'mike.j@mccain.com', status: 'Done' },
    { name: 'Config/IMG', lead: 'Sarah Lee', members: 2, contact: 'sarah.lee@mccain.com', status: 'Not Started' },
    { name: 'Testing', lead: 'Tom Wilson', members: 3, contact: 'tom.w@mccain.com', status: 'Not Started' },
    { name: 'Training', lead: 'Lisa Brown', members: 2, contact: 'lisa.b@mccain.com', status: 'Not Started' },
    { name: 'Architecture', lead: 'David Chen', members: 2, contact: 'david.c@mccain.com', status: 'In Progress' },
    { name: 'Data & Security', lead: 'Emma Davis', members: 2, contact: 'emma.d@mccain.com', status: 'In Progress' }
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', name: 'Scaffold', status: 'Done', dueDate: '2025-12-08', owner: 'Tech Lead' },
    { id: '2', name: 'Core modules', status: 'In Progress', dueDate: '2025-12-15', owner: 'Dev Team' },
    { id: '3', name: 'Integrations', status: 'In Progress', dueDate: '2025-12-20', owner: 'API Team' },
    { id: '4', name: 'Unit tests', status: 'Not Started', dueDate: '2025-12-22', owner: 'Test Team' },
    { id: '5', name: 'Ready for Gates', status: 'Not Started', dueDate: '2025-12-25', owner: 'Tech Architect' }
  ]);

  const [activityLog] = useState([
    { date: '2025-12-16 10:30', actor: 'Jane Smith', action: 'Manual refinement completed', notes: 'Updated UI validation logic' },
    { date: '2025-12-16 09:15', actor: 'System', action: 'AI generation run', notes: 'Generated ABAP function module' },
    { date: '2025-12-15 16:45', actor: 'Mike Johnson', action: 'Commit record', notes: 'Pushed API endpoint to dev branch' },
    { date: '2025-12-15 14:20', actor: 'John Doe', action: 'Manual refinement completed', notes: 'Added error handling' }
  ]);

  const tagColors = {
    'ui5': 'bg-blue-100 text-blue-800',
    'abap': 'bg-purple-100 text-purple-800',
    'api': 'bg-green-100 text-green-800',
    'config': 'bg-orange-100 text-orange-800'
  };

  const statusColors = {
    'Not Started': 'bg-gray-300 text-gray-700',
    'In Progress': 'bg-warning text-white',
    'Blocked': 'bg-error text-white',
    'Done': 'bg-success text-white'
  };

  const taskStatusOptions = ['Generation queued', 'Generated', 'Refined', 'Ready for Gates'];

  const hasReadyTasks = tasks.some(t => t.status === 'Ready for Gates');

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus as Task['status'] } : t));
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Coding Tracker</div>
          <div className="flex items-center justify-between">
            <h1>Coding Tracker</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
              <span className="px-3 py-1 rounded text-sm bg-info text-white">TD Ready</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Teams Panel */}
        <section className="mb-6">
          <h2 className="mb-4">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <div key={team.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-[var(--color-mccain-yellow)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm">{team.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[team.status]}`}>
                    {team.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    <span>Lead: {team.lead}</span>
                  </div>
                  <div>Members: {team.members}</div>
                  <div className="text-xs">{team.contact}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks & Status Table */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2>Tasks & Status</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90">
                  <Plus size={18} />
                  Add task
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <LinkIcon size={18} />
                  Attach path/link
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Commit record
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Task Title</th>
                    <th className="text-left py-3 px-4">Tag</th>
                    <th className="text-left py-3 px-4">Team</th>
                    <th className="text-left py-3 px-4">Assignee</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Due Date</th>
                    <th className="text-left py-3 px-4">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{task.title}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${tagColors[task.tag]}`}>
                          {task.tag}
                        </span>
                      </td>
                      <td className="py-3 px-4">{task.team}</td>
                      <td className="py-3 px-4">{task.assignee}</td>
                      <td className="py-3 px-4">
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                        >
                          {taskStatusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4">{task.dueDate}</td>
                      <td className="py-3 px-4 text-gray-600">{task.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Paths Panel */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="mb-4">Paths & Resources</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <LinkIcon size={16} className="text-gray-400" />
                <a href="#" className="flex-1 text-blue-600 hover:underline">
                  https://git.mccain.com/sap/o2c-enhancement
                </a>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <LinkIcon size={16} className="text-gray-400" />
                <a href="#" className="flex-1 text-blue-600 hover:underline">
                  https://sharepoint.mccain.com/sap/build-artifacts
                </a>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <LinkIcon size={16} className="text-gray-400" />
                <a href="#" className="flex-1 text-blue-600 hover:underline">
                  https://confluence.mccain.com/config-docs/O2C
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2>Milestones</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90">
                  <Plus size={18} />
                  Add milestone
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit milestone
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-sm font-medium">{milestone.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[milestone.status]}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Owner: {milestone.owner}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Due: {milestone.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Log */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="mb-4">Activity Log</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actor</th>
                    <th className="text-left py-3 px-4">Action</th>
                    <th className="text-left py-3 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLog.map((log, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-600">{log.date}</td>
                      <td className="py-3 px-4 text-sm">{log.actor}</td>
                      <td className="py-3 px-4 text-sm font-medium">{log.action}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{log.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onReadyForGates}
            disabled={!hasReadyTasks}
            className="px-6 py-3 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Build Gates
          </button>
        </div>
      </main>
    </div>
  );
}
