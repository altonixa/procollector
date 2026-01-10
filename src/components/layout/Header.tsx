import { Bell, Search, Globe, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <header className="h-16 border-b border-brand-dark/10 flex items-center justify-between px-8 sticky top-0 bg-brand-dark z-10 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for agents, transactions..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-brand-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate-400 focus:border-brand-slate-400 text-brand-dark placeholder:text-brand-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Globe className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <div className="relative">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-2 right-2.5 h-1.5 w-1.5 bg-rose-600 rounded-full border-2 border-brand-dark"></span>
                    </Button>
                </div>
                <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                <div className="flex items-center gap-3 pl-2 relative">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-white leading-none">{user?.name || 'User'}</p>
                        <p className="text-[10px] font-black text-white/50 mt-1 uppercase tracking-tight">{user?.organizationName || 'Organization'}</p>
                    </div>
                    <button
                        onClick={() => setShowLogout(!showLogout)}
                        className="h-9 w-9 rounded-full bg-brand-dark font-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </button>
                    
                    {/* Logout Menu */}
                    {showLogout && (
                        <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg z-50 w-48 py-2">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-sm font-bold text-brand-dark hover:bg-brand-dustGold/10 flex items-center gap-2 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
