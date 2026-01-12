import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, Activity, TrendingUp, AlertTriangle, Eye, MapPin, DollarSign, Clock } from 'lucide-react';

interface Collector {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'offline';
  location?: string;
  todayCollections: number;
  pendingCollections: number;
  lastActivity: string;
}

interface Alert {
  id: string;
  type: 'offline' | 'idle' | 'anomaly';
  collector: string;
  message: string;
  time: string;
}

export function SupervisorPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'collectors' | 'alerts'>('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchSupervisorData();
  }, []);

  const fetchSupervisorData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('procollector_auth_token');
      // TODO: Implement supervisor dashboard API
      // For now, using mock data structure
      setData({
        stats: {
          totalCollectors: 12,
          activeCollectors: 10,
          todayCollections: 45,
          pendingVerifications: 8
        },
        collectors: [
          {
            id: '1',
            name: 'Jean Dupont',
            status: 'active',
            location: 'Douala Central',
            todayCollections: 125000,
            pendingCollections: 2,
            lastActivity: '2 min ago'
          },
          {
            id: '2',
            name: 'Marie Kline',
            status: 'idle',
            location: 'Akwa Market',
            todayCollections: 89000,
            pendingCollections: 0,
            lastActivity: '15 min ago'
          }
        ] as Collector[],
        alerts: [
          {
            id: '1',
            type: 'idle',
            collector: 'Sarah Ngono',
            message: 'No activity for 30 minutes',
            time: '10 min ago'
          }
        ] as Alert[]
      });
    } catch (error) {
      console.error('Supervisor data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'idle': return 'bg-yellow-100 text-yellow-700';
      case 'offline': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'offline': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'idle': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'anomaly': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading supervisor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600">Monitor field operations and collector performance</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'collectors', label: 'Collectors' },
            { id: 'alerts', label: 'Alerts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{data?.stats?.totalCollectors || 0}</p>
                      <p className="text-sm text-gray-600">Total Collectors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{data?.stats?.activeCollectors || 0}</p>
                      <p className="text-sm text-gray-600">Active Now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{data?.stats?.todayCollections || 0}</p>
                      <p className="text-sm text-gray-600">Today's Collections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{data?.stats?.pendingVerifications || 0}</p>
                      <p className="text-sm text-gray-600">Pending Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data?.collectors?.slice(0, 3).map((collector: Collector) => (
                    <div key={collector.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${getStatusColor(collector.status)}`}>
                          {collector.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{collector.name}</p>
                          <p className="text-sm text-gray-600">{collector.lastActivity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">FCFA {collector.todayCollections.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{collector.pendingCollections} pending</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'collectors' && (
          <div className="space-y-4">
            {data?.collectors?.map((collector: Collector) => (
              <Card key={collector.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium ${getStatusColor(collector.status)}`}>
                        {collector.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{collector.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collector.status)}`}>
                            {collector.status}
                          </span>
                        </div>
                        {collector.location && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {collector.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">FCFA {collector.todayCollections.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{collector.pendingCollections} pending</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {data?.alerts?.length > 0 ? (
              data.alerts.map((alert: Alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{alert.collector}</p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No alerts at this time</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Real-time Monitoring
          </p>
        </div>
      </footer>
    </div>
  );
}