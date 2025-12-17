import React, { useState } from 'react';
import { RefreshCw, Play, FileDown, UserPlus } from 'lucide-react';

interface TestSuiteProps {
  requirementId: string;
  onRunAutomation: () => void;
}

interface TestCase {
  id: string;
  title: string;
  preconditions: string;
  expectedResult: string;
  coverage: number;
  processStep: string;
  acceptanceCriteria: string;
  reviewerComment: string;
}

export function TestSuite({ requirementId, onRunAutomation }: TestSuiteProps) {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [casesGenerated, setCasesGenerated] = useState(false);
  const [reviewersAssigned, setReviewersAssigned] = useState(false);
  const [casesApproved, setCasesApproved] = useState(false);
  const [caseStatus, setCaseStatus] = useState<'Cases In Review' | 'Cases Approved'>('Cases In Review');

  const mockTestCases: TestCase[] = [
    {
      id: 'TC-001',
      title: 'Create new order with valid customer',
      preconditions: 'User logged in as Sales Rep, Customer exists in system',
      expectedResult: 'Order created successfully, Order ID displayed, Email sent to customer',
      coverage: 85,
      processStep: 'Order Creation',
      acceptanceCriteria: 'Order processing time < 2 minutes',
      reviewerComment: ''
    },
    {
      id: 'TC-002',
      title: 'Create order with invalid customer',
      preconditions: 'User logged in as Sales Rep',
      expectedResult: 'Error message displayed: "Customer not found"',
      coverage: 90,
      processStep: 'Order Creation',
      acceptanceCriteria: 'Proper validation error handling',
      reviewerComment: ''
    },
    {
      id: 'TC-003',
      title: 'Order requires manager approval',
      preconditions: 'User logged in as Sales Rep, Order amount > $10,000',
      expectedResult: 'Order status = "Pending Approval", Manager notified',
      coverage: 75,
      processStep: 'Order Approval',
      acceptanceCriteria: 'Manager approval workflow',
      reviewerComment: ''
    },
    {
      id: 'TC-004',
      title: 'Check order status',
      preconditions: 'Order exists in system',
      expectedResult: 'Order details displayed with current status',
      coverage: 80,
      processStep: 'Order Tracking',
      acceptanceCriteria: 'Real-time status updates',
      reviewerComment: ''
    },
    {
      id: 'TC-005',
      title: 'Apply discount to order',
      preconditions: 'User has discount authorization',
      expectedResult: 'Discount applied, Total recalculated',
      coverage: 70,
      processStep: 'Order Creation',
      acceptanceCriteria: 'Discount validation rules',
      reviewerComment: ''
    }
  ];

  const handleGenerateTestCases = () => {
    setTestCases(mockTestCases);
    setCasesGenerated(true);
  };

  const handleAssignReviewers = () => {
    if (!casesGenerated) {
      alert('Generate or import cases before assigning reviewers');
      return;
    }
    setReviewersAssigned(true);
  };

  const handleApproveTestCases = () => {
    if (!reviewersAssigned) {
      alert('Reviewer approval required before running automated tests');
      return;
    }
    setCasesApproved(true);
    setCaseStatus('Cases Approved');
  };

  const handleRunAutomation = () => {
    if (!casesApproved) {
      alert('Reviewer approval required before running automated tests');
      return;
    }
    onRunAutomation();
  };

  const avgCoverage = testCases.length > 0 
    ? Math.round(testCases.reduce((sum, tc) => sum + tc.coverage, 0) / testCases.length)
    : 0;

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Test Suite</div>
          <div className="flex items-center justify-between">
            <h1>Test Suite – AI Generation & Approval</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
              <span className={`px-3 py-1 rounded text-sm ${
                caseStatus === 'Cases Approved' ? 'bg-success text-white' : 'bg-warning text-white'
              }`}>
                {caseStatus}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Test Cases Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2>Test Cases</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleGenerateTestCases}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90"
                  >
                    <RefreshCw size={18} />
                    Generate Test Cases (AI)
                  </button>
                  <button
                    onClick={handleAssignReviewers}
                    disabled={!casesGenerated}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus size={18} />
                    Assign reviewers
                  </button>
                  <button
                    onClick={handleApproveTestCases}
                    disabled={!reviewersAssigned}
                    className="px-4 py-2 bg-success text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Approve Test Cases
                  </button>
                </div>
              </div>

              {casesApproved && (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={handleRunAutomation}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90"
                  >
                    <Play size={18} />
                    Run Automated Tests (Browser)
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FileDown size={18} />
                    Export Manual Set
                  </button>
                </div>
              )}

              {casesGenerated ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Case ID</th>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Preconditions</th>
                        <th className="text-left py-3 px-4">Expected Result</th>
                        <th className="text-left py-3 px-4">Coverage %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testCases.map((testCase) => (
                        <tr key={testCase.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{testCase.id}</td>
                          <td className="py-3 px-4">
                            <div className="mb-1">{testCase.title}</div>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {testCase.processStep}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                {testCase.acceptanceCriteria}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 max-w-xs">
                            {testCase.preconditions}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 max-w-xs">
                            {testCase.expectedResult}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[var(--color-mccain-yellow)] h-2 rounded-full"
                                  style={{ width: `${testCase.coverage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{testCase.coverage}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Click "Generate Test Cases (AI)" to create test cases from your requirements</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Coverage Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="mb-4">Coverage</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[var(--color-mccain-black)] mb-2">
                  {avgCoverage}%
                </div>
                <p className="text-sm text-gray-600">Overall Coverage</p>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Order Creation</span>
                    <span>85%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Order Approval</span>
                    <span>75%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Order Tracking</span>
                    <span>80%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>

              {casesGenerated && avgCoverage < 85 && (
                <div className="p-3 bg-warning bg-opacity-10 border border-warning rounded-lg">
                  <p className="text-sm font-medium text-warning mb-2">Coverage Gaps</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Order cancellation flow</li>
                    <li>• Bulk order processing</li>
                  </ul>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">
                    Add case
                  </button>
                </div>
              )}

              {reviewersAssigned && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-3">Reviewers</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Lead Tester</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        casesApproved ? 'bg-success text-white' : 'bg-gray-200'
                      }`}>
                        {casesApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>QA Manager</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        casesApproved ? 'bg-success text-white' : 'bg-gray-200'
                      }`}>
                        {casesApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
