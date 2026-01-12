import { useState, useEffect } from 'react';
import { Users, CreditCard, Wallet, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface Transaction {
  id: string;
  agent: string;
  client: string;
  amount: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  time: string;
}

export function Overview() {
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // setLoading is undefined, so remove or implement if loading state needed
      const token = localStorage.getItem('procollector_auth_token');
      const response = await fetch('/api/v1/dashboard/overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStats(data.data.stats);
        // TODO: Fetch recent transactions
        setTransactions([
          { id: 'TX-1001', agent: 'Jean Dupont', client: 'Marché Central C3', amount: '15,000', status: 'Verified', time: '2 min ago' },
          { id: 'TX-1002', agent: 'Marie Kline', client: 'Boutique Alpha', amount: '5,000', status: 'Pending', time: '15 min ago' },
          { id: 'TX-1003', agent: 'Paul Biya II', client: 'Transport Union', amount: '50,000', status: 'Verified', time: '1 hr ago' },
        ]);
      } else {
        // Fallback mock data
        setStats([
          { title: 'Total Revenue', value: 'FCFA 2.4M', change: '+12.5%', trend: 'up' },
          { title: 'Active Agents', value: '47', change: '+3', trend: 'up' },
          { title: 'Daily Collections', value: '156', change: '+8.2%', trend: 'up' },
          { title: 'Anomalies', value: '3', change: '-2', trend: 'down' }
        ]);
        setTransactions([
          { id: 'TX-1001', agent: 'Jean Dupont', client: 'Marché Central C3', amount: '15,000', status: 'Verified', time: '2 min ago' },
          { id: 'TX-1002', agent: 'Marie Kline', client: 'Boutique Alpha', amount: '5,000', status: 'Pending', time: '15 min ago' },
          { id: 'TX-1003', agent: 'Paul Biya II', client: 'Transport Union', amount: '50,000', status: 'Verified', time: '1 hr ago' },
        ]);
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      // Fallback mock data
      setStats([
        { title: 'Total Revenue', value: 'FCFA 2.4M', change: '+12.5%', trend: 'up' },
        { title: 'Active Agents', value: '47', change: '+3', trend: 'up' },
        { title: 'Daily Collections', value: '156', change: '+8.2%', trend: 'up' },
        { title: 'Anomalies', value: '3', change: '-2', trend: 'down' }
      ]);
      setTransactions([
        { id: 'TX-1001', agent: 'Jean Dupont', client: 'Marché Central C3', amount: '15,000', status: 'Verified', time: '2 min ago' },
        { id: 'TX-1002', agent: 'Marie Kline', client: 'Boutique Alpha', amount: '5,000', status: 'Pending', time: '15 min ago' },
        { id: 'TX-1003', agent: 'Paul Biya II', client: 'Transport Union', amount: '50,000', status: 'Verified', time: '1 hr ago' },
      ]);
    }
  };


  const iconMap = {
    'Total Revenue': Wallet,
    'Active Agents': Users,
    'Daily Collections': CreditCard,
    'Anomalies': Activity
  };

  return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p className="text-gray-600">Welcome back. Here's a snapshot of your collection ecosystem.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const IconComponent = iconMap[stat.title as keyof typeof iconMap] || Activity;
                    return (
                        <div key={stat.title} className="bg-white p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-600 uppercase">{stat.title}</h3>
                                <div className="p-2 bg-gray-100 rounded">
                                    <IconComponent className="h-4 w-4 text-gray-600" />
                                </div>
                            </div>
                            <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend === 'up' ? '+' : ''}{stat.change}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg border p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Performance</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                            { month: 'Jan', revenue: 40000 },
                            { month: 'Feb', revenue: 45000 },
                            { month: 'Mar', revenue: 52000 },
                            { month: 'Apr', revenue: 48000 },
                            { month: 'May', revenue: 61000 },
                            { month: 'Jun', revenue: 55000 },
                            { month: 'Jul', revenue: 67000 },
                            { month: 'Aug', revenue: 69000 },
                            { month: 'Sep', revenue: 72000 },
                            { month: 'Oct', revenue: 68000 },
                            { month: 'Nov', revenue: 75000 },
                            { month: 'Dec', revenue: 82000 }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                                formatter={(value: any) => [`FCFA ${value?.toLocaleString()}`, 'Revenue']}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#0f172a"
                                strokeWidth={2}
                                dot={{ fill: '#0f172a', strokeWidth: 2, r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                    <p className="text-sm text-gray-600">Latest collection activities</p>
                </div>
                <div className="p-4">
                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                        {tx.agent.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{tx.agent}</p>
                                        <p className="text-xs text-gray-500">{tx.client}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{tx.amount}</p>
                                    <span className={`text-xs px-2 py-1 rounded uppercase ${
                                        tx.status === 'Verified' ? 'bg-green-100 text-green-800' :
                                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        tx.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
