import { Button } from "../../components/ui/Button";
import { Link, useNavigate  } from "react-router-dom";
import { ShieldCheck, ArrowLeft, User, Users, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
    const [subdomain, setSubdomain] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading, setDemoUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!subdomain.trim()) {
            setError("Organization subdomain is required");
            return;
        }
        if (!email.trim()) {
            setError("Email is required");
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

        // Attempt login
        const success = await login(email, password, subdomain);
        if (success) {
            navigate("/dashboard");
        } else {
            setError("Invalid credentials. Please try again. (Demo: use any credentials)");
        }
    };

    const handleDemoLogin = (role: string, orgName: string) => {
        setDemoUser(orgName, role as any);
        // Navigate to the appropriate demo route
        const demoRoutes: { [key: string]: string } = {
            'admin': '/demo-admin',
            'organization': '/demo-organization',
            'supervisor': '/demo-supervisor',
            'collector': '/demo-collector',
            'client': '/demo-client',
            'auditor': '/demo-auditor'
        };
        navigate(demoRoutes[role] + `?org=${encodeURIComponent(orgName)}`);
    };


    return (
        <div className="min-h-screen bg-brand-slate-50 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-12">
                <div className="space-y-4">
                    <div>
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-slate-500 hover:text-brand-green transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Website
                        </Link>
                    </div>
                    <h3 className="text-3xl font-extrabold text-brand-dark">Sign in</h3>
                    <p className="text-brand-slate-500 font-medium">Please enter your credentials to access your portal.</p>
                </div>

                {/* Demo Quick Access */}
                <div className="border-t border-brand-slate-50 pt-8">
                    <h4 className="text-sm font-bold text-brand-dark/60 uppercase tracking-widest mb-4">Or Try Demo Access</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleDemoLogin('organization', 'Demo Organization')}
                            className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-brand-green" />
                                <span className="text-xs font-bold">Admin</span>
                            </div>
                            <div className="text-xs text-brand-dark/60">Organization Management</div>
                        </button>
                        
                        <button
                            onClick={() => handleDemoLogin('supervisor', 'Demo Organization')}
                            className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Eye className="h-4 w-4 text-brand-green" />
                                <span className="text-xs font-bold">Supervisor</span>
                            </div>
                            <div className="text-xs text-brand-dark/60">Field Monitoring</div>
                        </button>
                        
                        <button
                            onClick={() => handleDemoLogin('collector', 'Demo Organization')}
                            className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <ShoppingCart className="h-4 w-4 text-brand-green" />
                                <span className="text-xs font-bold">Collector</span>
                            </div>
                            <div className="text-xs text-brand-dark/60">Field Collection</div>
                        </button>
                        
                        <button
                            onClick={() => handleDemoLogin('client', 'Demo Organization')}
                            className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-brand-green" />
                                <span className="text-xs font-bold">Client</span>
                            </div>
                            <div className="text-xs text-brand-dark/60">Payment Tracking</div>
                        </button>
                    </div>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Subdomain / Organization</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={subdomain}
                                    onChange={(e) => setSubdomain(e.target.value)}
                                    className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                    placeholder="your-org"
                                    disabled={isLoading}
                                />
                                <span className="absolute right-0 top-3 text-brand-slate-300 font-bold">.procollector.com</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                placeholder="admin@council.gov"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-slate-500">Password</label>
                                <Link to="/forgot-password" className="text-xs font-bold text-brand-green hover:underline">Forgot Password?</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b-2 border-brand-slate-200 focus:border-brand-green py-3 text-lg font-medium focus:outline-none transition-colors"
                                placeholder="••••••••"
                                disabled={isLoading}
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
                            disabled={isLoading}
                            className="w-full h-14 text-lg shadow-lg shadow-brand-green/20"
                        >
                            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
                        </Button>
                        <p className="text-center text-sm text-brand-slate-400 font-medium">
                            Don't have an account? <Link to="/contact" className="text-brand-dark font-bold hover:underline">Contact Sales</Link>
                        </p>
                    </div>
                </form>

                <div className="pt-20 border-t border-brand-slate-50 flex items-center justify-center gap-3 grayscale opacity-30">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">Verified Secure</span>
                </div>
            </div>
        </div>
    );
}
