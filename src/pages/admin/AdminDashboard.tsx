import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  Settings as SettingsIcon,
  BarChart3,
  Mail,
  LogOut,
  Search,
  Bell,
  Wallet,
  AlertTriangle,
  Home,
  Globe,
  Building2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHome from './DashboardHome';
import UserManagement from './UserManagement';
import FinancialConfig from './FinancialConfig';
import Reports from './Reports';
import SmtpConfig from './SmtpConfig';
import ErrorManagement from './ErrorManagement';
import AdminSettings from './AdminSettings';
import { GlobalOverview } from './GlobalOverview';
import Organizations from './Organizations';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [notifications] = useState([
    // This will be replaced with real data from API
    { id: 1, message: 'Loading notifications...', read: false },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '' },
    { icon: <Globe className="w-5 h-5" />, label: 'Global Overview', path: 'global' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Organizations', path: 'organizations' },
    { icon: <Users className="w-5 h-5" />, label: 'User Management', path: 'users' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Financial Config', path: 'finance' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports', path: 'reports' },
    { icon: <Mail className="w-5 h-5" />, label: 'SMTP Config', path: 'smtp' },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Error Management', path: 'errors' },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Settings', path: 'settings' },
    { icon: <Users className="w-5 h-5" />, label: 'Profile', path: 'profile' },
  ];

  return (
    <div className="min-h-screen bg-brand-light flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-brand-slate-200 shadow-sm">
        <div className="p-5 border-b border-brand-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-lg bg-brand-dark flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-brand-dark tracking-tight">Procollector</span>
          </div>
        </div>
        <nav className="p-3 mt-2">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 text-brand-slate-600 px-3 py-2 rounded-lg hover:bg-brand-slate-50 hover:text-brand-dark transition-colors text-sm font-medium"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-56 p-4 border-t border-brand-slate-100 bg-white">
          <div className="mb-3 px-2">
            <div className="text-sm font-semibold text-brand-dark">{user?.name || 'Admin'}</div>
            <div className="text-xs text-brand-slate-500 truncate">{user?.email || ''}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-brand-slate-600 px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors w-full text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="bg-white border-b border-brand-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3.5">
            <div className="flex items-center space-x-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full border border-brand-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-400 focus:border-brand-slate-400 text-sm bg-white text-brand-dark placeholder:text-brand-slate-400"
                />
                <Search className="w-4 h-4 text-brand-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-brand-slate-600 hover:text-brand-dark hover:bg-brand-slate-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route path="global" element={<GlobalOverview />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="finance" element={<FinancialConfig />} />
            <Route path="reports" element={<Reports />} />
            <Route path="smtp" element={<SmtpConfig />} />
            <Route path="errors" element={<ErrorManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Profile</h1>
                  <p className="text-sm text-gray-600 mt-1">System administrator information</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-900 font-medium">{user?.name || 'Admin User'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                      <p className="text-gray-900 font-medium">{user?.email || 'admin@example.com'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                      <p className="text-gray-900 font-medium">{user?.role || 'System Administrator'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Organization</label>
                      <p className="text-gray-900 font-medium">{user?.organizationName || 'Procollector System'}</p>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
