import { Button } from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Eye, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { config } from "../../lib/config";

const portals = [
    { id: "organization", label: "Organization", desc: "Admin portal", icon: Building2 },
    { id: "manager", label: "Manager", desc: "Field monitoring", icon: Eye },
    { id: "collector", label: "Collector", desc: "Field collection", icon: ShoppingCart },
    { id: "client", label: "Client", desc: "Payment tracking", icon: User },
] as const;

const demoCredentials: Record<string, { email: string; password: string }> = {
    organization: { email: "organization@demo.com", password: "demodemo" },
    manager: { email: "manager@demo.com", password: "demodemo" },
    collector: { email: "collector@demo.com", password: "demodemo" },
    client: { email: "client@demo.com", password: "demodemo" },
};

export function Login() {
    const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showDemo, setShowDemo] = useState(false);
    const { login, isLoading, setDemoUser } = useAuth();
    const navigate = useNavigate();

    const getProductionRoute = (role: string): string => ({
        admin: config.getAdminPath(),
        organization: "/organization",
        manager: "/manager",
        collector: "/collector",
        client: "/client",
    } as Record<string, string>)[role] || "/dashboard";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email.trim()) return setError("Email is required");
        if (!password) return setError("Password is required");
        if (password.length < 6) return setError("Password must be at least 6 characters");

        const demo = demoCredentials[selectedPortal!];
        if (demo && email === demo.email && password === demo.password) {
            setDemoUser("Demo Organization", selectedPortal as any);
            navigate(getProductionRoute(selectedPortal!) + `?org=Demo Organization`);
            return;
        }

        const ok = await login(email, password, "");
        if (ok) navigate(getProductionRoute(selectedPortal!));
        else setError("Invalid credentials. Try a demo account below.");
    };

    return (
        <div className="min-h-screen bg-bg-subtle flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <Link to="/" className="inline-flex items-center text-sm text-ink-muted hover:text-ink mb-6">
                    <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to website
                </Link>

                <div className="bg-white border border-line rounded-xl p-6 sm:p-8 shadow-fintech">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
                        <p className="mt-1 text-sm text-ink-muted">Choose your portal to continue.</p>
                    </div>

                    {/* Portal selector */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                        {portals.map((p) => {
                            const active = selectedPortal === p.id;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setSelectedPortal(p.id)}
                                    className={
                                        "text-left p-3 rounded-lg border transition-colors " +
                                        (active
                                            ? "border-ink bg-bg-subtle"
                                            : "border-line bg-white hover:border-line-strong")
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        <p.icon className={"h-4 w-4 " + (active ? "text-brand" : "text-ink-muted")} />
                                        <span className="text-sm font-medium text-ink">{p.label}</span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-ink-muted">{p.desc}</p>
                                </button>
                            );
                        })}
                    </div>

                    {selectedPortal && (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-ink-muted">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@organization.gov"
                                    disabled={isLoading}
                                    className="w-full h-10 px-3 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-medium text-ink-muted">Password</label>
                                    <Link to="/forgot-password" className="text-xs text-brand hover:text-brand-hover">Forgot?</Link>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    className="w-full h-10 px-3 bg-white border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                                />
                            </div>

                            {error && (
                                <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
                            )}

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Signing in…" : "Sign in"}
                            </Button>

                            <p className="text-center text-xs text-ink-muted">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-ink font-medium hover:underline">Request access</Link>
                            </p>
                        </form>
                    )}

                    {/* Demo credentials */}
                    <div className="mt-6 pt-6 border-t border-line">
                        <button
                            type="button"
                            onClick={() => setShowDemo((s) => !s)}
                            className="text-xs font-medium text-ink-muted hover:text-ink"
                        >
                            {showDemo ? "Hide" : "Show"} demo credentials
                        </button>
                        {showDemo && (
                            <div className="mt-3 rounded-lg border border-line bg-bg-subtle p-3 space-y-2">
                                {Object.entries(demoCredentials).map(([portal, c]) => (
                                    <button
                                        type="button"
                                        key={portal}
                                        onClick={() => {
                                            setSelectedPortal(portal);
                                            setEmail(c.email);
                                            setPassword(c.password);
                                        }}
                                        className="w-full text-left flex items-center justify-between text-xs hover:bg-white rounded-md px-2 py-1.5 transition-colors"
                                    >
                                        <span className="capitalize text-ink font-medium">{portal}</span>
                                        <span className="text-ink-muted font-mono">{c.email}</span>
                                    </button>
                                ))}
                                <p className="text-[11px] text-ink-faint pt-1">Password: <span className="font-mono">demodemo</span></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
