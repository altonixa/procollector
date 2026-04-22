import { Button } from "../ui/Button";
import { Link, Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { DemoAccessModal } from "./DemoAccessModal";
import { useNavigate } from "react-router-dom";

const NAV = [
    { label: "Product", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Company", to: "/about" },
    { label: "Contact", to: "/contact" },
];

function Logo({ light = false }: { light?: boolean }) {
    return (
        <Link to="/" className="flex items-center gap-2 group">
            <span className={cn(
                "h-7 w-7 rounded-md grid place-items-center text-[13px] font-semibold",
                light ? "bg-white text-brand" : "bg-brand text-white"
            )}>
                P
            </span>
            <span className={cn("text-[15px] font-semibold tracking-tight", light ? "text-white" : "text-ink")}>
                ProCollector
            </span>
        </Link>
    );
}

export function PublicLayout() {
    const [open, setOpen] = useState(false);
    const [showDemo, setShowDemo] = useState(false);
    const navigate = useNavigate();

    const handleDemoSubmit = (orgName: string) => {
        setOpen(false);
        navigate(`/demo-portals?org=${encodeURIComponent(orgName)}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-ink">
            {/* Nav */}
            <header className="sticky top-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-14 flex items-center justify-between">
                        <Logo />

                        <nav className="hidden md:flex items-center gap-1">
                            {NAV.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) => cn(
                                        "px-3 py-1.5 rounded-md text-[13.5px] font-medium transition-colors",
                                        isActive ? "text-ink bg-bg-subtle" : "text-ink-muted hover:text-ink"
                                    )}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Sign in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">Request demo</Button>
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2 -mr-2 text-ink"
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle menu"
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {open && (
                    <div className="md:hidden border-t border-line bg-white">
                        <div className="px-4 py-4 space-y-1">
                            {NAV.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className="block px-3 py-2 rounded-md text-sm font-medium text-ink-muted hover:bg-bg-subtle hover:text-ink"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-2 mt-2 border-t border-line flex flex-col gap-2">
                                <Link to="/login" onClick={() => setOpen(false)}>
                                    <Button variant="outline" className="w-full">Sign in</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setOpen(false)}>
                                    <Button className="w-full">Request demo</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-line bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div className="col-span-2 space-y-3">
                            <Logo />
                            <p className="text-sm text-ink-muted max-w-xs leading-relaxed">
                                Digital revenue collection infrastructure for governments, councils, banks and unions.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-ink mb-3">Product</h4>
                            <ul className="space-y-2 text-sm text-ink-muted">
                                <li><Link to="/features" className="hover:text-ink">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-ink">Pricing</Link></li>
                                <li><Link to="/login" className="hover:text-ink">Sign in</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-ink mb-3">Company</h4>
                            <ul className="space-y-2 text-sm text-ink-muted">
                                <li><Link to="/about" className="hover:text-ink">About</Link></li>
                                <li><Link to="/contact" className="hover:text-ink">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-ink mb-3">Legal</h4>
                            <ul className="space-y-2 text-sm text-ink-muted">
                                <li><Link to="/privacy" className="hover:text-ink">Privacy</Link></li>
                                <li><Link to="/terms" className="hover:text-ink">Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-ink-faint">
                            © {new Date().getFullYear()} ProCollector. Powered by Altonixa Group Ltd.
                        </p>
                        <p className="text-xs text-ink-faint">All systems operational</p>
                    </div>
                </div>
            </footer>

            <DemoAccessModal
                isOpen={showDemo}
                onClose={() => setShowDemo(false)}
                onSubmit={handleDemoSubmit}
            />
        </div>
    );
}
