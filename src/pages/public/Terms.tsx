import { Scale, Lock, Shield, FileText } from "lucide-react";

const sections = [
    {
        icon: Scale,
        title: "1. Agreement to terms",
        body: "By accessing or using ProCollector, you agree to these terms on behalf of your organisation. If you do not agree, you may not use the service.",
    },
    {
        icon: FileText,
        title: "2. Use of the service",
        body: "You may use ProCollector only for lawful revenue collection activities, in accordance with applicable laws and the configuration of your tenant. You are responsible for the actions taken by users you authorise.",
    },
    {
        icon: Lock,
        title: "3. Data & confidentiality",
        body: "You retain ownership of all data your organisation submits. We process it on your behalf to deliver the service. We treat tenant data as confidential and apply technical and organisational safeguards to protect it.",
    },
    {
        icon: Shield,
        title: "4. Liability & service availability",
        body: "The service is provided on an 'as is' basis with the SLA included in your plan. ProCollector is not liable for indirect or consequential damages arising from use of the platform beyond the limits set out in your contract.",
    },
];

export function Terms() {
    return (
        <div>
            <section className="border-b border-line">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <p className="text-xs font-medium text-brand mb-3">Legal</p>
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Terms of service</h1>
                    <p className="mt-3 text-sm text-ink-faint">Effective December 20, 2025</p>
                    <p className="mt-6 text-ink-muted leading-relaxed">
                        These terms govern access to and use of ProCollector by your organisation.
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
