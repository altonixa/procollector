import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, BarChart3, Globe2, Users, Wallet, Building2, Smartphone,
  CreditCard, Eye, MapPin, Clock, AlertTriangle, CheckCircle2, TrendingUp, 
  Database, Zap, Lock, Globe, Smartphone as MobileIcon, Tablet, Monitor
} from "lucide-react";

export function Features() {
    const features = [
        {
            category: "Security & Compliance",
            icon: ShieldCheck,
            color: "from-green-500 to-emerald-600",
            items: [
                {
                    title: "Zero Revenue Leakage",
                    description: "Every franc collected is digitally recorded. No more 'lost' receipt books or discrepancies between field and office.",
                    icon: CreditCard
                },
                {
                    title: "Fraud Prevention",
                    description: "Anti-fraud algorithms detect suspicious activities, late entries, and location mismatches automatically.",
                    icon: AlertTriangle
                },
                {
                    title: "Immutable Audit Trail",
                    description: "All transactions are cryptographically hashed and stored in an immutable ledger for compliance.",
                    icon: Lock
                },
                {
                    title: "Role-Based Access Control",
                    description: "Granular permissions ensure users only access data relevant to their role and responsibilities.",
                    icon: Users
                }
            ]
        },
        {
            category: "Real-time Visibility",
            icon: Eye,
            color: "from-blue-500 to-cyan-600",
            items: [
                {
                    title: "Live Dashboard",
                    description: "Watch collections happen live on your dashboard. Monitor agent performance and location instantly.",
                    icon: Monitor
                },
                {
                    title: "GPS-tracked Collections",
                    description: "Every collection is geotagged with precise location data for complete field visibility.",
                    icon: MapPin
                },
                {
                    title: "Instant Reconciliation",
                    description: "Automated reconciliation and settlement logic tailored to your organization's accounting rules.",
                    icon: Clock
                },
                {
                    title: "Performance Analytics",
                    description: "Advanced analytics and reporting tools to track KPIs and optimize collection strategies.",
                    icon: TrendingUp
                }
            ]
        },
        {
            category: "Multi-Tenant Architecture",
            icon: Building2,
            color: "from-purple-500 to-violet-600",
            items: [
                {
                    title: "Scalable Cloud Platform",
                    description: "Built for scale. Whether you are one council or a bank managing thousands of agents, we handle it securely.",
                    icon: Globe
                },
                {
                    title: "Organization Isolation",
                    description: "Complete data isolation between organizations with enterprise-grade security.",
                    icon: Database
                },
                {
                    title: "Customizable Workflows",
                    description: "Tailor workflows and rules to match your specific organizational processes.",
                    icon: Zap
                },
                {
                    title: "API Integration",
                    description: "Robust APIs for seamless integration with existing banking and government systems.",
                    icon: Globe2
                }
            ]
        },
        {
            category: "Field Agent Experience",
            icon: Smartphone,
            color: "from-orange-500 to-red-600",
            items: [
                {
                    title: "Mobile-First Interface",
                    description: "Intuitive mobile app designed for field agents with minimal training required.",
                    icon: MobileIcon
                },
                {
                    title: "Offline Support",
                    description: "Works seamlessly in areas with poor connectivity, syncing data when connection is restored.",
                    icon: Tablet
                },
                {
                    title: "Digital Receipts",
                    description: "Instant SMS or highly secure printed receipts that verify genuineness for the payer.",
                    icon: CheckCircle2
                },
                {
                    title: "Route Optimization",
                    description: "Smart routing algorithms to optimize collection routes and reduce travel time.",
                    icon: MapPin
                }
            ]
        },
        {
            category: "Client Management",
            icon: Users,
            color: "from-teal-500 to-blue-600",
            items: [
                {
                    title: "Client Registry",
                    description: "Comprehensive client database with payment history, preferences, and communication logs.",
                    icon: Database
                },
                {
                    title: "Payment Tracking",
                    description: "Real-time payment status updates with automated reminders and notifications.",
                    icon: CreditCard
                },
                {
                    title: "Dispute Resolution",
                    description: "Streamlined dispute management with digital evidence and audit trails.",
                    icon: AlertTriangle
                },
                {
                    title: "Multi-Channel Support",
                    description: "Support for various payment methods including mobile money, bank transfers, and cash.",
                    icon: Wallet
                }
            ]
        },
        {
            category: "Managery Control",
            icon: Eye,
            color: "from-indigo-500 to-purple-600",
            items: [
                {
                    title: "Real-time Monitoring",
                    description: "Live tracking of agent locations, collection progress, and performance metrics.",
                    icon: Eye
                },
                {
                    title: "Alert System",
                    description: "Automated alerts for unusual activities, missed targets, or compliance violations.",
                    icon: AlertTriangle
                },
                {
                    title: "Performance Management",
                    description: "Comprehensive performance dashboards with agent scoring and productivity analysis.",
                    icon: BarChart3
                },
                {
                    title: "Geofencing",
                    description: "Virtual boundaries to ensure agents operate within designated areas.",
                    icon: MapPin
                }
            ]
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-brand-dark to-brand-dustGold">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-brand-green mr-2 animate-pulse"></span>
                        Enterprise-Grade Features
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                        Built for <span className="text-brand-green">Scale</span> & <span className="text-brand-green">Security</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-white/80 mb-12 leading-relaxed">
                        Every feature designed to eliminate revenue leakage, enhance transparency, and empower your team with real-time insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button size="lg" className="h-14 px-10 text-base font-black uppercase tracking-widest shadow-2xl shadow-brand-green/20 group">
                                Request Demo
                                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button size="lg" variant="outline" className="h-14 px-10 text-base font-black uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white hover:text-brand-dark">
                                Talk to Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((category, index) => (
                            <div key={index} className="space-y-6">
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg shadow-brand-green/20`}>
                                    <category.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-brand-dark uppercase tracking-tight">{category.category}</h3>
                                <div className="space-y-4">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-start gap-4 p-4 rounded-xl border border-brand-slate-100 hover:shadow-md transition-shadow">
                                            <div className="h-10 w-10 rounded-lg bg-brand-slate-50 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="h-5 w-5 text-brand-dark" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark mb-2">{item.title}</h4>
                                                <p className="text-sm text-brand-slate-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Specifications */}
            <section className="py-24 bg-brand-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">Technical Excellence</h2>
                        <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
                            Built with enterprise-grade technologies to ensure reliability, security, and scalability.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Cloud Infrastructure",
                                items: ["AWS/Azure Deployment", "Auto-scaling", "99.9% Uptime SLA", "Global CDN"]
                            },
                            {
                                title: "Security Standards",
                                items: ["End-to-End Encryption", "SOC 2 Compliance", "Regular Penetration Testing", "Multi-factor Authentication"]
                            },
                            {
                                title: "Performance",
                                items: ["Sub-second Response Times", "Real-time Data Sync", "Optimized Mobile Experience", "Offline-first Design"]
                            },
                            {
                                title: "Integration",
                                items: ["RESTful APIs", "Webhook Support", "Banking System Integration", "Custom SDKs"]
                            }
                        ].map((spec, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-brand-slate-100">
                                <h3 className="text-xl font-bold text-brand-dark mb-6">{spec.title}</h3>
                                <ul className="space-y-3">
                                    {spec.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-center gap-3 text-sm text-brand-slate-600">
                                            <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">Who Benefits?</h2>
                        <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
                            ProCollector transforms revenue collection for organizations of all sizes across multiple sectors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Government Councils",
                                description: "Streamline tax collection, license fees, and service charges with complete transparency.",
                                icon: Building2,
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                title: "Commercial Banks",
                                description: "Enhance loan collection processes with real-time tracking and automated reconciliation.",
                                icon: Wallet,
                                color: "from-green-500 to-emerald-600"
                            },
                            {
                                title: "Microfinance Institutions",
                                description: "Optimize field operations and reduce collection costs with mobile-first technology.",
                                icon: Users,
                                color: "from-purple-500 to-violet-600"
                            },
                            {
                                title: "Property Management",
                                description: "Simplify rent collection and tenant management with automated workflows.",
                                icon: Home,
                                color: "from-orange-500 to-red-600"
                            }
                        ].map((useCase, index) => (
                            <div key={index} className="text-center space-y-6">
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mx-auto shadow-lg`}>
                                    <useCase.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark">{useCase.title}</h3>
                                <p className="text-sm text-brand-slate-600 leading-relaxed">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand-green">
                <div className="max-w-4xl mx-auto px-4 text-center text-brand-dark">
                    <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Ready to Transform Your Collections?</h2>
                    <p className="text-brand-dark/80 text-lg mb-10 max-w-2xl mx-auto font-bold leading-relaxed">
                        Join the organizations that have already eliminated revenue leakage and gained complete transparency.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button size="lg" variant="secondary" className="h-14 px-10 shadow-xl">
                                Get Started Now
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button size="lg" variant="outline" className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white h-14 px-10">
                                Schedule Consultation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Simple Home icon component
const Home = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
