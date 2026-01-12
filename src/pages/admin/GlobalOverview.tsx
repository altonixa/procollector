import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Building2, Activity, Plus, Shield, CreditCard, Search, MoreVertical, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export function GlobalOverview() {
    const [activeTab, setActiveTab] = useState<'overview' | 'orgs' | 'billing'>('overview');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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
                <Button onClick={fetchDashboardData}>Retry</Button>
            </div>
        );
    }

    const stats = data?.stats || [];
    const recentActivity = data?.recentActivity || [];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase">System Admin</h2>
                    <p className="text-brand-dark/50 mt-1 font-bold uppercase tracking-widest text-xs italic">Altonixa Global Infrastructure Management</p>
                </div>

                <div className="flex bg-brand-dark/5 p-1 rounded-2xl border border-brand-dark/5">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'orgs', label: 'Organizations' },
                        { id: 'billing', label: 'Billing' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab.id
                                    ? "bg-brand-dark text-white shadow-lg"
                                    : "text-brand-dark/40 hover:text-brand-dark"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div className="grid gap-3 md:grid-cols-3">
                        {stats.map((stat, index) => {
                            const icons = {
                                'Total Organizations': Building2,
                                'Total Users': Shield,
                                'System Collections': CreditCard,
                                'System Health': Activity
                            };
                            const colors = {
                                'Total Organizations': 'bg-blue-100 text-blue-600',
                                'Total Users': 'bg-purple-100 text-purple-600',
                                'System Collections': 'bg-green-100 text-green-600',
                                'System Health': 'bg-gray-100 text-gray-600'
                            };
                            const IconComponent = icons[stat.label] || Activity;

                            return (
                                <Card key={index} className="border border-brand-slate-200 shadow-sm bg-white">
                                    <CardHeader className="p-4 pb-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <CardTitle className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide">
                                                {stat.label}
                                            </CardTitle>
                                            <div className={`p-2 rounded-lg ${colors[stat.label] || 'bg-gray-100'}`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-brand-dark mb-2">{stat.value}</div>
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-brand-slate-100 text-brand-slate-700">
                                            {stat.change}
                                        </div>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>

                    <Card className="border border-brand-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="border-b border-brand-slate-200 px-4 py-3">
                            <CardTitle className="text-lg font-semibold text-brand-dark">System Activity Log</CardTitle>
                            <CardDescription className="text-xs text-brand-slate-500">Recent platform events and updates</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-brand-slate-100">
                                {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
                                    <div key={i} className="px-4 py-3 hover:bg-brand-slate-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-brand-dark">{activity.action}</p>
                                                <p className="text-xs text-brand-slate-500 mt-0.5">by {activity.user}</p>
                                            </div>
                                            <span className="text-xs text-brand-slate-400 font-medium">{activity.time}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="px-4 py-6 text-center">
                                        <p className="text-sm text-brand-slate-500">No recent activity</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'orgs' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-brand-dark/5 shadow-premium">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/30" />
                            <input
                                type="text"
                                placeholder="Search institutions..."
                                className="w-full pl-12 pr-6 py-3 bg-brand-dark/5 border-none rounded-2xl text-xs font-black uppercase tracking-widest placeholder:opacity-30 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                            />
                        </div>
                        <Button className="ml-4 h-12 px-8 rounded-2xl shadow-xl shadow-brand-green/20">
                            <Plus className="mr-2 h-4 w-4" /> Add Institution
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {[
                            { name: 'Douala City Council', type: 'COUNCIL', agents: 156, status: 'Active', plan: 'Enterprise' },
                            { name: 'National Teachers Union', variant: 'blue', type: 'UNION', agents: 42, status: 'Active', plan: 'Standard' },
                            { name: 'Eco Bank Cameroon', variant: 'green', type: 'BANK', agents: 89, status: 'Pending', plan: 'Gold' },
                        ].map((org, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between hover:border-gray-300">
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 bg-brand-dustGold rounded-[1.5rem] flex items-center justify-center border-2 border-brand-dark/5 group-hover:bg-brand-green transition-colors">
                                        <Shield className="h-8 w-8 text-brand-dark" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black uppercase tracking-tight text-brand-dark">{org.name}</h4>
                                        <div className="flex gap-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-brand-dark/5 px-2 py-0.5 rounded text-brand-dark/60">{org.type}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{org.agents} Active Collectors</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-1">Billing Plan</p>
                                        <p className="text-sm font-black text-brand-dark italic">{org.plan}</p>
                                    </div>
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        org.status === 'Active' ? "bg-gray-100 text-gray-700" : "bg-brand-dark/5 text-brand-dark/40"
                                    )}>
                                        {org.status}
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-brand-dark/5">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Standard Plan', price: 'FCFA 250,000', per: 'month', features: ['Up to 50 Agents', 'Basic Analytics', 'Email Support'] },
                            { title: 'Enterprise Plan', price: 'FCFA 750,000', per: 'month', features: ['Unlimited Agents', 'Real-time GPS', 'Audit APIs'], highlight: true },
                            { title: 'Revenue Share', price: '2.5%', per: 'transaction', features: ['Zero recurring', 'Full Features', '24/7 Priority'] },
                        ].map((plan, i) => (
                            <Card key={i} className={cn(
                                "border-2 overflow-hidden shadow-sm flex flex-col justify-between",
                                plan.highlight ? "border-gray-400 bg-gray-50" : "border-brand-dark/5 bg-white"
                            )}>
                                <div className="p-8 space-y-6">
                                    {plan.highlight && <div className="text-brand-green font-black text-[9px] uppercase tracking-[0.3em] mb-4 text-center">Most Popular</div>}
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-brand-dark text-center italic">{plan.title}</h3>
                                    <div className="text-center">
                                        <span className="text-3xl font-black text-brand-dark italic">{plan.price}</span>
                                        <span className="text-[10px] uppercase font-black text-brand-dark/30 ml-2">/ {plan.per}</span>
                                    </div>
                                    <div className="space-y-3 pt-6">
                                        {plan.features.map((f, j) => (
                                            <div key={j} className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase">
                                                <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 bg-brand-dark/5 border-t border-brand-dark/5">
                                    <Button variant={plan.highlight ? "secondary" : "outline"} className="w-full font-black uppercase tracking-widest text-[10px]">Configure Plan</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-brand-dark/5 bg-white shadow-premium">
                        <CardHeader className="border-b border-brand-dark/5 px-8 pt-8 pb-4">
                            <CardTitle className="text-xl font-black uppercase tracking-tight italic">Platform Revenue Feed</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-brand-dark/5">
                                {[
                                    { org: 'Douala City Council', amount: 'FCFA 750,000', type: 'Subscription', date: 'Dec 20, 2025' },
                                    { org: 'National Teachers Union', amount: 'FCFA 250,000', type: 'Subscription', date: 'Dec 18, 2025' },
                                    { org: 'Bank of Central Africa', amount: 'FCFA 124,500', type: 'Usage Fee', date: 'Dec 18, 2025' },
                                ].map((item, i) => (
                                    <div key={i} className="px-8 py-5 flex items-center justify-between group hover:bg-brand-dark/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
                                                <CreditCard className="h-5 w-5 text-brand-dark" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-brand-dark uppercase tracking-tight">{item.org}</p>
                                                <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">{item.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-brand-dark italic">{item.amount}</p>
                                            <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">
              Powered by Altonixa Group Ltd • System Administration
            </p>
          </div>
        </footer>
    );
}
