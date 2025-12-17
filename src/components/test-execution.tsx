import React, { useState } from 'react';
import { Play, Download, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface TestExecutionProps {
  requirementId: string;
  onMarkReady: () => void;
}

interface TestRun {
  id: string;
  duration: string;
  environment: string;
  executor: string;
  status: 'Passed' | 'Failed' | 'Blocked';
  passRate: number;
  steps: TestStep[];
}

interface TestStep {
  step: number;
  action: string;
  status: 'Passed' | 'Failed' | 'Blocked';
  screenshot: string;
}

interface Defect {
  caseId: string;
  step: number;
  screenshot: string;
  error: string;
  assigned: string;
  resolved: boolean;
}

export function TestExecution({ requirementId, onMarkReady }: TestExecutionProps) {
  const [selectedRun, setSelectedRun] = useState<TestRun | null>(null);
  const [defects, setDefects] = useState<Defect[]>([
    { caseId: 'TC-002', step: 3, screenshot: 'error_screenshot.png', error: 'Customer validation timeout', assigned: '', resolved: false }
  ]);

  const [testRuns] = useState<TestRun[]>([
    {
      id: 'RUN-001',
      duration: '8m 32s',
      environment: 'QA',
      executor: 'System',
      status: 'Passed',
      passRate: 100,
      steps: [
        { step: 1, action: 'Navigate to Order Entry', status: 'Passed', screenshot: 'step1.png' },
        { step: 2, action: 'Enter customer details', status: 'Passed', screenshot: 'step2.png' },
        { step: 3, action: 'Add line items', status: 'Passed', screenshot: 'step3.png' },
        { step: 4, action: 'Submit order', status: 'Passed', screenshot: 'step4.png' },
        { step: 5, action: 'Verify confirmation', status: 'Passed', screenshot: 'step5.png' }
      ]
    },
    {
      id: 'RUN-002',
      duration: '6m 15s',
      environment: 'QA',
      executor: 'System',
      status: 'Failed',
      passRate: 80,
      steps: [
        { step: 1, action: 'Navigate to Order Entry', status: 'Passed', screenshot: 'step1.png' },
        { step: 2, action: 'Enter invalid customer', status: 'Passed', screenshot: 'step2.png' },
        { step: 3, action: 'Verify error message', status: 'Failed', screenshot: 'error.png' }
      ]
    },
    {
      id: 'RUN-003',
      duration: '12m 45s',
      environment: 'QA',
      executor: 'System',
      status: 'Passed',
      passRate: 100,
      steps: [
        { step: 1, action: 'Login as sales rep', status: 'Passed', screenshot: 'step1.png' },
        { step: 2, action: 'Create order over $10k', status: 'Passed', screenshot: 'step2.png' },
        { step: 3, action: 'Submit for approval', status: 'Passed', screenshot: 'step3.png' },
        { step: 4, action: 'Verify manager notification', status: 'Passed', screenshot: 'step4.png' }
      ]
    }
  ]);

  const passedRuns = testRuns.filter(r => r.status === 'Passed').length;
  const failedRuns = testRuns.filter(r => r.status === 'Failed').length;
  const blockedRuns = testRuns.filter(r => r.status === 'Blocked').length;
  const passPercentage = Math.round((passedRuns / testRuns.length) * 100);
  const threshold = 95;
  const thresholdMet = passPercentage >= threshold;

  const handleMarkReady = () => {
    if (!thresholdMet) {
      alert('Passing threshold not met; fix failures before marking ready');
      return;
    }
    onMarkReady();
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Test Execution</div>
          <div className="flex items-center justify-between">
            <h1>Test Execution – Automation</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
              <span className={`px-3 py-1 rounded text-sm ${
                thresholdMet ? 'bg-success text-white' : 'bg-warning text-white'
              }`}>
                Threshold: Pass ≥{threshold}%
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Summary Tiles */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pass Rate</span>
              <CheckCircle className="text-success" size={24} />
            </div>
            <div className="text-3xl font-bold text-success">{passPercentage}%</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Failed</span>
              <XCircle className="text-error" size={24} />
            </div>
            <div className="text-3xl font-bold text-error">{failedRuns}</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Blocked</span>
              <Clock className="text-warning" size={24} />
            </div>
            <div className="text-3xl font-bold text-warning">{blockedRuns}</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Coverage</span>
              <div className="w-6 h-6 rounded-full bg-[var(--color-mccain-yellow)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--color-mccain-black)]">82%</div>
          </div>
        </section>

        {/* GUI Notice Banner */}
        <section className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div className="flex-1">
              <p className="font-medium text-blue-900 mb-1">Non-browser flows require manual execution</p>
              <p className="text-sm text-blue-700">
                Some SAP GUI transactions cannot be automated via browser.{' '}
                <button className="underline hover:no-underline">Export Manual Set</button> for these flows.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Run Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="mb-4">Test Run Timeline</h2>

              <div className="space-y-3 mb-6">
                {testRuns.map((run) => (
                  <div
                    key={run.id}
                    onClick={() => setSelectedRun(run)}
                    className={`p-4 border rounded-lg cursor-pointer hover:border-[var(--color-mccain-yellow)] transition-colors ${
                      selectedRun?.id === run.id ? 'border-[var(--color-mccain-yellow)] bg-yellow-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-medium">{run.id}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          run.status === 'Passed' ? 'bg-success text-white' :
                          run.status === 'Failed' ? 'bg-error text-white' :
                          'bg-warning text-white'
                        }`}>
                          {run.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">Pass: {run.passRate}%</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Duration: {run.duration}</span>
                      <span>Env: {run.environment}</span>
                      <span>Executor: {run.executor}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleMarkReady}
                  disabled={!thresholdMet}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Mark Ready for Deployment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Play size={18} />
                  Re-run failed
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download size={18} />
                  Export report (PDF)
                </button>
              </div>
            </div>

            {/* Step-by-step Playback */}
            {selectedRun && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="mb-4">Step-by-step Playback: {selectedRun.id}</h3>
                <div className="space-y-3">
                  {selectedRun.steps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{step.action}</span>
                          {step.status === 'Passed' ? (
                            <CheckCircle className="text-success" size={20} />
                          ) : step.status === 'Failed' ? (
                            <XCircle className="text-error" size={20} />
                          ) : (
                            <Clock className="text-warning" size={20} />
                          )}
                        </div>
                        <button className="text-sm text-blue-600 hover:underline">
                          View screenshot: {step.screenshot}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Defects Tray */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="mb-4">Defects</h3>
              
              {defects.length > 0 ? (
                <div className="space-y-3">
                  {defects.map((defect, idx) => (
                    <div key={idx} className="border border-error rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="text-error" size={16} />
                        <span className="font-mono text-sm font-medium">{defect.caseId}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Step {defect.step}: {defect.error}
                      </div>
                      <button className="text-xs text-blue-600 hover:underline mb-2">
                        Screenshot: {defect.screenshot}
                      </button>
                      <div className="flex gap-2 pt-2 border-t border-gray-200">
                        <button className="flex-1 px-2 py-1 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded text-sm hover:bg-opacity-90">
                          Assign
                        </button>
                        <button className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="mx-auto mb-2 text-success" size={32} />
                  <p className="text-sm">No defects found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
