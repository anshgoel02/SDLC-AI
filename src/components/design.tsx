import React, { useState } from 'react';
import { Download, Upload, Link as LinkIcon } from 'lucide-react';

interface DesignProps {
  requirementId: string;
  onApprove: () => void;
}

export function Design({ requirementId, onApprove }: DesignProps) {
  const [activeTab, setActiveTab] = useState<'fd' | 'td' | 'ui'>('fd');
  const [fdStatus, setFdStatus] = useState<'In Review' | 'Approved'>('In Review');
  const [tdStatus, setTdStatus] = useState<'In Review' | 'Approved'>('In Review');
  const [uiStatus, setUiStatus] = useState<'In Review' | 'Approved'>('In Review');
  
  const [figmaLinks, setFigmaLinks] = useState<string[]>([
    'https://figma.com/file/abc123/O2C-Wireframes',
    'https://figma.com/file/def456/O2C-Final-Screens'
  ]);

  const [notes, setNotes] = useState('UI approach: Use Fiori elements with custom extensions for order entry. Consider mobile-first design for warehouse staff.');

  const handleApproveFD = () => {
    setFdStatus('Approved');
  };

  const handleApproveTD = () => {
    setTdStatus('Approved');
  };

  const handleApproveUI = () => {
    setUiStatus('Approved');
    onApprove();
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="mb-2 text-sm text-gray-600">McCain SDLC &gt; Design</div>
          <div className="flex items-center justify-between">
            <h1>Design – Functional / Technical</h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">ID: {requirementId}</span>
              <span className="text-gray-600">Process: O2C</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('fd')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'fd'
                  ? 'border-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Functional Design (FD)
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                fdStatus === 'Approved' ? 'bg-success text-white' : 'bg-warning text-white'
              }`}>
                {fdStatus}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('td')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'td'
                  ? 'border-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Technical Design (TD)
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                tdStatus === 'Approved' ? 'bg-success text-white' : 'bg-warning text-white'
              }`}>
                {tdStatus}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('ui')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'ui'
                  ? 'border-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              UI Prototype
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                uiStatus === 'Approved' ? 'bg-success text-white' : 'bg-warning text-white'
              }`}>
                {uiStatus}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Functional Design Tab */}
        {activeTab === 'fd' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* TOP ACTION BAR */}
            <div className="flex gap-3 mb-6 pb-6 border-b border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90">
                <Download size={18} />
                Download FD (docx/pdf)
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload size={18} />
                Upload Final FD
              </button>
              <button
                onClick={handleApproveFD}
                disabled={fdStatus === 'Approved'}
                className="ml-auto px-6 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve FD
              </button>
            </div>

            <h2 className="mb-6">Functional Design</h2>

            <div className="space-y-6">
              {/* Sections */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Screens</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Order Entry Screen – fields for customer, items, pricing</li>
                  <li>• Order Status Dashboard – list view with filters</li>
                  <li>• Order Details Screen – full order information with edit capability</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Fields</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Customer ID (required, autocomplete)</li>
                  <li>• Order Date (auto-populated, editable)</li>
                  <li>• Line Items (repeatable section)</li>
                  <li>• Total Amount (calculated)</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Validations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Customer must exist in SAP master data</li>
                  <li>• Order total must be &gt; 0</li>
                  <li>• Delivery date cannot be in the past</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Business Rules</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Orders over $10,000 require manager approval</li>
                  <li>• Discounts capped at 15% without special authorization</li>
                  <li>• Rush orders incur 10% surcharge</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Process Flow</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Sales rep creates order → System validates → Manager approves (if needed) → Order confirmed</li>
                  <li>• Customer notified via email</li>
                  <li>• Warehouse receives picking notification</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Technical Design Tab */}
        {activeTab === 'td' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* TOP ACTION BAR */}
            <div className="flex gap-3 mb-6 pb-6 border-b border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90">
                <Download size={18} />
                Download TD (docx/pdf)
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload size={18} />
                Upload Final TD
              </button>
              <button
                onClick={handleApproveTD}
                disabled={tdStatus === 'Approved'}
                className="ml-auto px-6 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve TD
              </button>
            </div>

            <h2 className="mb-6">Technical Design</h2>

            <div className="space-y-6">
              {/* Sections */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Data Objects</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• ZORDER_HEADER – Custom table for order headers</li>
                  <li>• ZORDER_ITEM – Custom table for order line items</li>
                  <li>• Standard VBAK/VBAP for SAP sales order integration</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Services/APIs</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• POST /api/orders/create – Create new order</li>
                  <li>• GET /api/orders/{'{'}id{'}'} – Retrieve order details</li>
                  <li>• PUT /api/orders/{'{'}id{'}'}/approve – Approve order</li>
                  <li>• GET /api/customers/search – Customer autocomplete</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">UI Approach (Fiori/UI5)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use SAP Fiori Elements List Report + Object Page pattern</li>
                  <li>• Custom order entry screen built with UI5 controls</li>
                  <li>• Responsive design using sap.m library</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Server Logic (ABAP)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Function module Z_CREATE_ORDER – order creation logic</li>
                  <li>• BAPI_SALESORDER_CREATEFROMDAT2 – SAP standard integration</li>
                  <li>• Enhancement spot for custom validations</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Security/Roles</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• ZMCCAIN_SALES_REP – Create and view own orders</li>
                  <li>• ZMCCAIN_SALES_MGR – Approve orders, view all</li>
                  <li>• Authorization object Z_ORD_AUTH for field-level security</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="mb-3">Performance</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Database indexes on ZORDER_HEADER-ORDER_ID and CUSTOMER_ID</li>
                  <li>• OData batch requests for line items</li>
                  <li>• Lazy loading for order history lists</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* UI Prototype Tab */}
        {activeTab === 'ui' && (
          <div className="space-y-6">
            {/* Top Action Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setTimeout(() => alert('UI Prompt downloaded.'), 100);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-black)] text-white rounded-lg hover:bg-opacity-90"
                >
                  <Download size={18} />
                  Download UI Prompt (docx/pdf)
                </button>
                <button
                  onClick={handleApproveUI}
                  disabled={uiStatus === 'Approved'}
                  className="ml-auto px-6 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Approve UI Prototype
                </button>
              </div>
            </div>

            {/* Paths & Assets Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2>Paths & Assets</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mccain-yellow)] text-[var(--color-mccain-black)] rounded-lg hover:bg-opacity-90">
                    <LinkIcon size={18} />
                    Attach Figma Link
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload size={18} />
                    Attach Export
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="mb-2">Figma Files</h3>
                  <div className="space-y-2">
                    {figmaLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <LinkIcon size={16} className="text-gray-400" />
                        <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-600 hover:underline">
                          {link}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2">Exported Assets</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Download size={16} className="text-gray-400" />
                      <span className="flex-1">O2C_Wireframes_v2.pdf</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Download size={16} className="text-gray-400" />
                      <span className="flex-1">O2C_Final_Screens_v1.png</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2">SharePoint/KB Links</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <LinkIcon size={16} className="text-gray-400" />
                      <a href="#" className="flex-1 text-blue-600 hover:underline">
                        https://sharepoint.mccain.com/projects/O2C-Enhancement
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="mb-4">Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="POC references, design decisions, risks..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mccain-yellow)]"
              />
              <p className="mt-2 text-sm text-gray-600">
                Permissions: UI Design POC can edit; others view-only
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}