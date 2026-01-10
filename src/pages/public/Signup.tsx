import { Button } from "../../components/ui/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { isProfessionalEmail } from "../../lib/emailValidation";

export function Signup() {
    const [subdomain, setSubdomain] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoading } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Check if this is a demo access request
    const demoRole = searchParams.get('demo');
    const demoOrg = searchParams.get('org') || 'Demo Organization';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validate inputs
        if (!subdomain.trim()) {
            setError("Organization name is required");
            return;
        }
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!isProfessionalEmail(email)) {
            setError("Please use a professional organizational email address (not Gmail, Yahoo, or temporary emails)");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call to create demo request
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production, this would call an API to create a demo request
            // For now, we'll simulate sending credentials via email
            setSuccess(`Demo request submitted successfully!
                        Demo credentials have been sent to ${email}.
                        Please check your email and follow the instructions to access your demo portal.`);

            // Clear form
            setSubdomain("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="min-h-screen bg-brand-slate-50 flex flex-col md:flex-row">
            {/* Left side: branding */}
            <div className="bg-brand-dark md:w-1/2 p-12 flex flex-col justify-between text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-brand-green rounded-full blur-[200px]"></div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-green font-bold text-white shadow-sm px-0">P</div>
                        <span className="text-2xl font-bold tracking-tight">ProCollector</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl md:text-5xl font-bold italic leading-tight mb-8">
                        Professional Demo <br />
                        <span className="text-brand-green">Access</span>
                    </h2>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="h-5 w-5 text-brand-green" />
                            <span className="font-bold text-sm">Verified Organizations Only</span>
                        </div>
                        <p className="text-brand-slate-400 italic mb-4 leading-relaxed text-sm">
                            Demo access is available exclusively to verified organizations using professional email addresses.
                        </p>
                        <div className="space-y-2 text-xs text-brand-slate-500">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3" />
                                <span>No Gmail, Yahoo, or temporary emails</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3" />
                                <span>Organizational email required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3" />
                                <span>Credentials sent via email</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-brand-slate-500 font-medium">
                    © {new Date().getFullYear()} ProCollector. Security Grade: Enterprise SSL.
                </div>
            </div>

            {/* Right side: form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-12">
                    <div className="space-y-4">
                        <div>
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-slate-500 hover:text-brand-green transition-colors">
                                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Website
                            </Link>
                        </div>
                        <h3 className="text-3xl font-extrabold text-brand-dark">Request Demo Access</h3>
                        <p className="text-brand-slate-500 font-medium">Please provide your organizational details to receive demo credentials.</p>
                    </div>

                    {success ? (
                        <div className="p-6 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="h-6 w-6 text-brand-green" />
                                <h4 className="font-bold text-brand-green">Demo Request Submitted!</h4>
                            </div>
                            <p className="text-sm text-brand-dark/70 leading-relaxed">
                                {success}
                            </p>
                            <div className="mt-4 space-y-2 text-xs text-brand-dark/50">
                                <p>• Check your spam folder if you don't see the email</p>
                                <p>• Demo credentials are valid for 7 days</p>
                                <p>• Contact support if you need assistance</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Organization Name</label>
                                        <input
                                            type="text"
                                            value={subdomain}
                                            onChange={(e) => setSubdomain(e.target.value)}
                                            className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                            placeholder="Your Organization Name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Professional Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                                placeholder="admin@your-organization.gov"
                                                required
                                            />
                                            {email && (
                                                <div className="absolute right-0 top-3">
                                                    {isProfessionalEmail(email) ? (
                                                        <CheckCircle className="h-5 w-5 text-brand-green" />
                                                    ) : (
                                                        <AlertCircle className="h-5 w-5 text-rose-500" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-brand-slate-500">
                                            Must be a professional organizational email address
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                            placeholder="Create a secure password"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                            placeholder="Confirm your password"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm font-medium text-red-800">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-4 pt-10">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 text-lg shadow-sm"
                                    >
                                        {isSubmitting ? "Processing..." : "Request Demo Access"}
                                    </Button>
                                    <p className="text-center text-sm text-brand-slate-400 font-medium">
                                        Demo credentials will be emailed to you within 24 hours
                                    </p>
                                </div>
                            </form>

                            <div className="border-t border-brand-slate-50 pt-8">
                                <h4 className="text-sm font-bold text-brand-dark/60 uppercase tracking-widest mb-4">Already Have Demo Credentials?</h4>
                                <Link to="/login">
                                    <Button variant="outline" className="w-full h-12">
                                        Sign In to Demo Portal
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}

                    <div className="pt-20 border-t border-brand-slate-50 flex items-center justify-center gap-3 grayscale opacity-30">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-xs font-bold tracking-widest uppercase">Verified Secure</span>
                    </div>
                </div>
            </div>
        </div>
    );
}