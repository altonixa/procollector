import React from 'react';
import { Calendar, Search, Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react';

export default function CollectionHistory() {
  const collections = [
    {
      id: 1,
      date: '2024-02-20',
      client: 'ABC Company',
      amount: '$500.00',
      status: 'Completed',
      paymentMethod: 'Cash'
    },
    {
      id: 2,
      date: '2024-02-20',
      client: 'XYZ Store',
      amount: '$750.00',
      status: 'Failed',
      paymentMethod: 'Check'
    },
    {
      id: 3,
      date: '2024-02-19',
      client: 'Quick Mart',
      amount: '$300.00',
      status: 'Completed',
      paymentMethod: 'Bank Transfer'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Collection History</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search collections..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Collections Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
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
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{collection.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{collection.client}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{collection.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{collection.paymentMethod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    collection.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {collection.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
