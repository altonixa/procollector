import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CreditCard, Download, AlertCircle } from 'lucide-react';

type Payment = { id: string; amount: string; date: string; collector: string; status: 'Confirmed' | 'Pending'; method: string };

const mockPayments: Payment[] = [
    { id: 'PAY-001', amount: 'FCFA 15,000', date: '2025-12-20', collector: 'Jean Dupont', status: 'Confirmed', method: 'Mobile Money' },
    { id: 'PAY-002', amount: 'FCFA 10,000', date: '2025-12-18', collector: 'Marie Kline', status: 'Confirmed', method: 'Cash' },
    { id: 'PAY-003', amount: 'FCFA 7,500', date: '2025-12-15', collector: 'Jean Dupont', status: 'Confirmed', method: 'Bank Transfer' },
];

export function ClientPortal() {
    const [tab, setTab] = useState<'overview' | 'history' | 'statements' | 'disputes'>('overview');
    const [disputes, setDisputes] = useState<{ id: string; issue: string; status: string }[]>([]);
    const [newDispute, setNewDispute] = useState('');

    const submitDispute = () => {
        if (!newDispute.trim()) return;
        setDisputes([
            { id: `D-${Date.now()}`, issue: newDispute, status: 'Open' },
            ...disputes
        ]);
        setNewDispute('');
    };

    return (
        <div className="min-h-screen bg-brand-dustGold/40 p-4 md:p-10 font-sans text-brand-dark selection:bg-brand-green/10">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-brand-green text-white text-[9px] font-black uppercase tracking-tighter rounded">Live Portal</span>
                            <span className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">ID: CLIENT-8829</span>
                        </div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic">
                            My <span className="text-brand-green">Portfolio</span>
                        </h1>
                        <p className="text-sm font-bold text-brand-dark/50 max-w-sm leading-relaxed">
                            Access your real-time collection history, track pending deposits, and manage your organization billing.
                        </p>
                    </div>

                    {/* Premium Balance Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-brand-green/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-premium border border-white/50 min-w-[280px]">
                            <div className="h-14 w-14 rounded-2xl bg-brand-green flex items-center justify-center shadow-lg shadow-brand-green/20">
                                <CreditCard className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Available Balance</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[10px] font-black text-brand-dark/60 italic">FCFA</span>
                                    <span className="text-3xl font-black text-brand-dark tracking-tighter tabular-nums">25,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation & Actions */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Left Sidebar / Tabs */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex flex-col gap-1 p-2 bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm border border-white">
                            {[
                                { id: 'overview', label: 'Overview', icon: 'grid' },
                                { id: 'history', label: 'Payments', icon: 'list' },
                                { id: 'statements', label: 'Statements', icon: 'file' },
                                { id: 'disputes', label: 'Disputes', icon: 'alert' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id as any)}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${tab === t.id
                                            ? 'bg-brand-dark text-white shadow-xl translate-x-1'
                                            : 'text-brand-dark/40 hover:text-brand-dark hover:bg-white/50'
                                        }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Quick Insight */}
                        <div className="bg-brand-green/5 rounded-3xl p-6 border border-brand-green/10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-green/60 mb-4 italic">Collector Info</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-lg font-black text-brand-dark">Jean Dupont</div>
                                    <div className="text-[10px] font-black text-brand-dark/40 uppercase">Agent Badge #4421</div>
                                </div>
                                <Button variant="outline" className="w-full text-[10px] h-9 font-black uppercase">Call Agent</Button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {/* OVERVIEW TAB */}
                        {tab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Card className="bg-white/80 border-none shadow-premium hover:shadow-2xl transition-all">
                                        <CardHeader>
                                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 italic">Target Insight</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-black text-brand-dark tracking-tighter">75% Complete</div>
                                            <div className="w-full bg-brand-dustGold h-2 rounded-full mt-4 overflow-hidden">
                                                <div className="bg-brand-green h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(46,204,113,0.3)]"></div>
                                            </div>
                                            <p className="text-[10px] font-black text-brand-dark/40 mt-3 uppercase">Dec 2025 Monthly Goal</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-brand-dark border-none shadow-premium text-white overflow-hidden relative">
                                        <div className="absolute right-[-20%] top-[-20%] w-40 h-40 bg-brand-green/20 rounded-full blur-3xl"></div>
                                        <CardHeader>
                                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 italic">Next Payment Due</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-3xl font-black italic tracking-tighter text-brand-dustGold">Jan 01, 2026</div>
                                            <p className="text-[10px] font-black text-white/40 uppercase leading-tight">Estimated Amount: FCFA 12,500</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card className="bg-white/80 border-none shadow-premium">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="font-black italic text-xl uppercase tracking-tight">Recent Activity</CardTitle>
                                            <CardDescription className="text-[10px] font-black uppercase text-brand-dark/40">Real-time ledger entries</CardDescription>
                                        </div>
                                        <Button variant="ghost" className="text-[10px] font-black uppercase text-brand-green hover:bg-brand-green/10">View All</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {mockPayments.slice(0, 3).map((p) => (
                                                <div key={p.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-brand-dustGold/30 transition-all border border-transparent hover:border-brand-dark/5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs italic">
                                                            {p.amount.includes('15') ? '+' : '✓'}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-sm tracking-tight">{p.amount}</div>
                                                            <div className="text-[10px] font-black text-brand-dark/40 uppercase">{p.date} • {p.method}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-black bg-white border border-brand-dark/5 text-brand-dark px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                                            {p.status}
                                                        </span>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* PAYMENT HISTORY TAB */}
                        {tab === 'history' && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between bg-white/60 p-4 rounded-3xl backdrop-blur-sm border border-white">
                                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Transaction Ledger</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="text-[10px] font-black uppercase h-9">Filters</Button>
                                        <Button className="text-[10px] font-black uppercase h-9 px-6 bg-brand-dark">Export PDF</Button>
                                    </div>
                                </div>

                                <Card className="border-none shadow-premium overflow-hidden rounded-3xl bg-white/80">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-brand-dark text-white">
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Reference</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Value (FCFA)</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Collector</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Status</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-brand-dark/5">
                                                    {mockPayments.map((p) => (
                                                        <tr key={p.id} className="hover:bg-brand-green/5 transition-colors group">
                                                            <td className="px-6 py-5">
                                                                <div className="text-xs font-black text-brand-dark">{p.id}</div>
                                                                <div className="text-[10px] font-black text-brand-dark/30 uppercase mt-0.5">{p.date}</div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="text-lg font-black text-brand-dark italic tracking-tighter">{p.amount}</div>
                                                                <div className="text-[10px] font-black text-brand-dark/40 uppercase">{p.method}</div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-6 w-6 rounded bg-brand-dustGold flex items-center justify-center font-black text-[10px] italic">JD</div>
                                                                    <span className="text-xs font-bold text-brand-dark/70">{p.collector}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <span className="inline-flex items-center px-3 py-1 bg-brand-green/20 text-brand-dark text-[9px] font-black uppercase tracking-widest rounded-full border border-brand-green/20 shadow-sm">
                                                                    {p.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-5 text-right">
                                                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-brand-dark hover:text-white rounded-xl transition-all">
                                                                    <Download className="h-5 w-5" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* STATEMENTS TAB */}
                        {tab === 'statements' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div className="p-8 bg-white/80 rounded-[2rem] shadow-premium border-b-4 border-brand-green flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-4">
                                            <CreditCard className="h-6 w-6 text-brand-green" />
                                        </div>
                                        <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-1">Opening</div>
                                        <div className="text-xl font-black text-brand-dark italic">FCFA 10,000</div>
                                    </div>
                                    <div className="p-8 bg-white/80 rounded-[2rem] shadow-premium border-b-4 border-brand-dark flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-2xl bg-brand-dark/5 flex items-center justify-center mb-4">
                                            <Download className="h-6 w-6 text-brand-dark" />
                                        </div>
                                        <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-1">Total Paid</div>
                                        <div className="text-xl font-black text-brand-green italic">FCFA 32,500</div>
                                    </div>
                                    <div className="p-8 bg-brand-dark rounded-[2rem] shadow-premium flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                            <PiggyBank className="h-6 w-6 text-brand-dustGold" />
                                        </div>
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Closing</div>
                                        <div className="text-xl font-black text-white italic tracking-tighter">FCFA 25,000</div>
                                    </div>
                                </div>

                                <Card className="border-none shadow-premium rounded-3xl bg-white/80 p-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-brand-dark">December 2025</h3>
                                            <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Official Transaction Report</p>
                                        </div>
                                        <Button className="h-12 px-8 rounded-2xl font-black text-xs uppercase bg-brand-dark hover:bg-brand-dark/90 text-white italic tracking-tighter shadow-xl">
                                            Download Analysis PDF
                                        </Button>
                                    </div>

                                    <div className="p-6 bg-brand-dustGold/20 rounded-2xl border border-brand-dark/5">
                                        <p className="text-xs font-bold text-brand-dark/60 italic leading-relaxed">
                                            This statement summarizes all verified collections from <span className="text-brand-dark font-black">Dec 01</span> to <span className="text-brand-dark font-black">Dec 20, 2025</span>. Any discrepancies should be reported via the Disputes tab immediately.
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* DISPUTES TAB */}
                        {tab === 'disputes' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <Card className="border-none shadow-premium rounded-3xl bg-brand-dark text-white p-8">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="flex-1 space-y-6 w-full">
                                            <div className="space-y-2">
                                                <h3 className="text-3xl font-black italic italic uppercase tracking-tighter">Report a <span className="text-brand-green">Conflict</span></h3>
                                                <p className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-relaxed">
                                                    Submit a discrepancy report if a payment is missing or incorrectly recorded. Our audit team will investigate within 24 hours.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <textarea
                                                    placeholder="Describe the discrepancy (e.g., Reference PAY-002 shows FCFA 10,000 but I paid FCFA 12,000)..."
                                                    value={newDispute}
                                                    onChange={(e) => setNewDispute(e.target.value)}
                                                    rows={4}
                                                    className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] focus:ring-4 focus:ring-brand-green/20 placeholder:text-white/20 text-white font-bold text-sm outline-none transition-all"
                                                />
                                                <div className="flex gap-4">
                                                    <Button onClick={submitDispute} className="h-14 flex-1 rounded-2xl font-black text-sm uppercase bg-brand-green hover:bg-brand-green/90 text-brand-dark shadow-xl active:scale-95 transition-all">
                                                        Submit Report
                                                    </Button>
                                                    <Button variant="outline" onClick={() => setNewDispute('')} className="h-14 px-8 rounded-2xl font-black text-sm uppercase border-white/20 text-white hover:bg-white/5">
                                                        Clear
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-64 p-6 bg-white/5 rounded-[2rem] border border-white/10 space-y-4 items-center flex flex-col justify-center text-center">
                                            <div className="h-16 w-16 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                                                <AlertCircle className="h-8 w-8" />
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Conflict Hotline</div>
                                            <div className="text-lg font-black italic text-brand-dustGold">+237 600-000-000</div>
                                        </div>
                                    </div>
                                </Card>

                                {disputes.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30 ml-2 italic">Active Investigations</h4>
                                        <div className="grid gap-4">
                                            {disputes.map((d) => (
                                                <div key={d.id} className="p-6 bg-white/80 border border-white shadow-premium rounded-3xl flex items-center justify-between group hover:border-brand-green/30 transition-all">
                                                    <div className="flex items-start gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                                            <AlertCircle className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-sm tracking-tight text-brand-dark group-hover:text-brand-green transition-colors">{d.issue}</div>
                                                            <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mt-1">Ticket: {d.id} • Status: <span className="text-brand-green">{d.status}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="flex flex-col items-center justify-center py-10 border-t border-brand-dark/5 text-center gap-1">
                    <p className="text-[10px] font-black text-brand-dark/20 uppercase tracking-[0.5em] italic"> Altonixa Ecosystem Security Layer </p>
                    <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest"> 256-bit Encrypted Ledger • Immutable Verification </p>
                </div>
            </div>
        </div>
    );
}

export default ClientPortal;
