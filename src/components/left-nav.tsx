import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Ready' | 'Completed';
}

interface LeftNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  navItems: NavItem[];
}

const statusColors = {
  'Draft': 'bg-gray-400 text-white',
  'In Review': 'bg-warning text-white',
  'Approved': 'bg-success text-white',
  'Ready': 'bg-info text-white',
  'Completed': 'bg-purple-600 text-white'
};

export function LeftNav({ activeScreen, onNavigate, navItems }: LeftNavProps) {
  return (
    <nav className="w-64 bg-[var(--color-mccain-dark)] text-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-[var(--color-mccain-yellow)]">McCain SDLC</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full px-6 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors ${
              activeScreen === item.id ? 'bg-gray-800 border-l-4 border-[var(--color-mccain-yellow)]' : ''
            }`}
          >
            <span className="flex-1 text-left">{item.label}</span>
            <span className={`px-2 py-1 rounded text-xs ${statusColors[item.status]}`}>
              {item.status}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
