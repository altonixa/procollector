import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const tiers = [
    {
        name: "Growth",
        description: "For cooperatives and small property managers.",
        price: "FCFA 25,000",
        suffix: "/ month",
        features: [
            "Up to 10 agents",
            "Real-time dashboard",
            "Daily reports",
            "Digital receipts via email",
            "Standard security",
            "Email support",
        ],
        cta: "Start with Growth",
        featured: false,
    },
    {
        name: "Enterprise",
        description: "For microfinance and large unions.",
        price: "FCFA 95,000",
        suffix: "/ month",
        features: [
            "Up to 50 agents",
            "Advanced analytics",
            "Custom collection rules",
            "Digital receipts via SMS",
            "GPS tracking & geofencing",
            "Reconciliation tools",
            "Priority 24/7 support",
        ],
        cta: "Start with Enterprise",
        featured: true,
    },
    {
        name: "Government",
        description: "For councils and national agencies.",
        price: "Custom",
        suffix: "",
        features: [
            "Unlimited agents",
            "Multi-tenant child portals",
            "Advanced reconciliation",
            "On-premise deployment option",
            "Dedicated compliance officer",
            "Custom audit logs",
            "Staff training included",
        ],
        cta: "Contact sales",
        featured: false,
    },
];

export function Pricing() {
    return (
        <div>
            {/* Header */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-medium text-brand mb-3">Pricing</p>
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
                            Simple pricing that scales with your team.
                        </h1>
                        <p className="mt-5 text-lg text-ink-muted">
                            Three plans. Every plan includes the core security and reconciliation engine.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tiers */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={
                                    "relative flex flex-col rounded-xl border bg-white p-6 " +
                                    (tier.featured ? "border-ink shadow-premium" : "border-line")
                                }
                            >
                                {tier.featured && (
                                    <span className="absolute -top-2.5 left-6 inline-flex items-center text-[10.5px] font-medium text-white bg-ink px-2 py-0.5 rounded-full">
                                        Most popular
                                    </span>
                                )}
                                <h3 className="text-base font-semibold">{tier.name}</h3>
                                <p className="mt-1 text-sm text-ink-muted">{tier.description}</p>

                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="text-3xl font-semibold tracking-tight">{tier.price}</span>
                                    {tier.suffix && <span className="text-sm text-ink-muted">{tier.suffix}</span>}
                                </div>

                                <ul className="mt-6 flex-1 space-y-2.5">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                                            <Check className="h-4 w-4 text-brand flex-shrink-0 mt-0.5" />
                                            <span className="text-ink-muted">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-7">
                                    <Link to={tier.name === "Government" ? "/contact" : "/signup"}>
                                        <Button variant={tier.featured ? "primary" : "outline"} className="w-full">
                                            {tier.cta}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid sm:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden text-sm">
                        {[
                            { l: "Setup time", v: "Under a week" },
                            { l: "Contract", v: "Monthly or annual" },
                            { l: "Onboarding", v: "Included on Enterprise+" },
                        ].map((m) => (
                            <div key={m.l} className="bg-white p-4">
                                <p className="text-ink-faint text-xs">{m.l}</p>
                                <p className="mt-0.5 font-medium text-ink">{m.v}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom callout */}
            <section>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Need a custom deployment?</h2>
                    <p className="mt-3 text-ink-muted max-w-xl mx-auto">
                        We work with city councils and regional governments on bespoke reconciliation rules and on-prem deployments.
                    </p>
                    <div className="mt-7">
                        <Link to="/contact"><Button size="lg" variant="outline">Contact our government desk</Button></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
