import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Wallet,
  Calendar,
  BarChart3,
  LogOut,
  Search,
  Bell,
  Map,
  Users,
  Settings as SettingsIcon,
  Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  CollectorHome,
  CollectionRoutes,
  CollectionHistory,
  ClientManagement,
  CollectorProfile,
  CollectorReports
} from './';

export default function CollectorDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New collection route assigned', read: false },
    { id: 2, message: 'Payment received confirmation', read: true },
    { id: 3, message: 'Client schedule updated', read: false }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '' },
    { icon: <Map className="w-5 h-5" />, label: 'Collection Routes', path: 'routes' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Collection History', path: 'history' },
    { icon: <Users className="w-5 h-5" />, label: 'Clients', path: 'clients' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports', path: 'reports' },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Profile', path: 'profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">Procollector</span>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <div className="mb-4 px-2">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-red-600 p-2 rounded-lg hover:bg-red-50 transition w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-6 h-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Wallet className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm font-medium">Today's Collections</div>
                  <div className="text-lg font-bold text-blue-600">$2,450.00</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Routes>
            <Route path="" element={<CollectorHome />} />
            <Route path="routes" element={<CollectionRoutes />} />
            <Route path="history" element={<CollectionHistory />} />
            <Route path="clients" element={<ClientManagement />} />
            <Route path="reports" element={<CollectorReports />} />
            <Route path="profile" element={<CollectorProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
