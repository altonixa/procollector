import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import {
    ShieldCheck, Eye, Building2, Smartphone, Users, Wallet,
    CreditCard, MapPin, Clock, AlertTriangle, CheckCircle2, TrendingUp,
    Database, Zap, Lock, Globe, Tablet, Monitor, ArrowRight, Home as HomeIcon
} from "lucide-react";

const groups = [
    {
        category: "Security & compliance", icon: ShieldCheck,
        items: [
            { title: "Zero revenue leakage", description: "Every transaction is digitally recorded. No lost receipt books, no field-vs-office discrepancies.", icon: CreditCard },
            { title: "Fraud detection", description: "Anomaly detection flags suspicious activity, late entries and location mismatches.", icon: AlertTriangle },
            { title: "Immutable audit trail", description: "Every transaction is hashed and stored in an append-only ledger.", icon: Lock },
            { title: "Role-based access", description: "Granular permissions per portal and per branch.", icon: Users },
        ],
    },
    {
        category: "Real-time visibility", icon: Eye,
        items: [
            { title: "Live dashboard", description: "Watch collections happen as they're recorded.", icon: Monitor },
            { title: "GPS-tracked collections", description: "Every receipt is geo-tagged with precise coordinates.", icon: MapPin },
            { title: "Instant reconciliation", description: "Automated matching against your accounting rules.", icon: Clock },
            { title: "Performance analytics", description: "KPIs by collector, branch, route or client.", icon: TrendingUp },
        ],
    },
    {
        category: "Multi-tenant by design", icon: Building2,
        items: [
            { title: "Scalable cloud platform", description: "From one council to a bank with thousands of agents.", icon: Globe },
            { title: "Tenant isolation", description: "Strict data boundaries between organizations.", icon: Database },
            { title: "Custom workflows", description: "Configure rules to match your processes.", icon: Zap },
            { title: "API & webhooks", description: "Plug into existing banking and ERP systems.", icon: ArrowRight },
        ],
    },
    {
        category: "Field agent experience", icon: Smartphone,
        items: [
            { title: "Mobile-first", description: "Designed for agents with minimal training.", icon: Smartphone },
            { title: "Offline support", description: "Works without signal, syncs when reconnected.", icon: Tablet },
            { title: "Digital receipts", description: "Instant SMS or printed receipts the payer can verify.", icon: CheckCircle2 },
            { title: "Route optimization", description: "Smart routing to reduce travel time.", icon: MapPin },
        ],
    },
    {
        category: "Client management", icon: Users,
        items: [
            { title: "Client registry", description: "Payment history, preferences and contact log.", icon: Database },
            { title: "Payment tracking", description: "Status updates with reminders and notifications.", icon: CreditCard },
            { title: "Dispute resolution", description: "Streamlined process with digital evidence.", icon: AlertTriangle },
            { title: "Multi-channel payments", description: "Mobile money, bank transfer or cash.", icon: Wallet },
        ],
    },
    {
        category: "Manager controls", icon: Eye,
        items: [
            { title: "Live monitoring", description: "Track agent locations and progress in real time.", icon: Eye },
            { title: "Alerts", description: "Notifications for unusual activity or missed targets.", icon: AlertTriangle },
            { title: "Performance scoring", description: "Productivity dashboards per agent and team.", icon: TrendingUp },
            { title: "Geofencing", description: "Define areas where agents are allowed to operate.", icon: MapPin },
        ],
    },
];

export function Features() {
    return (
        <div>
            {/* Hero */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-medium text-brand mb-3">Features</p>
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
                            Everything you need to run revenue collection without leaks.
                        </h1>
                        <p className="mt-5 text-lg text-ink-muted leading-relaxed">
                            Six surfaces, one platform. Each feature exists to remove a specific failure mode of paper-based collection.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link to="/signup"><Button>Request a demo</Button></Link>
                            <Link to="/contact"><Button variant="outline">Talk to sales</Button></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Groups */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
                    {groups.map((g) => (
                        <div key={g.category}>
                            <div className="flex items-center gap-2.5 mb-6">
                                <span className="h-8 w-8 rounded-md bg-brand-soft grid place-items-center">
                                    <g.icon className="h-4 w-4 text-brand" />
                                </span>
                                <h2 className="text-xl font-semibold">{g.category}</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
                                {g.items.map((item) => (
                                    <div key={item.title} className="bg-white p-5">
                                        <item.icon className="h-4 w-4 text-ink-muted" />
                                        <h3 className="mt-3 text-[15px] font-semibold">{item.title}</h3>
                                        <p className="mt-1 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech specs */}
            <section className="border-b border-line bg-bg-subtle">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-2xl mb-10">
                        <h2 className="text-3xl font-semibold tracking-tight">Built on infrastructure you can trust</h2>
                        <p className="mt-3 text-ink-muted">Enterprise-grade reliability, security and integration paths.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "Cloud", items: ["AWS / Azure", "Auto-scaling", "99.9% uptime SLA", "Global CDN"] },
                            { title: "Security", items: ["End-to-end encryption", "SOC 2 in progress", "Regular pen-tests", "MFA"] },
                            { title: "Performance", items: ["Sub-second responses", "Real-time sync", "Mobile-optimized", "Offline-first"] },
                            { title: "Integration", items: ["REST APIs", "Webhooks", "Bank connectors", "Custom SDKs"] },
                        ].map((s) => (
                            <div key={s.title} className="bg-white border border-line rounded-xl p-5">
                                <h3 className="text-sm font-semibold mb-3">{s.title}</h3>
                                <ul className="space-y-2">
                                    {s.items.map((i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-ink-muted">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use cases */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-2xl mb-10">
                        <h2 className="text-3xl font-semibold tracking-tight">Who it's for</h2>
                        <p className="mt-3 text-ink-muted">ProCollector adapts to the way each sector collects revenue.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "Government councils", description: "Tax, license fees and service charges with transparency.", icon: Building2 },
                            { title: "Commercial banks", description: "Loan collection with real-time tracking and reconciliation.", icon: Wallet },
                            { title: "Microfinance", description: "Field operations and cost-efficient mobile collection.", icon: Users },
                            { title: "Property managers", description: "Rent collection and tenant management.", icon: HomeIcon },
                        ].map((u) => (
                            <div key={u.title} className="border border-line rounded-xl p-5">
                                <u.icon className="h-5 w-5 text-brand" />
                                <h3 className="mt-4 text-base font-semibold">{u.title}</h3>
                                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{u.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">See it on your own data.</h2>
                    <p className="mt-3 text-ink-muted">A 30-minute demo with a sample of your collection workflow.</p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <Link to="/signup"><Button size="lg">Request a demo</Button></Link>
                        <Link to="/contact"><Button size="lg" variant="outline">Schedule a call</Button></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
