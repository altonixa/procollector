import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/dashboard/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchDashboardData} className="px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand-slate-700">
          Retry
        </button>
      </div>
    );
  }

  const stats = data?.stats || [];
  const recentActivity = data?.recentActivity || [];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Dashboard Overview</h1>
        <p className="text-sm text-brand-slate-500">Monitor your system performance and activity</p>
      </div>
      
      {/* Stats Grid - Solid Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat: any, index: number) => (
          <div key={index} className="bg-white rounded-lg border border-brand-slate-200 p-4 shadow-sm">
            <h3 className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide mb-2">{stat.label}</h3>
            <p className="text-xl font-bold text-brand-dark mb-2">{stat.value}</p>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
              stat.trend === 'up' 
                ? 'bg-brand-slate-100 text-brand-slate-700' 
                : 'bg-rose-50 text-rose-700'
            }`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity - Solid Card */}
      <div className="bg-white rounded-lg border border-brand-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-brand-slate-200">
          <h2 className="text-base font-semibold text-brand-dark">Recent Activity</h2>
        </div>
        <div className="divide-y divide-brand-slate-100">
          {recentActivity.map((activity: any) => (
            <div key={activity.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-dark">{activity.action}</p>
                  <p className="text-xs text-brand-slate-500 mt-0.5">by {activity.user}</p>
                </div>
                <span className="text-xs text-brand-slate-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
