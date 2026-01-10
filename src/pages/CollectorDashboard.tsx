import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  MapPin,
  AlertCircle,
  BarChart3,
  LogOut,
  Home,
  Wifi,
  WifiOff,
  Search,
  Bell,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function CollectorDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOnline] = useState(true);
  const [notifications] = useState([
    { id: 1, message: 'New client assigned', read: false },
    { id: 2, message: 'Collection deadline approaching', read: true },
    { id: 3, message: 'System maintenance scheduled', read: false }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '' },
    { icon: <Users className="w-5 h-5" />, label: 'Clients', path: 'clients' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Field Operations', path: 'operations' },
    { icon: <AlertCircle className="w-5 h-5" />, label: 'Error Box', path: 'errors' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Performance', path: 'performance' },
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
              <div className="flex items-center space-x-2 text-sm">
                {isOnline ? (
                  <>
                    <Wifi className="w-5 h-5 text-green-600" />
                    <span className="text-green-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">Offline</span>
                  </>
                )}
              </div>
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-6 h-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Routes>
            <Route path="" element={<CollectorHome />} />
            <Route path="clients" element={<ClientManagement />} />
            <Route path="operations" element={<FieldOperations />} />
            <Route path="errors" element={<ErrorBox />} />
            <Route path="performance" element={<Performance />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function CollectorHome() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Collector Dashboard</h1>
        <div className="flex items-center space-x-2 text-green-600">
          <Wifi className="w-5 h-5" />
          <span>Online</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Today's Collections</h3>
          <p className="text-3xl font-bold text-blue-600">$2,500</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Active Clients</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Pending Collections</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
        </div>
      </div>
    </div>
  );
}

function ClientManagement() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <UserPlus className="w-5 h-5" />
          <span>Add Client</span>
        </button>
      </div>
      {/* Add client management content here */}
    </div>
  );
}

function FieldOperations() {
  return <h1 className="text-2xl font-bold">Field Operations</h1>;
}

function ErrorBox() {
  return <h1 className="text-2xl font-bold">Error Box</h1>;
}

function Performance() {
  return <h1 className="text-2xl font-bold">Performance Metrics</h1>;
}

export default CollectorDashboard;