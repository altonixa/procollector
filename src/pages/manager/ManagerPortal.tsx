import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Users, MapPin, X } from 'lucide-react';

interface Collector {
  id: string;
  name: string;
  collected: string;
  clients: number;
  status: 'Active' | 'Idle' | 'Offline';
  lastUpdate: string;
  zone: string;
}

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  collector: string;
  message: string;
  time: string;
}

const mockCollectors: Collector[] = [
  { id: 'C001', name: 'Jean Dupont', collected: 'FCFA 45,000', clients: 12, status: 'Active', lastUpdate: '2 mins ago', zone: 'Centre Douala' },
  { id: 'C002', name: 'Marie Kline', collected: 'FCFA 32,500', clients: 8, status: 'Active', lastUpdate: '5 mins ago', zone: 'Port Area' },
  { id: 'C003', name: 'Sarah Ngono', collected: 'FCFA 18,000', clients: 5, status: 'Idle', lastUpdate: '45 mins ago', zone: 'Akwa' },
  { id: 'C004', name: 'Pierre Mboh', collected: 'FCFA 0', clients: 0, status: 'Offline', lastUpdate: '3 hours ago', zone: 'Bonanjo' },
];

const mockAlerts: Alert[] = [
  { id: 'A1', type: 'warning', collector: 'Sarah Ngono', message: 'No activity for 45 minutes', time: '15 mins ago' },
  { id: 'A2', type: 'critical', collector: 'Pierre Mboh', message: 'Offline - last seen 3 hours ago', time: '1 hour ago' },
  { id: 'A3', type: 'info', collector: 'Marie Kline', message: 'Collection target reached', time: '30 mins ago' },
];

export function ManagerPortal() {
  const [tab, setTab] = useState<'dashboard' | 'collectors' | 'alerts'>('dashboard');
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const totalCollected = mockCollectors.reduce((sum, c) => sum + parseInt(c.collected.replace(/\D/g, '')), 0);
  const activeCount = mockCollectors.filter(c => c.status === 'Active').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Collector Details Modal */}
      {showDetails && selectedCollector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Collector Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-gray-900">{selectedCollector.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Zone</label>
                  <p className="text-gray-900">{selectedCollector.zone}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${selectedCollector.status === 'Active' ? 'bg-green-100 text-green-700' :
                      selectedCollector.status === 'Idle' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {selectedCollector.status}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Collected Today</label>
                  <p className="font-semibold text-gray-900">{selectedCollector.collected}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Active Clients</label>
                  <p className="font-semibold text-gray-900">{selectedCollector.clients}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Last Update</label>
                  <p className="text-gray-600">{selectedCollector.lastUpdate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Real-time field collector monitoring</p>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'collectors', label: 'Collectors' },
              { id: 'alerts', label: 'Alerts' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <div className="space-y-4">
              {/* Stats - Simple Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600 mb-1">Total Collected (Today)</div>
                  <div className="text-2xl font-bold text-gray-900">FCFA {(totalCollected / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600 mb-1">Active Collectors</div>
                  <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600 mb-1">Total Collectors</div>
                  <div className="text-2xl font-bold text-gray-900">{mockCollectors.length}</div>
                </div>
              </div>

              {/* Collectors List - Compact Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-sm font-semibold text-gray-900">Real-time Performance</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Collector</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Zone</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Clients</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Collected</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Last Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockCollectors.map((collector) => (
                        <tr key={collector.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2.5 font-medium text-gray-900">{collector.name}</td>
                          <td className="px-4 py-2.5 text-gray-600">{collector.zone}</td>
                          <td className="px-4 py-2.5 text-gray-600">{collector.clients}</td>
                          <td className="px-4 py-2.5 font-semibold text-gray-900">{collector.collected}</td>
                          <td className="px-4 py-2.5">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${collector.status === 'Active' ? 'bg-green-100 text-green-700' :
                                collector.status === 'Idle' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                              }`}>
                              {collector.status}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-gray-500 text-xs">{collector.lastUpdate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COLLECTORS */}
          {tab === 'collectors' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Field Collectors</h2>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Zone</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Clients</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Collected</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockCollectors.map((collector) => (
                      <tr key={collector.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-600">{collector.id}</td>
                        <td className="px-4 py-2.5 font-medium text-gray-900">{collector.name}</td>
                        <td className="px-4 py-2.5 text-gray-600">{collector.zone}</td>
                        <td className="px-4 py-2.5 text-gray-600">{collector.clients}</td>
                        <td className="px-4 py-2.5 font-semibold text-gray-900">{collector.collected}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${collector.status === 'Active' ? 'bg-green-100 text-green-700' :
                              collector.status === 'Idle' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {collector.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <button
                            onClick={() => {
                              setSelectedCollector(collector);
                              setShowDetails(true);
                            }}
                            className="px-3 py-1 bg-gray-900 text-white rounded text-xs hover:bg-gray-800"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ALERTS */}
          {tab === 'alerts' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">System Alerts</h2>
              <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
                {mockAlerts.length > 0 ? (
                  mockAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {alert.type === 'critical' ? (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          ) : alert.type === 'warning' ? (
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{alert.collector}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${alert.type === 'critical' ? 'bg-red-100 text-red-700' :
                                alert.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-blue-100 text-blue-700'
                              }`}>
                              {alert.type === 'critical' ? 'Critical' : alert.type === 'warning' ? 'Warning' : 'Info'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-gray-500">
                    No alerts at this time
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerPortal;
