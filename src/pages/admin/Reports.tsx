import { useState, useEffect } from 'react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Reports() {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('collections');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    if (reportType && dateRange) {
      fetchReport();
    }
  }, [reportType, dateRange]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.get<any>(`/admin/reports?type=${reportType}&range=${dateRange}`);
      
      if (result.success && result.data) {
        setReportData(result.data);
      } else {
        setError(result.error || 'Failed to load report');
      }
    } catch (err) {
      console.error('Fetch report error:', err);
      setError('Network error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.get(`/admin/reports/export?type=${reportType}&range=${dateRange}`, {
        responseType: 'blob'
      } as any);
      
      if (result.success && result.data) {
        const blob = new Blob([result.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}_report_${dateRange}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export report. Please try again.');
    }
  };

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
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-600">{error}</p>
          <Button onClick={fetchReport} variant="outline" size="sm" className="ml-auto">Retry</Button>
        </div>
      )}

      {/* Report Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {reportType === 'collections' && 'Collections Overview'}
          {reportType === 'performance' && 'Performance Metrics'}
          {reportType === 'errors' && 'Error Analysis'}
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-brand-dark" />
          </div>
        ) : reportData ? (
          <div className="space-y-6">
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              {reportData.chartData ? '[Chart]' : 'Chart Placeholder'}
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Total Collections</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {reportData.totalCollections || 'N/A'}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Success Rate</h3>
                <p className="text-2xl font-bold text-brand-slate-600">
                  {reportData.successRate ? `${reportData.successRate}%` : 'N/A'}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Active Collectors</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {reportData.activeCollectors || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No report data available
          </div>
        )}
      </div>
    </div>
  );
}
