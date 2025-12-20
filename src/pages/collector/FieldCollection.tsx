import { useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { MapPin, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FieldCollection() {
    const { latitude, longitude, loading: geoLoading } = useGeolocation();
    const [amount, setAmount] = useState('');
    const [clientName, setClientName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setAmount('');
            setClientName('');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-brand-dustGold/40 px-4 py-8 md:py-12 font-sans text-brand-dark selection:bg-brand-green/10">
            <div className="max-w-md mx-auto space-y-8">
                {/* Header with High-End Branding */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-brand-green/20 rounded-2xl blur-sm"></div>
                            <img src="/favicon.jpg" alt="Logo" className="relative h-12 w-12 rounded-xl shadow-2xl border border-white/50" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/40 italic leading-none mb-1">PRO<span className="text-brand-green">COLLECTOR</span></p>
                            <h3 className="font-black text-sm uppercase italic tracking-tighter">Jean Collector</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark/30 italic">Badge Verified</p>
                        <p className="font-black text-[11px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full inline-block mt-1">#4421</p>
                    </div>
                </div>

                {/* Today's Stats - Premium Insight Card */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-dark p-6 rounded-[2.5rem] shadow-premium text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 italic">Today</div>
                            <div className="text-3xl font-black italic tracking-tighter text-brand-dustGold">8,400</div>
                            <div className="text-[10px] font-black text-brand-green mt-2 uppercase">Verified</div>
                        </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-premium border border-white flex flex-col justify-between">
                        <div>
                            <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-1 italic">Target</div>
                            <div className="text-xl font-black text-brand-dark">15,000</div>
                        </div>
                        <div className="w-full bg-brand-dustGold/30 h-1.5 rounded-full mt-2">
                            <div className="bg-brand-green h-full w-[56%] rounded-full shadow-[0_0_8px_rgba(46,204,113,0.4)] transition-all duration-1000"></div>
                        </div>
                    </div>
                </div>

                {success ? (
                    <Card className="border-none bg-white rounded-[3rem] shadow-premium animate-in zoom-in duration-500 overflow-hidden">
                        <CardContent className="pt-16 pb-12 text-center space-y-6 relative">
                            <div className="absolute inset-0 bg-brand-green/5"></div>
                            <div className="relative">
                                <div className="h-24 w-24 bg-brand-green rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand-green/20 ring-8 ring-brand-green/10 animate-pulse">
                                    <CheckCircle2 className="h-12 w-12 text-white" />
                                </div>
                                <div className="mt-8 space-y-2">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Receipt Generated</h2>
                                    <p className="text-xs font-bold text-brand-dark/50 italic px-8 leading-relaxed">The transaction has been hashed and added to the immutable collection ledger.</p>
                                </div>
                                <div className="pt-6 px-8">
                                    <Button variant="secondary" className="w-full h-16 rounded-2xl uppercase font-black text-sm italic tracking-tighter shadow-xl hover:scale-[1.02] active:scale-95 transition-all" onClick={() => setSuccess(false)}>
                                        Collect Again
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Geolocation Status - Sleeker Design */}
                        <div className={cn(
                            "px-6 py-4 rounded-[2rem] border-2 transition-all duration-500 flex items-center justify-between",
                            latitude
                                ? "bg-white border-brand-green/20 shadow-premium"
                                : "bg-rose-50 border-rose-100 shadow-sm"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                    latitude ? "bg-brand-green text-white shadow-lg shadow-brand-green/20" : "bg-rose-100 text-rose-500 shadow-inner"
                                )}>
                                    {geoLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-dark/30 leading-none mb-1 shadow-sm">GPS Anchor</p>
                                    <p className="text-xs font-black uppercase tracking-tighter">
                                        {geoLoading ? <span className="text-brand-dark/40 italic">Syncing...</span> : latitude ? `${latitude.toFixed(5)}, ${longitude?.toFixed(5)}` : "Position Access Denied"}
                                    </p>
                                </div>
                            </div>
                            {latitude && !geoLoading && (
                                <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse"></div>
                            )}
                        </div>

                        {/* Collection Form - High Focus */}
                        <div className="bg-white rounded-[3rem] shadow-premium p-8 border border-white relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4">
                                <Camera className="h-5 w-5 text-brand-dark/5" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 flex items-center gap-2">
                                        <span className="w-4 h-[1px] bg-brand-green"></span>
                                        Collection Value (FCFA)
                                    </label>
                                    <div className="relative group">
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full text-5xl font-black tracking-tighter bg-brand-dustGold/20 border-none rounded-3xl p-8 focus:ring-4 focus:ring-brand-green/10 placeholder:text-brand-dark/5 text-brand-dark outline-none transition-all tabular-nums text-center"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-brand-dark/20 italic uppercase select-none">
                                            FCFA
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 px-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 flex items-center gap-2">
                                        <span className="w-4 h-[1px] bg-brand-dark/20"></span>
                                        Client Identification
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="CLIENT NAME OR ID..."
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full font-black uppercase tracking-widest bg-brand-dark/5 border-none rounded-2xl p-5 focus:ring-4 focus:ring-brand-green/10 placeholder:text-brand-dark/10 text-brand-dark text-[11px] outline-none transition-all"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-20 rounded-2xl text-lg shadow-2xl relative group overflow-hidden bg-brand-dark text-white hover:bg-brand-dark/95 active:scale-95 transition-all"
                                    disabled={submitting || !latitude}
                                >
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-green/50 w-0 group-hover:w-full transition-all duration-1000"></div>
                                    <div className="flex items-center justify-center gap-3">
                                        {submitting ? <Loader2 className="h-6 w-6 animate-spin text-brand-green" /> : <CheckCircle2 className="h-6 w-6 text-brand-green" />}
                                        <span className="font-black uppercase tracking-tight italic">Verify & Record Collection</span>
                                    </div>
                                </Button>

                                {!latitude && !geoLoading && (
                                    <div className="text-center space-y-2 px-10 animate-in fade-in duration-300">
                                        <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest leading-relaxed">
                                            GPS Authentication Required to initiate secure transaction layer
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                {/* Secure Footer Insight */}
                <div className="text-center pt-10 space-y-2 opacity-30 group">
                    <p className="text-[8px] font-black text-brand-dark uppercase tracking-[0.4em] group-hover:text-brand-green transition-colors">PROCOLLECTOR SECURE AGENT TERMINAL</p>
                    <p className="text-[8px] font-bold text-brand-dark uppercase tracking-widest">Altonixa Group Ltd • Biometric Verification Active</p>
                </div>
            </div>
        </div>
    );
}
