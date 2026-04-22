import { Button } from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { isProfessionalEmail } from "../../lib/emailValidation";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (!email.trim()) return setError("Email is required");
        if (!isProfessionalEmail(email)) return setError("Please use a professional organisational email");

        setSubmitting(true);
        try {
            await new Promise((r) => setTimeout(r, 1500));
            setSuccess(`Password reset instructions have been sent to ${email}.`);
            setEmail("");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-subtle flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <Link to="/login" className="inline-flex items-center text-sm text-ink-muted hover:text-ink mb-6">
                    <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to sign in
                </Link>

                <div className="bg-white border border-line rounded-xl p-6 sm:p-8 shadow-fintech">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
                        <p className="mt-1 text-sm text-ink-muted">We'll email you a reset link.</p>
                    </div>

                    {success ? (
                        <div className="rounded-lg border border-brand/20 bg-brand-soft p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="h-4 w-4 text-brand" />
                                <h4 className="text-sm font-semibold text-brand">Check your email</h4>
                            </div>
                            <p className="text-sm text-ink-muted">{success}</p>
                            <div className="mt-4">
                                <Button onClick={() => navigate("/login")} className="w-full">Back to sign in</Button>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-ink-muted">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@organization.gov"
                                    className="w-full h-10 px-3 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                                />
                            </div>

                            {error && <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

                            <Button type="submit" disabled={submitting} className="w-full">
                                {submitting ? "Sending…" : "Send reset link"}
                            </Button>
                            <p className="text-center text-xs text-ink-muted">
                                Remembered it? <Link to="/login" className="text-ink font-medium hover:underline">Sign in</Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
