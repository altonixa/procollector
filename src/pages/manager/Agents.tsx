import { UserPlus, Search, MoreVertical, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

const mockAgents = [
    { id: '1', name: 'Jean Dupont', email: 'jean.d@procollector.com', phone: '+237 670-000-111', zone: 'Akwa, Douala', status: 'Active', collections: '1.2M', lastActive: '2 mins ago' },
    { id: '2', name: 'Marie Kline', email: 'marie.k@procollector.com', phone: '+237 671-222-333', zone: 'Bonanjo, Douala', status: 'Active', collections: '850K', lastActive: '15 mins ago' },
    { id: '3', name: 'Paul Biya II', email: 'paul.b@procollector.com', phone: '+237 672-333-444', zone: 'Bastos, Yaoundé', status: 'Inactive', collections: '0', lastActive: '2 days ago' },
    { id: '4', name: 'Sarah Ngono', email: 'sarah.n@procollector.com', phone: '+237 673-444-555', zone: 'Messa, Yaoundé', status: 'Active', collections: '450K', lastActive: '1 hr ago' },
];

export function Agents() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-brand-dark uppercase">Agents</h2>
                    <p className="text-brand-dark/60 mt-1 font-bold">Manage and monitor your field collectors in real-time.</p>
                </div>
                <Button variant="secondary" className="w-full md:w-auto shadow-lg shadow-black/10">
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Agent
                </Button>
            </div>

            {/* Filters / Search */}
            <Card className="bg-white/50 border-brand-dark/5 backdrop-blur-sm shadow-sm">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/30" />
                        <input
                            type="text"
                            placeholder="Search by name, zone, or email..."
                            className="w-full pl-10 pr-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-brand-dark font-bold placeholder:text-brand-dark/30"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-lg text-sm font-black uppercase tracking-wider text-brand-dark">
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <select className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-lg text-sm font-black uppercase tracking-wider text-brand-dark">
                            <option>All Zones</option>
                            <option>Douala</option>
                            <option>Yaoundé</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Agents Table/Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {mockAgents.map((agent) => (
                    <Card key={agent.id} className="hover:shadow-premium transition-all border-brand-dark/5 bg-white group overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-brand-dark/5">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-brand-green flex items-center justify-center text-brand-dark font-black shadow-sm group-hover:scale-110 transition-transform">
                                    {agent.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-brand-dark tracking-tight leading-none mb-1">{agent.name}</h3>
                                    <p className="text-[10px] text-brand-green font-black uppercase tracking-widest">Field Collector</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-brand-dark/20 hover:text-brand-dark hover:bg-brand-dark/5">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center gap-2 text-sm font-bold text-brand-dark/60">
                                    <MapPin className="h-4 w-4 text-brand-green" />
                                    {agent.zone}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-brand-dark/60">
                                    <Phone className="h-4 w-4 text-brand-green" />
                                    {agent.phone}
                                </div>
                            </div>

                            <div className="p-4 bg-brand-dustGold-light rounded-2xl border border-brand-dark/5 flex justify-between items-center shadow-inner">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-brand-dark/40 tracking-widest mb-1">Today's collections</p>
                                    <p className="text-xl font-black text-brand-dark tracking-tighter">FCFA {agent.collections}</p>
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                                    agent.status === 'Active' ? "bg-brand-green text-brand-dark" : "bg-brand-dark text-white"
                                )}>
                                    {agent.status}
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest pt-2 border-t border-brand-dark/5">
                                <span className="text-brand-dark/30 italic">Active {agent.lastActive}</span>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] text-brand-dark hover:text-brand-green hover:bg-brand-green/10 transition-colors uppercase font-black tracking-widest">
                                    Track Activity
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
