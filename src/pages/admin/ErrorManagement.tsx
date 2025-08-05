import React, { useState } from 'react';
import { Search, Download, Eye, Edit, Trash2 } from 'lucide-react';

export default function ErrorManagement() {
  const [errors, setErrors] = useState([
    {
      id: 1,
      collector: 'John Doe',
      type: 'Collection Error',
      description: 'Wrong amount recorded for client ABC',
      status: 'Pending',
      date: '2024-02-20'
    },
    {
      id: 2,
      collector: 'Jane Smith',
      type: 'System Error',
      description: 'Failed to sync offline data',
      status: 'Resolved',
      date: '2024-02-19'
    },
    {
      id: 3,
      collector: 'Mike Johnson',
      type: 'Client Error',
      description: 'Incorrect client information',
      status: 'In Progress',
      date: '2024-02-18'
    }
  ]);

  const [selectedError, setSelectedError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

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
            {filteredErrors.map((error) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
