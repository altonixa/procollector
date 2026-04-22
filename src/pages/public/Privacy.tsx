import { ShieldCheck, Eye, Database, Lock } from "lucide-react";

const sections = [
    {
        icon: Database,
        title: "Data we collect",
        body: "We collect organisational identifiers, user account data (name, work email, role), transaction records you generate inside the platform, GPS locations of recorded collections, and standard device/log data needed to operate the service.",
    },
    {
        icon: Eye,
        title: "How we use it",
        body: "Your data is used to deliver the platform — recording transactions, reconciling deposits, monitoring agents, and generating reports. We do not sell or rent your data, and we don't use it to train models.",
    },
    {
        icon: Lock,
        title: "How we protect it",
        body: "Data is encrypted in transit and at rest. Tenant data is isolated per organisation. Access is gated by role-based permissions and audited. We follow industry best practices for backups and disaster recovery.",
    },
    {
        icon: ShieldCheck,
        title: "Your rights",
        body: "You can request export or deletion of personal data at any time. Organisation administrators control retention policies for their own tenant. Contact privacy@procollector.com for any request.",
    },
];

export function Privacy() {
    return (
        <div>
            <section className="border-b border-line">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <p className="text-xs font-medium text-brand mb-3">Legal</p>
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Privacy policy</h1>
                    <p className="mt-3 text-sm text-ink-faint">Effective December 20, 2025</p>
                    <p className="mt-6 text-ink-muted leading-relaxed">
                        This policy explains what data ProCollector collects, how we use it, and the rights you have over it.
                    </p>
                </div>
            </section>
            <section>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
                    {sections.map((s) => (
                        <div key={s.title}>
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="h-7 w-7 rounded-md bg-brand-soft grid place-items-center">
                                    <s.icon className="h-3.5 w-3.5 text-brand" />
                                </span>
                                <h2 className="text-lg font-semibold">{s.title}</h2>
                            </div>
                            <p className="text-ink-muted leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
