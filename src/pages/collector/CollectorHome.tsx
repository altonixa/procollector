import { useState } from 'react';
import { Plus, DollarSign, Users, TrendingUp, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollectorHome() {
  // Mock data for now - will be replaced with real API calls later
  const stats = [
    { label: 'Today\'s Collections', value: 'FCFA 84,500', trend: 'up', change: '+12%', icon: DollarSign, color: 'blue' },
    { label: 'Total Clients', value: '24', trend: 'up', change: '+3 new', icon: Users, color: 'green' },
    { label: 'This Week', value: 'FCFA 425,000', trend: 'up', change: '+8%', icon: TrendingUp, color: 'purple' },
    { label: 'Completed Today', value: '12/18', trend: 'up', change: '67%', icon: CheckCircle, color: 'emerald' },
  ];

  const todaySchedule = [
    { id: '1', time: '09:00 AM', client: 'Boutique Alpha', amount: 'FCFA 5,000', address: 'Mokolo Market', status: 'completed' },
    { id: '2', time: '10:30 AM', client: 'Pharmacie De La Paix', amount: 'FCFA 7,500', address: 'Akwa Nord', status: 'completed' },
    { id: '3', time: '02:00 PM', client: 'Gare Routière B', amount: 'FCFA 3,000', address: 'Ndokoti', status: 'pending' },
    { id: '4', time: '03:30 PM', client: 'Marché Central A', amount: 'FCFA 4,500', address: 'New Bell', status: 'pending' },
    { id: '5', time: '04:45 PM', client: 'Salon de Coiffure', amount: 'FCFA 2,500', address: 'Bonanjo', status: 'pending' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'bg-green-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'bg-purple-100' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'bg-emerald-100' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="add-client"
          className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Add New Client</h3>
              <p className="text-sm text-gray-600">Onboard new clients quickly</p>
            </div>
          </div>
        </Link>

        <Link
          to="collect"
          className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Record Collection</h3>
              <p className="text-sm text-gray-600">Save daily contributions</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome back! Here's your overview for today</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">
            <Clock className="inline h-4 w-4 mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-0.5">
                <div className={`h-6 w-6 ${colors.icon} rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-3 w-3 ${colors.text}`} />
                </div>
                <div className={`px-1 py-0.5 ${colors.bg} ${colors.text} rounded-lg text-xs font-semibold`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">{stat.label}</h3>
              <p className="text-base font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
              <p className="text-sm text-gray-600 mt-0.5">Your collection appointments</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-lg font-bold text-emerald-600">12/18</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {todaySchedule.map((item) => (
            <div key={item.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors ${item.status === 'completed' ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${item.status === 'completed' ? 'bg-emerald-100' : 'bg-blue-100'
                  }`}>
                  {item.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{item.client}</p>
                    {item.status === 'completed' && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.address}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-gray-900">{item.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link to="history" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
            View Full History
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
