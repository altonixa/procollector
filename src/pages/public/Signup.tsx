import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { useState } from "react";
import { isProfessionalEmail } from "../../lib/emailValidation";

export function Signup() {
    const [orgName, setOrgName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (!orgName.trim()) return setError("Organization name is required");
        if (!email.trim()) return setError("Email is required");
        if (!isProfessionalEmail(email)) return setError("Please use a professional email (not Gmail, Yahoo, or temporary mail)");
        if (!password) return setError("Password is required");
        if (password.length < 6) return setError("Password must be at least 6 characters");
        if (password !== confirm) return setError("Passwords do not match");

        setSubmitting(true);
        try {
            await new Promise((r) => setTimeout(r, 1500));
            setSuccess(`Demo request submitted. Credentials will be sent to ${email}.`);
            setOrgName(""); setEmail(""); setPassword(""); setConfirm("");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-subtle flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <Link to="/" className="inline-flex items-center text-sm text-ink-muted hover:text-ink mb-6">
                    <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to website
                </Link>

                <div className="bg-white border border-line rounded-xl p-6 sm:p-8 shadow-fintech">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">Request demo access</h1>
                        <p className="mt-1 text-sm text-ink-muted">Tell us about your organization. We'll email demo credentials.</p>
                    </div>

                    {success ? (
                        <div className="rounded-lg border border-brand/20 bg-brand-soft p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="h-4 w-4 text-brand" />
                                <h4 className="text-sm font-semibold text-brand">Request submitted</h4>
                            </div>
                            <p className="text-sm text-ink-muted">{success}</p>
                            <ul className="mt-3 text-xs text-ink-faint space-y-1">
                                <li>Check spam if you don't see the email.</li>
                                <li>Demo credentials are valid for 7 days.</li>
                            </ul>
                            <div className="mt-4">
                                <Link to="/login"><Button variant="outline" size="sm">Go to sign in</Button></Link>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <Field label="Organization name" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Your organization" />

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-ink-muted">Work email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@your-organization.gov"
                                        className="w-full h-10 pl-3 pr-9 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                                    />
                                    {email && (
                                        <span className="absolute inset-y-0 right-2.5 flex items-center">
                                            {isProfessionalEmail(email) ? (
                                                <CheckCircle className="h-4 w-4 text-brand" />
                                            ) : (
                                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                            )}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-ink-faint">Must be an organisational email — Gmail/Yahoo not accepted.</p>
                            </div>

                            <Field label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
                            <Field label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" />

                            {error && <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

                            <Button type="submit" disabled={submitting} className="w-full">
                                {submitting ? "Submitting…" : "Request demo access"}
                            </Button>
                            <p className="text-center text-xs text-ink-muted">
                                Already have credentials? <Link to="/login" className="text-ink font-medium hover:underline">Sign in</Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
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
