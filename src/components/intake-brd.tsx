import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Download, RefreshCw, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface IntakeBRDProps {
  requirementId: string;
  onApprove: () => void;
}

interface FileUpload {
  id: string;
  type: 'transcript' | 'brd' | 'url' | 'screenshot' | 'diagram' | 'notes';
  name: string;
  owner: string;
  version: string;
  validation: 'OK' | 'Missing';
}

export function IntakeBRD({ requirementId, onApprove }: IntakeBRDProps) {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [brdGenerated, setBrdGenerated] = useState(false);
  const [brdStatus, setBrdStatus] = useState<'Draft' | 'In Review' | 'Approved'>('Draft');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['epics']));
  const [reviews, setReviews] = useState({
    business: false,
    functional: false,
    final: false
  });

  const mockBRDData = {
    epics: [
      'Streamline order processing workflow',
      'Enhance customer communication touchpoints',
      'Improve inventory visibility'
    ],
    userStories: [
      'As a sales rep, I want to create orders quickly so that I can serve customers efficiently',
      'As a warehouse manager, I want real-time inventory updates so that I can manage stock levels',
      'As a customer, I want order status notifications so that I can track my delivery'
    ],
    acceptanceCriteria: [
      'Order creation time reduced by 40%',
      'Inventory sync latency < 5 seconds',
      'Email notifications sent within 1 minute of status change'
    ],
    kpis: [
      'Order processing time: Target < 2 minutes',
      'Customer satisfaction score: Target > 4.5/5',
      'Inventory accuracy: Target > 98%'
    ]
  };

  const hasValidInput = uploads.some(u => u.validation === 'OK');

  const handleGenerateBRD = () => {
    if (!hasValidInput) {
      alert('Add at least one input (Transcript/Notes/URL/Screenshots/Process Diagram) before generating BRD');
      return;
    }

    setBrdGenerated(true);
    setBrdStatus('Draft');
    // Show success toast
    setTimeout(() => {
      alert('BRD generated from inputs.');
    }, 100);
  };

  const handleFileUpload = (type: FileUpload['type']) => {
    const newFile: FileUpload = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name: `${type}_file_${uploads.length + 1}.${type === 'diagram' ? 'png' : type === 'transcript' ? 'doc' : 'pdf'}`,
      owner: 'Current User',
      version: 'v1.0',
      validation: 'OK'
    };
    setUploads([...uploads, newFile]);
  };

  const handleRemoveUpload = (id: string) => {
    setUploads(uploads.filter(u => u.id !== id));
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleApproveBRD = () => {
    if (!reviews.business) {
      alert('Complete Business Review before approval');
      return;
    }
    setBrdStatus('Approved');
    onApprove();
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Intake & BRD</div>
          <div className="flex items-center justify-between">
            <h1>Intake & BRD</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
              <span className={`px-3 py-1 rounded text-sm ${
                brdStatus === 'Draft' ? 'bg-gray-400 text-white' :
                brdStatus === 'In Review' ? 'bg-warning text-white' :
                'bg-success text-white'
              }`}>
                {brdStatus}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Two Column Layout */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT - Inputs Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="mb-4">Inputs</h2>

              {/* Upload Tiles */}
              <div className="space-y-3">
                {/* Transcript */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-gray-600" />
                      <span className="font-medium">Transcript</span>
                      <span className="text-xs text-gray-500">(.doc/.txt/.vtt)</span>
                    </div>
                    <button
                      onClick={() => handleFileUpload('transcript')}
                      className="px-3 py-1 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded text-sm hover:bg-opacity-90"
                    >
                      Upload
                    </button>
                  </div>
                  {uploads.filter(u => u.type === 'transcript').map(file => (
                    <div key={file.id} className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{file.name}</span>
                          {file.validation === 'OK' ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : (
                            <XCircle size={16} className="text-error" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Owner: {file.owner} | {file.version}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Replace</button>
                        <button
                          onClick={() => handleRemoveUpload(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Existing BRD */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-gray-600" />
                      <span className="font-medium">Existing BRD</span>
                      <span className="text-xs text-gray-500">(optional)</span>
                    </div>
                    <button
                      onClick={() => handleFileUpload('brd')}
                      className="px-3 py-1 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded text-sm hover:bg-opacity-90"
                    >
                      Upload
                    </button>
                  </div>
                  {uploads.filter(u => u.type === 'brd').map(file => (
                    <div key={file.id} className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{file.name}</span>
                          {file.validation === 'OK' ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : (
                            <XCircle size={16} className="text-error" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Owner: {file.owner} | {file.version}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Replace</button>
                        <button
                          onClick={() => handleRemoveUpload(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* URL or Screenshots */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} className="text-gray-600" />
                    <span className="font-medium">URL or Screenshots</span>
                    <span className="text-xs text-gray-500">(.png/.jpg)</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Enter URL..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
                    />
                    <button
                      onClick={() => handleFileUpload('url')}
                      className="px-3 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded text-sm hover:bg-opacity-90"
                    >
                      Add
                    </button>
                  </div>
                  <button
                    onClick={() => handleFileUpload('screenshot')}
                    className="w-full px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Upload Screenshot
                  </button>
                  {uploads.filter(u => u.type === 'url' || u.type === 'screenshot').map(file => (
                    <div key={file.id} className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{file.name}</span>
                          {file.validation === 'OK' ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : (
                            <XCircle size={16} className="text-error" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Owner: {file.owner} | {file.version}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Replace</button>
                        <button
                          onClick={() => handleRemoveUpload(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Process Diagram */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-gray-600" />
                      <span className="font-medium">Process Diagram</span>
                      <span className="text-xs text-gray-500">(.png/.svg/.bpmn)</span>
                    </div>
                    <button
                      onClick={() => handleFileUpload('diagram')}
                      className="px-3 py-1 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded text-sm hover:bg-opacity-90"
                    >
                      Upload
                    </button>
                  </div>
                  {uploads.filter(u => u.type === 'diagram').map(file => (
                    <div key={file.id} className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{file.name}</span>
                          {file.validation === 'OK' ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : (
                            <XCircle size={16} className="text-error" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Owner: {file.owner} | {file.version}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Replace</button>
                        <button
                          onClick={() => handleRemoveUpload(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-gray-600" />
                      <span className="font-medium">Notes</span>
                      <span className="text-xs text-gray-500">(.docx/.pdf)</span>
                    </div>
                    <button
                      onClick={() => handleFileUpload('notes')}
                      className="px-3 py-1 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded text-sm hover:bg-opacity-90"
                    >
                      Upload
                    </button>
                  </div>
                  {uploads.filter(u => u.type === 'notes').map(file => (
                    <div key={file.id} className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{file.name}</span>
                          {file.validation === 'OK' ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : (
                            <XCircle size={16} className="text-error" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Owner: {file.owner} | {file.version}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Replace</button>
                        <button
                          onClick={() => handleRemoveUpload(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate BRD Button */}
              <button
                onClick={handleGenerateBRD}
                disabled={!hasValidInput}
                className="w-full mt-6 px-4 py-3 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Generate BRD (AI)
              </button>
            </div>
          </div>

          {/* RIGHT - BRD Output Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2>BRD Output</h2>
                <span className={`px-3 py-1 rounded text-sm ${
                  brdGenerated ? 'bg-success text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {brdGenerated ? 'BRD Ready' : 'Awaiting Generation'}
                </span>
              </div>

              {brdGenerated ? (
                <>
                  {/* Collapsible Sections */}
                  <div className="space-y-3 mb-6">
                    {/* Epics */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection('epics')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                      >
                        <span className="font-medium">Epics</span>
                        {expandedSections.has('epics') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                      {expandedSections.has('epics') && (
                        <div className="p-3 pt-0 space-y-2">
                          {mockBRDData.epics.map((epic, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-gray-400">•</span>
                              <span>{epic}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* User Stories */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection('stories')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                      >
                        <span className="font-medium">User Stories</span>
                        {expandedSections.has('stories') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                      {expandedSections.has('stories') && (
                        <div className="p-3 pt-0 space-y-2">
                          {mockBRDData.userStories.map((story, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-gray-400">•</span>
                              <span>{story}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Acceptance Criteria */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection('criteria')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                      >
                        <span className="font-medium">Acceptance Criteria</span>
                        {expandedSections.has('criteria') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                      {expandedSections.has('criteria') && (
                        <div className="p-3 pt-0 space-y-2">
                          {mockBRDData.acceptanceCriteria.map((criteria, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-gray-400">•</span>
                              <span>{criteria}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* KPIs */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection('kpis')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                      >
                        <span className="font-medium">KPIs</span>
                        {expandedSections.has('kpis') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                      {expandedSections.has('kpis') && (
                        <div className="p-3 pt-0 space-y-2">
                          {mockBRDData.kpis.map((kpi, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-gray-400">•</span>
                              <span>{kpi}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Offline Loop */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h3 className="mb-3">Offline Edit Loop</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90">
                        <Download size={16} />
                        Download BRD (Word/PDF)
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload size={16} />
                        Upload Edited BRD
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:underline">Open in Word</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-blue-600 hover:underline">Open in SharePoint</button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => {
                          setTimeout(() => alert('Jira export generated.'), 100);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Export to Jira
                      </button>
                    </div>
                  </div>

                  {/* Approval Row */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="mb-3">Approvals</h3>
                    <div className="space-y-3 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reviews.business}
                          onChange={(e) => setReviews({ ...reviews, business: e.target.checked })}
                          className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                        />
                        <span className={`px-3 py-1 rounded text-sm ${reviews.business ? 'bg-success text-white' : 'bg-gray-200'}`}>
                          Business Review
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reviews.functional}
                          onChange={(e) => setReviews({ ...reviews, functional: e.target.checked })}
                          className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                        />
                        <span className={`px-3 py-1 rounded text-sm ${reviews.functional ? 'bg-success text-white' : 'bg-gray-200'}`}>
                          Functional Review
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reviews.final}
                          onChange={(e) => setReviews({ ...reviews, final: e.target.checked })}
                          className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                        />
                        <span className={`px-3 py-1 rounded text-sm ${reviews.final ? 'bg-success text-white' : 'bg-gray-200'}`}>
                          Final Approval
                        </span>
                      </label>
                    </div>
                    <button
                      onClick={handleApproveBRD}
                      disabled={!reviews.business}
                      className="w-full px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Approve BRD
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Upload inputs and click "Generate BRD (AI)" to create your BRD</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}