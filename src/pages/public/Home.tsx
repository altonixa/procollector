import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, BarChart3, MapPin, Banknote, Building2, Users, Smartphone, FileCheck2 } from "lucide-react";

export function Home() {
    return (
        <div>
            {/* Hero */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-muted bg-bg-subtle border border-line rounded-full px-2.5 py-1 mb-6">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            Live across Africa
                        </span>
                        <h1 className="text-[40px] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.05]">
                            Revenue collection,<br />
                            <span className="text-ink-muted">accounted for to the last coin.</span>
                        </h1>
                        <p className="mt-6 text-lg text-ink-muted max-w-2xl leading-relaxed">
                            ProCollector is a multi-tenant collection platform for governments, councils, banks and unions. Track every transaction from the field to the bank in real time.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link to="/signup">
                                <Button size="lg" className="group">
                                    Request a demo
                                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline">Talk to sales</Button>
                            </Link>
                        </div>
                        <p className="mt-6 text-xs text-ink-faint">No credit card required · Setup in under a week</p>
                    </div>
                </div>
            </section>

            {/* Logo strip */}
            <section className="border-b border-line bg-bg-subtle">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <p className="text-[11px] font-medium text-ink-faint mb-5">Trusted by institutions across the region</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {["City Council", "National Bank", "Market Union", "Transport Co."].map((n) => (
                            <div key={n} className="text-sm font-medium text-ink-muted">{n}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature trio */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-2xl mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Why teams switch to ProCollector</h2>
                        <p className="mt-3 text-ink-muted">Paper receipts and spreadsheets leak revenue. We close the gap with software designed for the field.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
                        {features.map((f) => (
                            <div key={f.title} className="bg-white p-6">
                                <f.icon className="h-5 w-5 text-brand" />
                                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Split: visibility */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">A single view of every transaction.</h2>
                            <p className="mt-4 text-ink-muted leading-relaxed">
                                Watch collections as they happen. Know where every collector is, what they collected, and how it reconciles against bank deposits — without chasing reports.
                            </p>
                            <ul className="mt-6 space-y-3">
                                {["Real-time dashboard", "GPS-tracked field collections", "Tamper-proof digital receipts", "Automated daily reconciliation"].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-[15px] text-ink">
                                        <Check className="h-4 w-4 text-brand flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/features" className="mt-7 inline-flex items-center text-sm font-medium text-brand hover:text-brand-hover">
                                See all features <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        <DashboardMock />
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="border-b border-line bg-bg-subtle">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-2xl mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">From sign-up to first reconciliation</h2>
                        <p className="mt-3 text-ink-muted">A four-step rollout that fits the workflow your team already runs.</p>
                    </div>
                    <ol className="grid md:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
                        {[
                            { n: "01", t: "Register your org", d: "Create a portal, invite managers, define zones.", icon: Building2 },
                            { n: "02", t: "Onboard collectors", d: "Assign agents to territories or client routes.", icon: Users },
                            { n: "03", t: "Collect in the field", d: "Every receipt is geo-tagged and time-stamped.", icon: Smartphone },
                            { n: "04", t: "Reconcile daily", d: "Match collected funds to bank deposits automatically.", icon: FileCheck2 },
                        ].map((s) => (
                            <li key={s.n} className="bg-white p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-ink-faint">{s.n}</span>
                                    <s.icon className="h-4 w-4 text-ink-faint" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold">{s.t}</h3>
                                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{s.d}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Stop guessing where the money went.</h2>
                    <p className="mt-3 text-ink-muted max-w-xl mx-auto">
                        Join the councils and financial institutions already running their collections on ProCollector.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <Link to="/signup"><Button size="lg">Request a demo</Button></Link>
                        <Link to="/contact"><Button size="lg" variant="outline">Talk to sales</Button></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function DashboardMock() {
    return (
        <div className="rounded-xl border border-line bg-white shadow-fintech overflow-hidden">
            <div className="h-9 border-b border-line bg-bg-subtle flex items-center px-3 gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="ml-3 text-[11px] text-ink-faint font-mono">app.procollector.com/dashboard</span>
            </div>
            <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { l: "Collected today", v: "FCFA 4.82M", d: "+12.4%" },
                        { l: "Active agents", v: "147", d: "+3" },
                        { l: "Reconciled", v: "98.6%", d: "+0.4%" },
                    ].map((k) => (
                        <div key={k.l} className="rounded-lg border border-line p-3">
                            <p className="text-[11px] text-ink-faint">{k.l}</p>
                            <p className="mt-1 text-base font-semibold tabular-nums">{k.v}</p>
                            <p className="mt-0.5 text-[11px] text-brand">{k.d}</p>
                        </div>
                    ))}
                </div>
                <div className="rounded-lg border border-line p-4">
                    <div className="flex items-end gap-1.5 h-32">
                        {[40, 55, 35, 70, 50, 85, 65, 95, 75, 90, 80, 100].map((h, i) => (
                            <div key={i} className="flex-1 rounded-t bg-brand/15" style={{ height: `${h}%` }}>
                                <div className="w-full bg-brand rounded-t" style={{ height: `${h * 0.6}%` }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const features = [
    { title: "Zero revenue leakage", description: "Every franc collected is digitally recorded. Receipts can't be lost, edited, or duplicated.", icon: ShieldCheck },
    { title: "Real-time visibility", description: "See collections, agent activity and locations as they happen — not at the end of the day.", icon: BarChart3 },
    { title: "Multi-tenant by design", description: "From a single council to a bank with thousands of agents, isolation and scale come standard.", icon: Banknote },
    { title: "Geo-anchored receipts", description: "Every transaction carries GPS, timestamp and a digital signature you can verify later.", icon: MapPin },
    { title: "Smart reconciliation", description: "Automated matching against bank deposits and your internal accounting rules.", icon: FileCheck2 },
    { title: "Built for the field", description: "Offline-first mobile app for collectors. Sync when there's signal, work when there isn't.", icon: Smartphone },
];
