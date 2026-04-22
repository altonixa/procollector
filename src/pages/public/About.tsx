import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Target, Eye, Shield, Users2 } from "lucide-react";

const values = [
    { icon: Target, title: "Mission", text: "Eliminate revenue leakage with software you can audit." },
    { icon: Eye, title: "Vision", text: "The default digital collection layer for the African continent." },
    { icon: Shield, title: "Values", text: "Transparency, integrity and careful execution." },
    { icon: Users2, title: "Community", text: "Tools that respect the collectors who use them every day." },
];

export function About() {
    return (
        <div>
            {/* Hero */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-medium text-brand mb-3">About</p>
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
                            We're building the financial transparency layer for institutions that handle public money.
                        </h1>
                        <p className="mt-5 text-lg text-ink-muted leading-relaxed">
                            Started in Yaoundé, ProCollector grew out of watching councils lose millions to manual processes that nobody could verify after the fact.
                        </p>
                    </div>
                </div>
            </section>

            {/* Narrative + values */}
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">The problem we set out to solve</h2>
                            <div className="mt-5 space-y-4 text-ink-muted leading-relaxed">
                                <p>
                                    Millions of FCFA are lost each year in field collections — paper receipts go missing, deposits don't match, agents get blamed for shortfalls they didn't cause.
                                </p>
                                <p>
                                    ProCollector started with a simple question: <span className="text-ink font-medium">what if every transaction was instantly verifiable, by anyone authorised to verify it?</span>
                                </p>
                                <p>
                                    The answer turned into a multi-tenant platform that now serves councils, banks and unions across the region.
                                </p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {values.map((v) => (
                                <div key={v.title} className="border border-line rounded-xl p-5">
                                    <v.icon className="h-4 w-4 text-brand" />
                                    <h4 className="mt-3 text-sm font-semibold">{v.title}</h4>
                                    <p className="mt-1 text-sm text-ink-muted leading-relaxed">{v.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight">Want to work with us?</h2>
                    <p className="mt-3 text-ink-muted max-w-xl mx-auto">
                        We partner with governments and financial institutions ready to modernise how they collect.
                    </p>
                    <div className="mt-7">
                        <Link to="/contact"><Button size="lg">Get in touch</Button></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
