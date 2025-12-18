import React, { useState } from 'react';
import { CheckCircle, XCircle, Play, Eye } from 'lucide-react';

interface BuildGatesProps {
  requirementId: string;
  onGenerateTestSuite: () => void;
}

interface Stage {
  id: number;
  name: string;
  status: 'Pass' | 'Fail' | 'Pending';
  buttonLabel: string;
}

export function BuildGates({ requirementId, onGenerateTestSuite }: BuildGatesProps) {
  const [stages, setStages] = useState<Stage[]>([
    { id: 1, name: 'Code Quality (includes Naming Standards)', status: 'Pending', buttonLabel: 'Run Code Quality' },
    { id: 2, name: 'Security Scan', status: 'Pending', buttonLabel: 'Run Security Scan' },
    { id: 3, name: 'Peer Review', status: 'Pending', buttonLabel: 'Request Peer Review' }
  ]);

  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string>('');

  const [peerReviews] = useState([
    { reviewer: 'Tech Lead', status: 'Pending', notes: '' },
    { reviewer: 'Senior Dev', status: 'Pending', notes: '' }
  ]);

  const [autoImportedTasks] = useState([
    { id: '1', task: 'Validate UI5 controller logic', completed: false },
    { id: '2', task: 'Check ABAP function module', completed: false },
    { id: '3', task: 'Review API endpoint security', completed: false },
    { id: '4', task: 'Verify configuration settings', completed: false }
  ]);

  const allStagesPassed = stages.every(s => s.status === 'Pass');

  const handleRunStage = (stageId: number) => {
    // Simulate running the stage
    setStages(stages.map(s => 
      s.id === stageId ? { ...s, status: 'Pass' as const } : s
    ));
  };

  const handleViewEvidence = (stageName: string) => {
    setSelectedEvidence(stageName);
    setShowEvidenceModal(true);
  };

  const getEvidenceContent = (stageName: string) => {
    if (stageName.includes('Code Quality')) {
      return {
        title: 'Code Quality Report',
        content: [
          '✓ Linting: 0 errors, 2 warnings',
          '✓ Code complexity: All functions below threshold',
          '✓ Naming standards: 100% compliant',
          '✓ Documentation: All public methods documented',
          '⚠ Warning: Consider refactoring order validation function (complexity: 12)'
        ]
      };
    } else if (stageName.includes('Security')) {
      return {
        title: 'Security Scan Report',
        content: [
          '✓ No SQL injection vulnerabilities detected',
          '✓ No hardcoded credentials found',
          '✓ Authorization checks present in all endpoints',
          '✓ Input validation implemented',
          '✓ HTTPS enforced for all API calls'
        ]
      };
    } else {
      return {
        title: 'Peer Review Evidence',
        content: [
          'PR Link: https://git.mccain.com/sap/o2c/pull/123',
          'Approvals: 2/2 required',
          '',
          'Tech Lead: "Approved - architecture looks solid"',
          'Senior Dev: "Approved - code is clean and well-tested"'
        ]
      };
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Build Gates</div>
          <div className="flex items-center justify-between">
            <h1>Build Gates</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Quality Gates</h2>
          <p className="text-sm text-gray-600 mb-6">
            All stages must pass before proceeding to test suite generation. Stages are executed in order.
          </p>

          <div className="space-y-6">
            {stages.map((stage) => (
              <div key={stage.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] font-semibold">
                        {stage.id}
                      </span>
                      <h3>{stage.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {stage.status === 'Pass' && (
                      <CheckCircle className="text-success" size={24} />
                    )}
                    {stage.status === 'Fail' && (
                      <XCircle className="text-error" size={24} />
                    )}
                    <span className={`px-3 py-1 rounded text-sm ${
                      stage.status === 'Pass' ? 'bg-success text-white' :
                      stage.status === 'Fail' ? 'bg-error text-white' :
                      'bg-gray-300 text-gray-700'
                    }`}>
                      {stage.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRunStage(stage.id)}
                    disabled={stage.status === 'Pass'}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play size={18} />
                    {stage.buttonLabel}
                  </button>
                  {stage.status === 'Pass' && (
                    <button
                      onClick={() => handleViewEvidence(stage.name)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Eye size={18} />
                      View evidence
                    </button>
                  )}
                </div>

                {stage.name.includes('Peer Review') && stage.status === 'Pass' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="mb-3 text-sm font-medium">Peer Review Status</h4>
                    <div className="space-y-2">
                      {peerReviews.map((review, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{review.reviewer}</span>
                          <span className="px-2 py-1 bg-success text-white rounded text-xs">
                            Approved
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generate Test Suite Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onGenerateTestSuite}
              disabled={!allStagesPassed}
              className="w-full px-6 py-3 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Generate Test Suite (AI)
            </button>
            {!allStagesPassed && (
              <p className="mt-2 text-sm text-center text-error">
                All stages must pass before generating test suite
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Evidence Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3>{getEvidenceContent(selectedEvidence).title}</h3>
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                {getEvidenceContent(selectedEvidence).content.map((line, idx) => (
                  <div key={idx} className={line.startsWith('✓') ? 'text-success' : line.startsWith('⚠') ? 'text-warning' : ''}>
                    {line || <br />}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}