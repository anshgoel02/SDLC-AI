import React, { useState } from 'react';
import { FileText, Users, BookOpen, Link as LinkIcon, Send } from 'lucide-react';

interface TrainingProps {
  requirementId: string;
}

interface TrainingDoc {
  id: string;
  type: 'How-to' | 'SOP' | 'FAQ';
  title: string;
  audience: string[];
  version: string;
  author: string;
  lastUpdated: string;
  content: string;
}

export function Training({ requirementId }: TrainingProps) {
  const [selectedDoc, setSelectedDoc] = useState<TrainingDoc | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [docsGenerated, setDocsGenerated] = useState(false);

  const [trainingDocs] = useState<TrainingDoc[]>([
    {
      id: 'DOC-001',
      type: 'How-to',
      title: 'How to Create an Order in the New System',
      audience: ['Sales', 'Operations'],
      version: 'v1.0',
      author: 'Training Team',
      lastUpdated: '2025-12-16',
      content: 'Step-by-step guide for creating orders...'
    },
    {
      id: 'DOC-002',
      type: 'SOP',
      title: 'Order Approval Standard Operating Procedure',
      audience: ['Sales', 'Operations'],
      version: 'v1.0',
      author: 'Training Team',
      lastUpdated: '2025-12-16',
      content: 'Standard procedure for approving orders...'
    },
    {
      id: 'DOC-003',
      type: 'FAQ',
      title: 'Order Management FAQs',
      audience: ['Sales', 'Operations', 'IT'],
      version: 'v1.0',
      author: 'Training Team',
      lastUpdated: '2025-12-16',
      content: 'Frequently asked questions...'
    }
  ]);

  const audienceTags = ['Sales', 'Operations', 'IT'];
  const docTypeColors = {
    'How-to': 'bg-blue-100 text-blue-800',
    'SOP': 'bg-purple-100 text-purple-800',
    'FAQ': 'bg-green-100 text-green-800'
  };

  const handlePublish = () => {
    if (!docsGenerated) {
      alert('Generate training documents first');
      return;
    }
    setShowPublishModal(true);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Training</div>
          <div className="flex items-center justify-between">
            <h1>Training Library</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Document Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="mb-4">Training Inputs</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Upload Test Execution Report</h4>
                      <p className="text-sm text-gray-600">Extract screenshots/paths/flows (.pdf/.docx/.html)</p>
                    </div>
                    <button className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90">
                      Upload
                    </button>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                    test_execution_report_20251216.pdf
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Upload Existing Training Doc</h4>
                      <p className="text-sm text-gray-600">Reference template (.docx/.pdf)</p>
                    </div>
                    <button className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90">
                      Upload
                    </button>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                    training_template_v2.docx
                  </div>
                </div>

                {/* Generate Docs Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setDocsGenerated(true);
                      setTimeout(() => alert('Training documents generated successfully!'), 100);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90"
                  >
                    <FileText size={18} />
                    Generate Training Docs
                  </button>
                  <p className="mt-2 text-sm text-gray-600">
                    Generate training documents from existing info and uploaded files
                  </p>
                </div>
              </div>
            </div>

            {/* Document Cards Grid */}
            {docsGenerated && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:border-[var(--color-mccain-yellow)] transition-colors ${
                      selectedDoc?.id === doc.id ? 'border-[var(--color-mccain-yellow)] bg-yellow-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-gray-100 rounded">
                        {doc.type === 'How-to' && <FileText size={24} className="text-blue-600" />}
                        {doc.type === 'SOP' && <BookOpen size={24} className="text-purple-600" />}
                        {doc.type === 'FAQ' && <Users size={24} className="text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <span className={`px-2 py-1 rounded text-xs ${docTypeColors[doc.type]}`}>
                          {doc.type}
                        </span>
                        <h3 className="mt-2 text-sm">{doc.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {doc.audience.map((aud) => (
                        <span key={aud} className="px-2 py-1 bg-[var(--color-mccain-yellow)] bg-opacity-20 rounded text-xs">
                          {aud}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Version: {doc.version}</div>
                      <div>Author: {doc.author}</div>
                      <div>Updated: {doc.lastUpdated}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90"
              >
                <Send size={18} />
                Publish to Knowledge Base
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                Edit title/summary
              </button>
            </div>
          </div>

          {/* Right - Preview Pane */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="mb-4">Preview</h3>

              {selectedDoc ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs ${docTypeColors[selectedDoc.type]}`}>
                        {selectedDoc.type}
                      </span>
                      <span className="text-xs text-gray-600">{selectedDoc.version}</span>
                    </div>
                    <h4 className="mb-2">{selectedDoc.title}</h4>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="text-sm font-medium mb-2">Content</h5>
                    <div className="text-sm text-gray-700 space-y-3">
                      <p>{selectedDoc.content}</p>
                      
                      {selectedDoc.type === 'How-to' && (
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-mccain-yellow)] text-xs font-medium">1</span>
                            <div className="flex-1">
                              <p>Navigate to Order Entry screen</p>
                              <img src="https://via.placeholder.com/200x120?text=Screenshot" alt="Step 1" className="mt-1 rounded border border-gray-200" />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-mccain-yellow)] text-xs font-medium">2</span>
                            <div className="flex-1">
                              <p>Enter customer details</p>
                              <img src="https://via.placeholder.com/200x120?text=Screenshot" alt="Step 2" className="mt-1 rounded border border-gray-200" />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-mccain-yellow)] text-xs font-medium">3</span>
                            <div className="flex-1">
                              <p>Add line items and submit</p>
                              <img src="https://via.placeholder.com/200x120?text=Screenshot" alt="Step 3" className="mt-1 rounded border border-gray-200" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="text-sm font-medium mb-2">Metadata</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Author: {selectedDoc.author}</div>
                      <div>Last updated: {selectedDoc.lastUpdated}</div>
                      <div>Audience: {selectedDoc.audience.join(', ')}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500">
                      Screenshots and steps imported from Test Execution phase
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm">Select a document to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3>Publish to Knowledge Base</h3>
              <button
                onClick={() => setShowPublishModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2">Select roles/teams</label>
                <div className="space-y-2">
                  {audienceTags.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                  />
                  <span>Notify stakeholders</span>
                </label>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  Training materials will be published to the McCain Knowledge Base and stakeholders will receive email notifications.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  alert('Training materials published successfully!');
                }}
                className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}