import { Button } from "../../components/ui/Button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export function Contact() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div>
            <section className="border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Info */}
                        <div>
                            <p className="text-xs font-medium text-brand mb-3">Contact</p>
                            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
                                Let's talk about your collections.
                            </h1>
                            <p className="mt-5 text-lg text-ink-muted leading-relaxed">
                                Tell us a bit about your organisation and what you're trying to fix. We'll come back within one business day.
                            </p>

                            <div className="mt-10 space-y-5">
                                {[
                                    { icon: Mail, label: "Email", value: "solutions@procollector.com" },
                                    { icon: Phone, label: "Phone", value: "+237 672 09 2003" },
                                    { icon: MapPin, label: "Office", value: "Yaoundé, Chapel Obili, Cameroon" },
                                ].map((c) => (
                                    <div key={c.label} className="flex items-start gap-3">
                                        <span className="h-9 w-9 rounded-lg bg-bg-subtle border border-line grid place-items-center flex-shrink-0">
                                            <c.icon className="h-4 w-4 text-ink-muted" />
                                        </span>
                                        <div>
                                            <p className="text-xs text-ink-faint">{c.label}</p>
                                            <p className="text-sm font-medium text-ink">{c.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-5 rounded-xl border border-line bg-bg-subtle">
                                <h4 className="text-sm font-semibold">Already a customer?</h4>
                                <p className="mt-1 text-sm text-ink-muted">Use our support portal for faster turnaround.</p>
                                <Button variant="outline" size="sm" className="mt-4">Go to support</Button>
                            </div>
                        </div>

                        {/* Form */}
                        <div>
                            <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
                                {submitted ? (
                                    <div className="py-10 text-center">
                                        <h3 className="text-lg font-semibold">Thanks — we got it.</h3>
                                        <p className="mt-2 text-sm text-ink-muted">We'll reply within one business day.</p>
                                    </div>
                                ) : (
                                    <form
                                        className="space-y-5"
                                        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field label="First name" placeholder="John" />
                                            <Field label="Last name" placeholder="Doe" />
                                        </div>
                                        <Field label="Work email" type="email" placeholder="john@council.gov" />
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-ink-muted">Organization type</label>
                                            <select className="w-full h-10 px-3 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand">
                                                <option>Government council</option>
                                                <option>Commercial bank</option>
                                                <option>Microfinance</option>
                                                <option>Property manager</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-ink-muted">How can we help?</label>
                                            <textarea rows={4} placeholder="Tell us a bit about what you're trying to do..." className="w-full px-3 py-2 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" />
                                        </div>
                                        <Button type="submit" className="w-full">Send message</Button>
                                        <p className="text-xs text-ink-faint text-center">By submitting, you agree to our privacy policy.</p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink-muted">{label}</label>
            <input
                {...props}
                className="w-full h-10 px-3 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
        </div>
    );
}
