import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, Download, Eye, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Collector', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.get<any>('/admin/users');
      
      if (result.success && result.data) {
        const data = result.data as any;
        const transformed = (data.users || data || []).map((user: any) => ({
          id: user.id || user._id || Math.random(),
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
          email: user.email || 'No email',
          role: user.role || 'Collector',
          status: user.status === 'active' || user.isActive ? 'Active' : 'Inactive'
        }));
        setUsers(transformed);
      } else {
        setUsers([]);
        setError(result.error || 'Failed to load users');
      }
    } catch (err) {
      console.error('Fetch users error:', err);
      setUsers([]);
      setError('Network error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.post('/admin/users', newUser);
      
      if (result.success) {
        setShowAddUser(false);
        setNewUser({ name: '', email: '', role: 'Collector', password: '' });
        fetchUsers(); // Refresh list
      } else {
        alert(result.error || 'Failed to add user');
      }
    } catch (err) {
      console.error('Add user error:', err);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser}>
              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="collector">Collector</option>
                    <option value="manager">Manager</option>
                    <option value="organization">Organization Admin</option>
                    <option value="admin">System Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    minLength={6}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-brand-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-400 focus:border-brand-slate-400 text-sm bg-white text-brand-dark placeholder:text-brand-slate-400"
                />
                <Search className="w-5 h-5 text-brand-slate-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-dark mx-auto mb-2" />
                  <p className="text-sm text-brand-dark/60">Loading users...</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <AlertCircle className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                  <p className="text-sm text-rose-600 mb-4">{error}</p>
                  <Button onClick={fetchUsers} variant="outline" size="sm">Retry</Button>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-brand-dark/40">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-brand-slate-100 text-brand-slate-700' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-brand-slate-600 hover:text-brand-slate-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
