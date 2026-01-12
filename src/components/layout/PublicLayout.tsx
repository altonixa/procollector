import { Button } from "../ui/Button";
import { Link, Outlet, NavLink } from "react-router-dom";
import { Menu, X, Shield, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { DemoAccessModal } from "./DemoAccessModal";
import { useNavigate } from "react-router-dom";

export function PublicLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDemoModal, setShowDemoModal] = useState(false);
    const navigate = useNavigate();

    const handleDemoSubmit = (orgName: string) => {
        setIsMobileMenuOpen(false);
        navigate(`/demo-portals?org=${encodeURIComponent(orgName)}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-brand-dustGold font-sans text-brand-dark overflow-x-hidden">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-brand-dark/10 bg-brand-green shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img
                                src="/favicon.jpg"
                                alt="Logo"
                                className="h-12 w-12 rounded-2xl shadow-xl shadow-black/10 border-2 border-white/20"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                                <NavLink
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className={({ isActive }) => cn(
                                        "text-sm font-black uppercase tracking-widest transition-colors hover:text-white/70",
                                        isActive ? "text-white border-b-2 border-white" : "text-white/80"
                                    )}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            
                            <Link to="/login">
                                <Button variant="ghost" className="font-black text-white hover:bg-white/10">Log in</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="secondary" className="shadow-lg shadow-black/20 font-black bg-brand-dustGold text-brand-dark hover:bg-brand-dustGold/90">Get Started</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-brand-dark/10 bg-brand-green p-6 space-y-6 animate-in slide-in-from-top duration-300 shadow-xl">
                        <div className="flex flex-col gap-4">
                            {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-black uppercase text-white hover:text-brand-dustGold transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setShowDemoModal(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-lg font-black uppercase text-brand-dustGold hover:text-brand-dustGold/80 transition-colors flex items-center gap-2"
                            >
                                <Play className="h-5 w-5" />
                                Try Demo
                            </button>
                        </div>
                        <div className="pt-6 flex flex-col gap-3 border-t border-white/10">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full h-12 border-white text-white hover:bg-white/10 font-black">Log in</Button>
                            </Link>
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="secondary" className="w-full h-12 font-black bg-brand-dustGold text-brand-dark hover:bg-brand-dustGold/90">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-1 bg-brand-dustGold">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-brand-green text-brand-dark pt-24 pb-12 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/favicon.jpg"
                                    alt="Logo"
                                    className="h-14 w-14 rounded-2xl shadow-lg border border-white/20"
                                />
                            </div>
                            <p className="text-white/70 leading-relaxed font-bold">
                                Building the digital infrastructure for a more transparent and accountable Africa.
                            </p>
                            <div className="flex items-center gap-4 opacity-70">
                                <Shield className="h-5 w-5 text-white" />
                                <span className="text-[10px] font-black tracking-widest uppercase text-white">Certified Security</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-white italic">Platform</h3>
                            <ul className="space-y-4 text-white/70 font-bold">
                                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-white italic">Company</h3>
                            <ul className="space-y-4 text-white/70 font-bold">
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-white italic">Newsletter</h3>
                            <p className="text-xs text-white/60 font-bold leading-relaxed">
                                Get updates on revenue collection best practices and platform news.
                            </p>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Email" className="bg-white/5 border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-white/20 text-white placeholder:text-white/30" />
                                <Button size="sm" variant="secondary" className="px-3 border-none shadow-md bg-brand-dustGold text-brand-dark">Join</Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <p className="text-sm text-white/60 font-bold tracking-tight">
                                © {new Date().getFullYear()} ProCollector. All rights reserved.
                            </p>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                                Powered by Altonixa Group Ltd.
                            </p>
                        </div>
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/60">
                            <a href="#" className="hover:text-white">Status</a>
                            <Link to="/terms" className="hover:text-white">Terms</Link>
                            <Link to="/privacy" className="hover:text-white">Privacy</Link>
                            <a href="#" className="hover:text-white">Legal</a>
                        </div>
                    </div>
                </div>
            </footer>

            <DemoAccessModal
                isOpen={showDemoModal}
                onClose={() => setShowDemoModal(false)}
                onSubmit={handleDemoSubmit}
            />
        </div>
    );
}
