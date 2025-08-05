import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function DashboardHome() {
  const stats = [
    { label: 'Total Collections', value: '$24,500', change: '+12.5%', trend: 'up' },
    { label: 'Active Collectors', value: '12', change: '+2', trend: 'up' },
    { label: 'Pending Issues', value: '3', change: '-1', trend: 'down' },
    { label: 'Success Rate', value: '98.5%', change: '+0.5%', trend: 'up' },
  ];

  const recentActivity = [
    { id: 1, action: 'New collector registered', time: '2 minutes ago', user: 'John Doe' },
    { id: 2, action: 'Collection recorded', time: '5 minutes ago', user: 'Jane Smith' },
    { id: 3, action: 'Error reported', time: '10 minutes ago', user: 'Mike Johnson' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
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

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">by {activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
