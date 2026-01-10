import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, BarChart3, Globe2, Users, Wallet, Building2, Smartphone, ScrollText } from "lucide-react";

export function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-brand-light pt-16 pb-24 lg:pt-32 lg:pb-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-brand-green mr-2 animate-pulse"></span>
                        Now Live across Africa
                    </div>
                    <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-brand-dark sm:text-6xl mb-6 uppercase">
                        Eliminate Revenue Leakages with <span className="text-brand-green">Digital Confidence</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-brand-dark/70 mb-10 font-medium">
                        A centralized, multi-tenant digital collection platform for Governments, Councils, Banks, and Unions. Track every coin from the field to the bank in real-time.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/login">
                            <Button size="lg" className="h-14 px-10 text-base font-black uppercase tracking-widest shadow-2xl shadow-brand-green/20 group">
                                Start with Confidence
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
                    <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-green/20 blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-teal/20 blur-[120px]"></div>
                </div>
            </section>

            {/* Problem / Solution Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl mb-4">Why ProCollector?</h2>
                        <p className="text-lg text-brand-dark/60 max-w-2xl mx-auto font-medium">
                            Traditional collection methods are full of leaks, fraud, and manual errors. We solve this with technology built for the field.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow group">
                                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-brand-green/50 group-hover:bg-brand-green/5 transition-colors">
                                    <feature.icon className="h-6 w-6 text-brand-green" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                                <p className="text-brand-dark/70 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof / Trust */}
            <section className="py-20 bg-brand-dark text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-semibold mb-12 opacity-80">Trusted by modern institutions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                        {/* Placeholders for logos */}
                        <div className="h-12 flex items-center justify-center border border-white/20 rounded">City Council</div>
                        <div className="h-12 flex items-center justify-center border border-white/20 rounded">National Bank</div>
                        <div className="h-12 flex items-center justify-center border border-white/20 rounded">Market Union</div>
                        <div className="h-12 flex items-center justify-center border border-white/20 rounded">Transport Co.</div>
                    </div>
                </div>
            </section>

            {/* Value Props Details */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl font-bold text-brand-dark">Complete Visibility, Finally.</h2>
                            <p className="text-lg text-slate-600">
                                ProCollector gives you a "God-mode" view of your operations. See every transaction as it happens, know where your collectors are, and reconcile cash instantly.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Real-time Dashboard & Analytics",
                                    "GPS-tracked Field Collections",
                                    "Fraud-proof Digital Receipts",
                                    "Automated Daily Reconciliation"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0" />
                                        <span className="text-brand-dark font-bold">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button variant="outline" className="mt-4">Learn about Features</Button>
                        </div>
                        <div className="flex-1">
                            {/* Abstract UI representation */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                                <div className="absolute top-0 w-full h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="pt-8 p-6 space-y-4 bg-slate-50/50">
                                    <div className="flex gap-4">
                                        <div className="w-1/3 h-24 bg-white rounded-lg shadow-sm border border-slate-100 p-4">
                                            <div className="h-2 w-12 bg-slate-200 rounded mb-2"></div>
                                            <div className="h-6 w-20 bg-brand-green/20 rounded"></div>
                                        </div>
                                        <div className="w-1/3 h-24 bg-white rounded-lg shadow-sm border border-slate-100 p-4">
                                            <div className="h-2 w-12 bg-slate-200 rounded mb-2"></div>
                                            <div className="h-6 w-20 bg-brand-teal/20 rounded"></div>
                                        </div>
                                        <div className="w-1/3 h-24 bg-white rounded-lg shadow-sm border border-slate-100 p-4">
                                            <div className="h-2 w-12 bg-slate-200 rounded mb-2"></div>
                                            <div className="h-6 w-20 bg-brand-dark/20 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-40 bg-white rounded-lg shadow-sm border border-slate-100 w-full p-4 flex items-end gap-2">
                                        <div className="w-full bg-brand-green/10 h-[40%] rounded-t"></div>
                                        <div className="w-full bg-brand-green/20 h-[60%] rounded-t"></div>
                                        <div className="w-full bg-brand-green/40 h-[30%] rounded-t"></div>
                                        <div className="w-full bg-brand-green h-[80%] rounded-t"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* How it Works */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-green/10" />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase mb-4">How it <span className="text-brand-green">Works</span></h2>
                        <p className="text-brand-dark/50 font-bold uppercase tracking-widest text-sm italic">Enterprise Revenue Lifecycle in 4 Steps</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-brand-green/10 -z-0" />

                        {[
                            { step: '01', title: 'Register Org', desc: 'Create your secure portal, invite Managers, and define your zones.', icon: Building2 },
                            { step: '02', title: 'Deploy Agents', desc: 'Onboard collectors and assign them to territories or client routes.', icon: Users },
                            { step: '03', title: 'Field Collection', desc: 'Agents record collections with mandatory GPS & digital receipts.', icon: Smartphone },
                            { step: '04', title: 'Reconcile', desc: 'Compare collected funds against bank deposits in real-time.', icon: ScrollText },
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 text-center space-y-6 group">
                                <div className="h-28 w-28 bg-brand-dustGold rounded-[2rem] mx-auto flex items-center justify-center border-2 border-brand-dark/5 shadow-premium group-hover:scale-110 group-hover:bg-brand-green transition-all duration-500">
                                    <item.icon className="h-10 w-10 text-brand-dark" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-brand-green font-black text-xs uppercase tracking-[0.3em]">{item.step}</div>
                                    <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight italic">{item.title}</h3>
                                    <p className="text-sm font-bold text-brand-dark/50 leading-relaxed px-4">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-brand-green">
                <div className="max-w-4xl mx-auto px-4 text-center text-brand-dark">
                    <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Ready to secure your revenue?</h2>
                    <p className="text-brand-dark/70 text-lg mb-10 max-w-2xl mx-auto font-bold leading-relaxed">
                        Join the councils and financial institutions using ProCollector to modernize their operations today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/login">
                            <Button size="lg" variant="secondary" className="h-14 px-10 shadow-xl">
                                Get Started Now
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button size="lg" variant="outline" className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white h-14 px-10">
                                Talk to Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        title: "Zero Revenue Leakage",
        description: "Every franc collected is digitally recorded. No more 'lost' receipt books or discrepancies between field and office.",
        icon: ShieldCheck
    },
    {
        title: "Real-time Visibility",
        description: "Watch collections happen live on your dashboard. Monitor agent performance and location instantly.",
        icon: BarChart3
    },
    {
        title: "Multi-Tenant Cloud",
        description: "Built for scale. Whether you are one council or a bank managing thousands of agents, we handle it securely.",
        icon: Globe2
    },
    {
        title: "Fraud Prevention",
        description: "Anti-fraud algorithms detect suspicious activities, late entries, and location mismatches automatically.",
        icon: Users // Using Users as proxy for "Agent integrity"
    },
    {
        title: "Smart Settlements",
        description: "Automated reconciliation and settlement logic tailored to your organization's internal accounting rules.",
        icon: Wallet
    },
    {
        title: "Digital Receipts",
        description: "Instant SMS or highly secure printed receipts that verify genuineness for the payer.",
        icon: CheckCircle2
    }
];
