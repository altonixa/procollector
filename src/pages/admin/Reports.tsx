import { useState } from 'react';
import { Download } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('collections');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
      
      {/* Report Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="collections">Collections Report</option>
              <option value="performance">Performance Report</option>
              <option value="errors">Error Report</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {reportType === 'collections' && 'Collections Overview'}
          {reportType === 'performance' && 'Performance Metrics'}
          {reportType === 'errors' && 'Error Analysis'}
        </h2>
        
        {/* Sample report content */}
        <div className="space-y-6">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            [Chart Placeholder]
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Total Collections</h3>
              <p className="text-2xl font-bold text-blue-600">$45,678</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Success Rate</h3>
              <p className="text-2xl font-bold text-brand-slate-600">98.5%</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Active Collectors</h3>
              <p className="text-2xl font-bold text-orange-600">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
