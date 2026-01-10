import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
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
  Plus,
  DollarSign,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  CollectorHome,
  CollectionRoutes,
  CollectionHistory,
  ClientManagement,
  CollectorProfile,
  CollectorReports,
  AddClient,
  FieldCollection
} from './';

export default function CollectorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const [notifications] = useState([
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
    { icon: <Plus className="w-5 h-5" />, label: 'Add Client', path: 'add-client' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Record Collection', path: 'collect' },
    { icon: <Map className="w-5 h-5" />, label: 'Collection Routes', path: 'routes' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Collection History', path: 'history' },
    { icon: <Users className="w-5 h-5" />, label: 'Clients', path: 'clients' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports', path: 'reports' },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Profile', path: 'profile' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-900 flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Procollector</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === ''}
                  className={({ isActive }) => `flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-gray-900 text-white'
                    : isMobile
                      ? 'text-gray-700' // No hover effects on mobile
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isMobile
              ? 'text-gray-700 bg-gray-100' // Solid on mobile
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Search - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block relative max-w-md">
                <input
                  type="text"
                  placeholder="Search collections, clients..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm bg-white text-gray-900 placeholder:text-gray-400"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Right: Profile & Notifications */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className={`relative p-2 rounded-lg transition-colors ${isMobile
                ? 'text-gray-600 bg-gray-100' // Solid on mobile
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Today's Collection Summary */}
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
                <Wallet className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-xs font-medium text-gray-500">Today</div>
                  <div className="text-base font-bold text-gray-900">$2,450.00</div>
                </div>
              </div>

              {/* Profile */}
              <Link to="profile" className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 -m-2 transition-colors">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">Collector</p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route index element={<CollectorHome />} />
              <Route path="add-client" element={<AddClient />} />
              <Route path="collect" element={<FieldCollection />} />
              <Route path="routes" element={<CollectionRoutes />} />
              <Route path="history" element={<CollectionHistory />} />
              <Route path="clients" element={<ClientManagement />} />
              <Route path="reports" element={<CollectorReports />} />
              <Route path="profile" element={<CollectorProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
