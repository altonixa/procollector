import React, { useState } from 'react';
import { Search, Filter, Download, UserPlus, Eye, Edit, Trash2 } from 'lucide-react';

export default function ClientManagement() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'ABC Company',
      address: '123 Business St',
      contact: 'John Smith',
      phone: '(555) 123-4567',
      collectionDay: 'Monday',
      status: 'Active'
    },
    {
      id: 2,
      name: 'XYZ Store',
      address: '456 Commerce Ave',
      contact: 'Jane Doe',
      phone: '(555) 987-6543',
      collectionDay: 'Tuesday',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Quick Mart',
      address: '789 Market Rd',
      contact: 'Bob Wilson',
      phone: '(555) 456-7890',
      collectionDay: 'Wednesday',
      status: 'Inactive'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
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

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Person
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Collection Day
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
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.contact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.collectionDay}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
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
