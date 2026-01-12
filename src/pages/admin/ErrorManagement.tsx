import { useState, useEffect } from 'react';
import { Search, Download, Eye, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Error {
  id: string | number;
  collector: string;
  type: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
}

export default function ErrorManagement() {
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.get<any>('/admin/errors');
      
      if (result.success && result.data) {
        const data = result.data as any;
        const transformed = (data.errors || data || []).map((err: any) => ({
          id: err.id || err._id || Math.random(),
          collector: err.collector?.name || err.collector || 'Unknown',
          type: err.type || err.errorType || 'System Error',
          description: err.description || err.message || 'No description',
          status: err.status === 'resolved' ? 'Resolved' : err.status === 'in_progress' ? 'In Progress' : 'Pending',
          date: err.createdAt ? new Date(err.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
        }));
        setErrors(transformed);
      } else {
        // Fallback to empty array
        setErrors([]);
        setError(result.error || 'Failed to load errors');
      }
    } catch (err) {
      console.error('Fetch errors error:', err);
      setErrors([]);
      setError('Network error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredErrors = filterStatus === 'all'
    ? errors
    : errors.filter(error => error.status.toLowerCase() === filterStatus);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Error Management</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search errors..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Error List */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Collector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-dark mx-auto mb-2" />
                  <p className="text-sm text-brand-dark/60">Loading errors...</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <AlertCircle className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                  <p className="text-sm text-rose-600 mb-4">{error}</p>
                  <Button onClick={fetchErrors} variant="outline" size="sm">Retry</Button>
                </td>
              </tr>
            ) : filteredErrors.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-brand-dark/40">
                  No errors found
                </td>
              </tr>
            ) : (
              filteredErrors.map((error) => (
              <tr key={error.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{error.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{error.collector}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{error.type}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{error.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    error.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : error.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {error.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
