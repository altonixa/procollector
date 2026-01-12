import { Button } from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft, User, Users, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
    const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading, setDemoUser, user } = useAuth();
    const navigate = useNavigate();

    // Map roles to production routes
    const getProductionRoute = (role: string): string => {
        const productionRoutes: { [key: string]: string } = {
            'organization': '/organization',
            'manager': '/manager',
            'collector': '/collector',
            'client': '/client'
        };
        return productionRoutes[role] || '/dashboard';
    };

    // Demo credentials for each portal
    const demoCredentials: { [key: string]: { email: string; password: string } } = {
        'organization': { email: 'organization@demo.com', password: 'demodemo' },
        'manager': { email: 'manager@demo.com', password: 'demodemo' },
        'collector': { email: 'collector@demo.com', password: 'demodemo' },
        'client': { email: 'client@demo.com', password: 'demodemo' }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate inputs
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

        // Check for demo credentials
        const demoCred = demoCredentials[selectedPortal!];
        if (demoCred && email === demoCred.email && password === demoCred.password) {
            setDemoUser('Demo Organization', selectedPortal as any);
            const productionRoute = getProductionRoute(selectedPortal!);
            navigate(productionRoute + `?org=Demo Organization`);
            return;
        }

        // Attempt login
        const success = await login(email, password, '');
        if (success) {
            // Route to the selected portal
            const productionRoute = getProductionRoute(selectedPortal!);
            navigate(productionRoute);
        } else {
            setError("Invalid credentials. Demo: use [portal]@demo.com / demodemo (e.g., organization@demo.com)");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="space-y-4">
                    <div>
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-slate-500 hover:text-brand-green transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Website
                        </Link>
                    </div>
                    <h3 className="text-3xl font-extrabold text-brand-dark">Sign in</h3>
                    <p className="text-brand-slate-500 font-medium">Choose your portal and enter your credentials.</p>
                </div>

                {!selectedPortal && (
                    <div className="border-t border-brand-slate-50 pt-8">
                        <h4 className="text-sm font-bold text-brand-dark/60 uppercase tracking-widest mb-4">Select Portal</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setSelectedPortal('organization')}
                                className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="h-4 w-4 text-brand-green" />
                                    <span className="text-xs font-bold">Organization</span>
                                </div>
                                <div className="text-xs text-brand-dark/60">Admin Portal</div>
                            </button>

                            <button
                                onClick={() => setSelectedPortal('manager')}
                                className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Eye className="h-4 w-4 text-brand-green" />
                                    <span className="text-xs font-bold">Manager</span>
                                </div>
                                <div className="text-xs text-brand-dark/60">Field Monitoring</div>
                            </button>


                            <button
                                onClick={() => setSelectedPortal('collector')}
                                className="p-4 border border-brand-green/30 rounded-lg hover:bg-brand-green/5 transition-colors text-left"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <ShoppingCart className="h-4 w-4 text-brand-green" />
                                    <span className="text-xs font-bold">Collector</span>
                                </div>
                                <div className="text-xs text-brand-dark/60">Field Collection</div>
                            </button>

                            <button
                                onClick={() => setSelectedPortal('client')}
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
                )}

                <div className="border-t border-brand-slate-50 pt-8">
                    <h4 className="text-sm font-bold text-brand-dark/60 uppercase tracking-widest mb-4">Demo Credentials</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm font-medium text-blue-800 mb-3">Try any of these demo accounts:</p>
                        <div className="space-y-3">
                            {Object.entries(demoCredentials).map(([portal, creds]) => (
                                <div key={portal} className="bg-white/50 rounded p-3 border">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-semibold text-blue-900 capitalize">{portal}</span>
                                        {selectedPortal === portal && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Selected</span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-blue-700">
                                            <strong>Email:</strong> {creds.email}
                                        </p>
                                        <p className="text-xs text-blue-700">
                                            <strong>Password:</strong> {creds.password}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-blue-600 mt-3 italic">
                            All demo accounts use the same password: demodemo
                        </p>
                    </div>
                </div>

                {selectedPortal && (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
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
                            className="w-full h-14 text-lg shadow-sm"
                        >
                            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
                        </Button>
                        <p className="text-center text-sm text-brand-slate-400 font-medium">
                            Don't have an account? <Link to="/contact" className="text-brand-dark font-bold hover:underline">Contact Sales</Link>
                        </p>
                    </div>
                </form>
               )}

               <div className="pt-20 border-t border-brand-slate-50 flex items-center justify-center gap-3 grayscale opacity-30">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">Verified Secure</span>
                </div>
            </div>
        </div>
    );
}
