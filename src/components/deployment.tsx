import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface DeploymentProps {
  requirementId: string;
}

export function Deployment({ requirementId }: DeploymentProps) {
  const [deploymentStatus, setDeploymentStatus] = useState<'Deployed' | 'Ready for Go-Live' | 'Pending Window'>('Ready for Go-Live');
  const [releaseNotes, setReleaseNotes] = useState('Order-to-Cash enhancement deployed to production. New order entry screens with improved validation and workflow. See training materials for detailed user guide.');
  const [acknowledgements, setAcknowledgements] = useState({
    businessSignOff: false,
    trainingPublished: true
  });
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  const handleNotify = () => {
    if (!deploymentStatus) {
      alert('Select a deployment status');
      return;
    }
    setShowNotifyModal(true);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Deployment</div>
          <div className="flex items-center justify-between">
            <h1>Solution Deployment – Status</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Deployment Status */}
          <section className="mb-8">
            <h2 className="mb-4">Deployment Status</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[var(--color-mccain-yellow)] transition-colors">
                <input
                  type="radio"
                  name="deploymentStatus"
                  value="Deployed"
                  checked={deploymentStatus === 'Deployed'}
                  onChange={(e) => setDeploymentStatus(e.target.value as any)}
                  className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                />
                <div className="flex-1">
                  <div className="font-medium">Deployed</div>
                  <div className="text-sm text-gray-600">Solution is live in production</div>
                </div>
                {deploymentStatus === 'Deployed' && (
                  <CheckCircle className="text-success" size={24} />
                )}
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[var(--color-mccain-yellow)] transition-colors">
                <input
                  type="radio"
                  name="deploymentStatus"
                  value="Ready for Go-Live"
                  checked={deploymentStatus === 'Ready for Go-Live'}
                  onChange={(e) => setDeploymentStatus(e.target.value as any)}
                  className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                />
                <div className="flex-1">
                  <div className="font-medium">Ready for Go-Live</div>
                  <div className="text-sm text-gray-600">All checks passed, awaiting deployment window</div>
                </div>
                {deploymentStatus === 'Ready for Go-Live' && (
                  <CheckCircle className="text-info" size={24} />
                )}
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[var(--color-mccain-yellow)] transition-colors">
                <input
                  type="radio"
                  name="deploymentStatus"
                  value="Pending Window"
                  checked={deploymentStatus === 'Pending Window'}
                  onChange={(e) => setDeploymentStatus(e.target.value as any)}
                  className="w-4 h-4 accent-[var(--color-mccain-yellow)]"
                />
                <div className="flex-1">
                  <div className="font-medium">Pending Window</div>
                  <div className="text-sm text-gray-600">Waiting for scheduled deployment window</div>
                </div>
                {deploymentStatus === 'Pending Window' && (
                  <CheckCircle className="text-warning" size={24} />
                )}
              </label>
            </div>
          </section>

          {/* Release Notes */}
          <section className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="mb-4">Release Notes</h2>
            <textarea
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
              rows={6}
              placeholder="Brief change summary..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)] mb-3"
            />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Link to Training:</span>
              <a href="#" className="text-blue-600 hover:underline">
                https://kb.mccain.com/training/o2c-enhancement
              </a>
            </div>
          </section>

          {/* Stakeholder Acknowledgements */}
          <section className="mb-8">
            <h2 className="mb-4">Stakeholder Acknowledgements</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledgements.businessSignOff}
                  onChange={(e) => setAcknowledgements({ ...acknowledgements, businessSignOff: e.target.checked })}
                  className="w-5 h-5 accent-[var(--color-mccain-yellow)]"
                />
                <div className="flex-1">
                  <div className="font-medium">Business sign-off</div>
                  <div className="text-sm text-gray-600">Business Owner has approved deployment</div>
                </div>
                {acknowledgements.businessSignOff && (
                  <CheckCircle className="text-success" size={20} />
                )}
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledgements.trainingPublished}
                  onChange={(e) => setAcknowledgements({ ...acknowledgements, trainingPublished: e.target.checked })}
                  className="w-5 h-5 accent-[var(--color-mccain-yellow)]"
                />
                <div className="flex-1">
                  <div className="font-medium">Training published</div>
                  <div className="text-sm text-gray-600">Training materials available in Knowledge Base</div>
                </div>
                {acknowledgements.trainingPublished && (
                  <CheckCircle className="text-success" size={20} />
                )}
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleNotify}
              disabled={!deploymentStatus}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Notify stakeholders
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-gradient-to-r from-[var(--color-mccain-yellow)] to-yellow-400 rounded-lg shadow-lg p-6 text-[var(--color-mccain-black)]">
          <h3 className="mb-4">McCain SDLC Journey Complete</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm opacity-80 mb-1">Requirement</div>
              <div className="font-semibold">{requirementId}</div>
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Process</div>
              <div className="font-semibold">Order to Cash</div>
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Status</div>
              <div className="font-semibold">{deploymentStatus}</div>
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Training</div>
              <div className="font-semibold">Published</div>
            </div>
          </div>
        </div>
      </main>

      {/* Notify Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3>Notify Stakeholders</h3>
              <button
                onClick={() => setShowNotifyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2">Recipients</label>
                <div className="p-3 bg-gray-50 rounded-lg space-y-1 text-sm">
                  <div>• Business Owner</div>
                  <div>• Functional Consultant</div>
                  <div>• Technical Architect</div>
                  <div>• Developer Team</div>
                  <div>• Test Team</div>
                  <div>• Training Team</div>
                  <div>• Release Owner</div>
                </div>
              </div>

              <div>
                <label className="block mb-2">Message Preview</label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="font-semibold mb-2">McCain SDLC - Deployment Notification</div>
                  <p className="text-sm text-gray-700 mb-3">
                    The following requirement has been deployed:
                  </p>
                  <div className="text-sm text-gray-700 space-y-1 mb-3">
                    <div><strong>ID:</strong> {requirementId}</div>
                    <div><strong>Process:</strong> Order to Cash Enhancement</div>
                    <div><strong>Status:</strong> {deploymentStatus}</div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Release Notes:</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {releaseNotes}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Training Materials:</strong>{' '}
                    <a href="#" className="text-blue-600 underline">
                      https://kb.mccain.com/training/o2c-enhancement
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowNotifyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNotifyModal(false);
                  alert('Stakeholders notified successfully!');
                }}
                className="px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
