import React from 'react';
import { BarChart3, Wallet, Users, TrendingUp } from 'lucide-react';

export default function CollectorHome() {
  const stats = [
    { label: 'Today\'s Collections', value: '$2,450.00', change: '+$350.00', trend: 'up' },
    { label: 'Total Clients', value: '45', change: '+2', trend: 'up' },
    { label: 'Success Rate', value: '98.5%', change: '+0.5%', trend: 'up' },
    { label: 'Pending Collections', value: '5', change: '-2', trend: 'down' },
  ];

  const upcomingCollections = [
    { id: 1, client: 'ABC Company', amount: '$500.00', time: '10:00 AM', address: '123 Business St' },
    { id: 2, client: 'XYZ Store', amount: '$750.00', time: '11:30 AM', address: '456 Commerce Ave' },
    { id: 3, client: 'Quick Mart', amount: '$300.00', time: '2:00 PM', address: '789 Market Rd' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Collector Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Collection Schedule</h2>
        <div className="space-y-4">
          {upcomingCollections.map((collection) => (
            <div key={collection.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{collection.client}</p>
                <p className="text-sm text-gray-500">{collection.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600">{collection.amount}</p>
                <p className="text-sm text-gray-500">{collection.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
