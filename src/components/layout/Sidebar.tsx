import {
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    FileText,
    Building2,
    ChevronLeft,
    ChevronRight,
    PiggyBank,
    Wallet,
    Eye,
    Bus,
    Home,
    Package,
    Activity,
    TrendingUp,
    MapPin,
    Navigation,
    Clock,
    User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { config } from '../../lib/config';

interface SidebarProps {
    className?: string;
}

const getAdminNavItems = () => [
    { icon: Building2, label: 'System Admin', to: config.getAdminPath() },
    { icon: Users, label: 'Organizations', to: config.getAdminPath('organizations') },
    { icon: FileText, label: 'Collections', to: config.getAdminPath('collections') },
    { icon: PiggyBank, label: 'CSV Import', to: config.getAdminPath('csv-import') },
    { icon: Users, label: 'Users', to: config.getAdminPath('users') },
    { icon: Activity, label: 'Errors', to: config.getAdminPath('errors') },
    { icon: TrendingUp, label: 'Reports', to: config.getAdminPath('reports') },
    { icon: Settings, label: 'Settings', to: config.getAdminPath('settings') },
];

const navItemsMap = {
    admin: getAdminNavItems(),
    organization: [
        { icon: LayoutDashboard, label: 'Org Dashboard', to: '/organization' },
        { icon: Building2, label: 'Branches', to: '/organization/branches' },
        { icon: Bus, label: 'Transport', to: '/organization/transport' },
        { icon: Home, label: 'Hostel', to: '/organization/hostel' },
        { icon: Package, label: 'Inventory', to: '/organization/inventory' },
        { icon: FileText, label: 'Reports', to: '/organization/reports' },
        { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
    ],
    manager: [
        { icon: Eye, label: 'Manager', to: '/manager' },
        { icon: LayoutDashboard, label: 'Organization', to: '/organization' },
        { icon: Users, label: 'Collectors', to: '/manager/collectors' },
        { icon: Users, label: 'Agents', to: '/manager/agents' },
        { icon: Activity, label: 'Monitor', to: '/manager/monitoring' },
        { icon: Bus, label: 'Transport', to: '/organization/transport' },
        { icon: Home, label: 'Hostel', to: '/organization/hostel' },
        { icon: Package, label: 'Inventory', to: '/organization/inventory' },
        { icon: FileText, label: 'Reports', to: '/organization/reports' },
        { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
    ],
    collector: [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/collector' },
        { icon: Users, label: 'Add Client', to: '/collector/add-client' },
        { icon: MapPin, label: 'Field Collection', to: '/collector/collect' },
        { icon: Navigation, label: 'Routes', to: '/collector/routes' },
        { icon: Clock, label: 'History', to: '/collector/history' },
        { icon: Users, label: 'Clients', to: '/collector/clients' },
        { icon: FileText, label: 'Reports', to: '/collector/reports' },
        { icon: User, label: 'Profile', to: '/collector/profile' },
        { icon: PiggyBank, label: 'Deposits', to: '/collector/deposits' },
    ],
    client: [
        { icon: Wallet, label: 'Client Portal', to: '/client' },
        { icon: FileText, label: 'Receipt Verification', to: '/client/verify' },
    ],
    auditor: [
        { icon: FileText, label: 'Auditor Portal', to: '/auditor' },
    ],
};


export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuth();
    const navItems = navItemsMap[user?.role as keyof typeof navItemsMap] || [];

    return (
        <div className={cn(
            "relative flex flex-col h-full bg-white border-r border-gray-300 transition-all duration-300 z-20 overflow-hidden",
            collapsed ? "w-16" : "w-64",
            className
        )}>
            {/* Logo Area */}
            <div className="flex items-center h-14 px-4 border-b border-gray-300 bg-gray-50">
                <Link to="/" className="flex items-center justify-center w-full gap-2">
                    <div className="h-8 w-8 bg-brand-dark flex items-center justify-center">
                        <LayoutDashboard className="h-4 w-4 text-white" />
                    </div>
                    {!collapsed && <span className="text-sm font-semibold text-gray-900">Procollector</span>}
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-3 space-y-1 px-3 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200",
                            isActive
                                ? "bg-black text-white"
                                : "text-gray-700 hover:text-gray-900"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("h-5 w-5 shrink-0 transition-transform", isActive ? "text-white" : "text-brand-slate-500 group-hover:text-brand-dark group-hover:scale-110")} />
                                {!collapsed && <span className={cn("text-sm font-medium", isActive ? "text-white" : "")}>{item.label}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-gray-300 space-y-3">
                {!collapsed && (
                    <div className="px-3 py-2 bg-gray-100 rounded">
                        <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Authenticated</p>
                        <p className="text-sm font-medium text-gray-900 truncate">admin@procollector.com</p>
                    </div>
                )}
                <Link to="/login" className="w-full">
                    <Button variant="ghost" className={cn("w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100", collapsed && "justify-center px-0")}>
                        <LogOut className="h-4 w-4 mr-2 shrink-0" />
                        {!collapsed && <span className="text-sm">Sign Out</span>}
                    </Button>
                </Link>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute top-16 -right-3 h-6 w-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors z-30"
            >
                {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>
        </div>
    );
}
