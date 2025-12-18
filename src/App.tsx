import React, { useState } from 'react';
import { LeftNav } from './components/left-nav';
import { Landing } from './components/landing';
import { IntakeBRD } from './components/intake-brd';
import { Design } from './components/design';
import { CodingTracker } from './components/coding-tracker';
import { BuildGates } from './components/build-gates';
import { TestSuite } from './components/test-suite';
import { Training } from './components/training';

type Screen = 'landing' | 'intake-brd' | 'design' | 'coding-tracker' | 'build-gates' | 'test-suite' | 'training';

interface NavItem {
  id: Screen;
  label: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Ready' | 'Completed';
}

interface RequirementData {
  id: string;
  name: string;
  businessArea: string;
  process: string;
  kpis: string;
  stakeholders: any[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [requirementData, setRequirementData] = useState<RequirementData | null>(null);
  const [showNav, setShowNav] = useState(false);

  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: 'intake-brd', label: 'Intake & BRD', status: 'Draft' },
    { id: 'design', label: 'Design', status: 'Draft' },
    { id: 'coding-tracker', label: 'Coding Tracker', status: 'Draft' },
    { id: 'build-gates', label: 'Build Gates', status: 'Draft' },
    { id: 'test-suite', label: 'Test Suite', status: 'Draft' },
    { id: 'training', label: 'Training', status: 'Draft' }
  ]);

  const handleCreateRequirement = (data: any) => {
    setRequirementData(data);
    setShowNav(true);
    setCurrentScreen('intake-brd');
  };

  const handleOpenExisting = (reqId: string) => {
    // Mock data for existing requirement
    setRequirementData({
      id: reqId,
      name: 'O2C Enhancement',
      businessArea: 'Sales',
      process: 'O2C',
      kpis: 'Improve order processing time by 40%',
      stakeholders: []
    });
    setShowNav(true);
    setCurrentScreen('intake-brd');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const updateNavStatus = (screenId: Screen, status: NavItem['status']) => {
    setNavItems(navItems.map(item => 
      item.id === screenId ? { ...item, status } : item
    ));
  };

  const handleIntakeBRDApprove = () => {
    updateNavStatus('intake-brd', 'Approved');
    updateNavStatus('design', 'In Review');
    setCurrentScreen('design');
  };

  const handleDesignApprove = () => {
    updateNavStatus('design', 'Approved');
    updateNavStatus('coding-tracker', 'In Review');
    setCurrentScreen('coding-tracker');
  };

  const handleCodingReadyForGates = () => {
    updateNavStatus('coding-tracker', 'Ready');
    updateNavStatus('build-gates', 'In Review');
    setCurrentScreen('build-gates');
  };

  const handleGenerateTestSuite = () => {
    updateNavStatus('build-gates', 'Approved');
    updateNavStatus('test-suite', 'In Review');
    setCurrentScreen('test-suite');
  };

  const handleTestSuiteComplete = () => {
    updateNavStatus('test-suite', 'Approved');
    updateNavStatus('training', 'Ready');
    setCurrentScreen('training');
  };

  const renderScreen = () => {
    const reqId = requirementData?.id || 'REQ-PENDING';

    switch (currentScreen) {
      case 'landing':
        return (
          <Landing
            onCreateRequirement={handleCreateRequirement}
            onOpenExisting={handleOpenExisting}
          />
        );
      case 'intake-brd':
        return (
          <IntakeBRD
            requirementId={reqId}
            onApprove={handleIntakeBRDApprove}
          />
        );
      case 'design':
        return (
          <Design
            requirementId={reqId}
            onApprove={handleDesignApprove}
          />
        );
      case 'coding-tracker':
        return (
          <CodingTracker
            requirementId={reqId}
            onReadyForGates={handleCodingReadyForGates}
          />
        );
      case 'build-gates':
        return (
          <BuildGates
            requirementId={reqId}
            onGenerateTestSuite={handleGenerateTestSuite}
          />
        );
      case 'test-suite':
        return (
          <TestSuite
            requirementId={reqId}
            onComplete={handleTestSuiteComplete}
          />
        );
      case 'training':
        return <Training requirementId={reqId} />;
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Navigation - Only show after requirement created */}
      {showNav && (
        <LeftNav
          activeScreen={currentScreen}
          onNavigate={handleNavigation}
          navItems={navItems}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
}
