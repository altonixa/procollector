import { Calendar, Search, Filter, Download, Eye } from 'lucide-react';

export default function CollectionHistory() {
  const collections = [
    {
      id: 1,
      date: '2024-02-20',
      client: 'ABC Company',
      amount: 'FCFA 500.00',
      status: 'Completed',
      paymentMethod: 'Cash'
    },
    {
      id: 2,
      date: '2024-02-20',
      client: 'XYZ Store',
      amount: 'FCFA 750.00',
      status: 'Failed',
      paymentMethod: 'Check'
    },
    {
      id: 3,
      date: '2024-02-19',
      client: 'Quick Mart',
      amount: 'FCFA 300.00',
      status: 'Completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 4,
      date: '2024-02-18',
      client: 'Fashion Hub',
      amount: 'FCFA 450.00',
      status: 'Completed',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 5,
      date: '2024-02-17',
      client: 'Gare Routière B',
      amount: 'FCFA 600.00',
      status: 'Pending',
      paymentMethod: 'Cash'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Collection History</h1>

      {/* Filters */}
      <div className="bg-white p-4 border mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search collections..."
                className="pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                className="px-3 py-2 border border-gray-300"
              />
            </div>
            <button className="p-2 hover:bg-gray-100">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Collections Table */}
      <div className="bg-white border overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Client
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                Payment Method
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {collection.date}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {collection.client}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {collection.amount}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {collection.paymentMethod}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold ${
                    collection.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : collection.status === 'Failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {collection.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-gray-600 hover:text-gray-900">
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
