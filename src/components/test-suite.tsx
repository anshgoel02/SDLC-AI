import React, { useState } from 'react';
import { RefreshCw, Download, FileDown, UserPlus, Plus, Edit2, Copy, Trash2, X } from 'lucide-react';

interface TestSuiteProps {
  requirementId: string;
  onComplete: () => void;
}

interface TestCase {
  id: string;
  title: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
  coverage: number;
  processStep: string;
  acceptanceCriteria: string;
  reviewerComment: string;
}

export function TestSuite({ requirementId, onComplete }: TestSuiteProps) {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [casesGenerated, setCasesGenerated] = useState(false);
  const [reviewersAssigned, setReviewersAssigned] = useState(false);
  const [casesApproved, setCasesApproved] = useState(false);
  const [caseStatus, setCaseStatus] = useState<'Cases In Review' | 'Cases Approved'>('Cases In Review');
  const [showCaseEditor, setShowCaseEditor] = useState(false);
  const [editingCase, setEditingCase] = useState<TestCase | null>(null);

  const [caseForm, setCaseForm] = useState({
    title: '',
    preconditions: '',
    steps: '',
    expectedResult: '',
    processStep: '',
    acceptanceCriteria: ''
  });

  const mockTestCases: TestCase[] = [
    {
      id: 'TC-001',
      title: 'Create new order with valid customer',
      preconditions: 'User logged in as Sales Rep, Customer exists in system',
      steps: '1. Navigate to Order Entry\n2. Enter customer ID\n3. Add line items\n4. Submit order',
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
      steps: '1. Navigate to Order Entry\n2. Enter invalid customer ID\n3. Attempt to submit',
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
      steps: '1. Create order with amount > $10,000\n2. Submit order\n3. Check order status',
      expectedResult: 'Order status = "Pending Approval", Manager notified',
      coverage: 75,
      processStep: 'Order Approval',
      acceptanceCriteria: 'Manager approval workflow',
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
      alert('Reviewer approval required before generating test execution prompt');
      return;
    }
    setCasesApproved(true);
    setCaseStatus('Cases Approved');
  };

  const handleDownloadPrompt = () => {
    if (!casesApproved) {
      alert('Reviewer approval required before generating test execution prompt');
      return;
    }
    setTimeout(() => {
      alert('Prompt generated.');
      onComplete();
    }, 100);
  };

  const handleAddEditCase = () => {
    setShowCaseEditor(true);
    if (editingCase) {
      setCaseForm({
        title: editingCase.title,
        preconditions: editingCase.preconditions,
        steps: editingCase.steps,
        expectedResult: editingCase.expectedResult,
        processStep: editingCase.processStep,
        acceptanceCriteria: editingCase.acceptanceCriteria
      });
    } else {
      setCaseForm({
        title: '',
        preconditions: '',
        steps: '',
        expectedResult: '',
        processStep: '',
        acceptanceCriteria: ''
      });
    }
  };

  const handleSaveCase = () => {
    if (!caseForm.title || !caseForm.expectedResult) {
      alert('Title and Expected Result are required');
      return;
    }

    if (editingCase) {
      // Update existing case
      setTestCases(testCases.map(tc => 
        tc.id === editingCase.id 
          ? { ...tc, ...caseForm }
          : tc
      ));
    } else {
      // Add new case
      const newCase: TestCase = {
        id: `TC-${String(testCases.length + 1).padStart(3, '0')}`,
        ...caseForm,
        coverage: 70,
        reviewerComment: ''
      };
      setTestCases([...testCases, newCase]);
    }

    setShowCaseEditor(false);
    setEditingCase(null);
    setCaseForm({ title: '', preconditions: '', steps: '', expectedResult: '', processStep: '', acceptanceCriteria: '' });
  };

  const handleEditCase = (testCase: TestCase) => {
    setEditingCase(testCase);
    handleAddEditCase();
  };

  const handleDuplicateCase = (testCase: TestCase) => {
    const newCase: TestCase = {
      ...testCase,
      id: `TC-${String(testCases.length + 1).padStart(3, '0')}`,
      title: `${testCase.title} (Copy)`
    };
    setTestCases([...testCases, newCase]);
  };

  const handleDeleteCase = (caseId: string) => {
    if (confirm('Are you sure you want to delete this test case?')) {
      setTestCases(testCases.filter(tc => tc.id !== caseId));
    }
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
                    onClick={() => {
                      setEditingCase(null);
                      handleAddEditCase();
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus size={18} />
                    Add/Edit Manual Cases
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
                    onClick={handleDownloadPrompt}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90"
                  >
                    <Download size={18} />
                    Download Test Execution Prompt (docx)
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
                        <th className="text-left py-3 px-4">Actions</th>
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
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditCase(testCase)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDuplicateCase(testCase)}
                                className="text-green-600 hover:text-green-800"
                                title="Duplicate"
                              >
                                <Copy size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteCase(testCase.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
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

      {/* Case Editor Modal */}
      {showCaseEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3>{editingCase ? 'Edit Test Case' : 'Add Manual Test Case'}</h3>
              <button
                onClick={() => {
                  setShowCaseEditor(false);
                  setEditingCase(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2">Title *</label>
                <input
                  type="text"
                  value={caseForm.title}
                  onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                  placeholder="Test case title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                />
              </div>

              <div>
                <label className="block mb-2">Preconditions</label>
                <textarea
                  value={caseForm.preconditions}
                  onChange={(e) => setCaseForm({ ...caseForm, preconditions: e.target.value })}
                  placeholder="Preconditions for this test..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                />
              </div>

              <div>
                <label className="block mb-2">Steps</label>
                <textarea
                  value={caseForm.steps}
                  onChange={(e) => setCaseForm({ ...caseForm, steps: e.target.value })}
                  placeholder="1. Step one&#10;2. Step two&#10;3. Step three"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                />
              </div>

              <div>
                <label className="block mb-2">Expected Result *</label>
                <textarea
                  value={caseForm.expectedResult}
                  onChange={(e) => setCaseForm({ ...caseForm, expectedResult: e.target.value })}
                  placeholder="Expected outcome..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Process Step</label>
                  <input
                    type="text"
                    value={caseForm.processStep}
                    onChange={(e) => setCaseForm({ ...caseForm, processStep: e.target.value })}
                    placeholder="e.g., Order Creation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                  />
                </div>

                <div>
                  <label className="block mb-2">Acceptance Criteria</label>
                  <input
                    type="text"
                    value={caseForm.acceptanceCriteria}
                    onChange={(e) => setCaseForm({ ...caseForm, acceptanceCriteria: e.target.value })}
                    placeholder="e.g., Performance criteria"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCaseEditor(false);
                  setEditingCase(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCase}
                className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90"
              >
                {editingCase ? 'Update' : 'Add'} Test Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
