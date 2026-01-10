import { useState } from 'react';
import { Download } from 'lucide-react';

export default function CollectorReports() {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('collections');

  const performanceStats = {
    collectionsCompleted: 45,
    successRate: '98.5%',
    totalAmount: '$24,500',
    averagePerDay: '$3,500'
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Collection Reports</h1>
      
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
              <option value="clients">Client Report</option>
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

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Collections Completed</h3>
          <p className="text-2xl font-bold text-blue-600">{performanceStats.collectionsCompleted}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Success Rate</h3>
          <p className="text-2xl font-bold text-brand-slate-600">{performanceStats.successRate}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Amount</h3>
          <p className="text-2xl font-bold text-blue-600">{performanceStats.totalAmount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Average Per Day</h3>
          <p className="text-2xl font-bold text-blue-600">{performanceStats.averagePerDay}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">Collection Trends</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          [Chart Placeholder]
        </div>
      </div>
    </div>
  );
}
