import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Plus, X, Edit, Trash2, ChevronDown, Shield } from 'lucide-react';
import { AuditorModule } from './modules/AuditorModule';

interface Collector {
  id: string;
  name: string;
  email: string;
  phone: string;
  baseSalary: string | number;
  commissionRate: string | number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
}

export function OrgAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'collectors' | 'clients' | 'rules' | 'auditor'>('overview');
  const [auditorDropdownOpen, setAuditorDropdownOpen] = useState(false);
  const [activeAuditorModule, setActiveAuditorModule] = useState<'audit-portal' | 'audit-logs' | 'compliance'>('audit-portal');
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCollector, setEditingCollector] = useState<Collector | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
  const [clientForm, setClientForm] = useState({ name: '', email: '', phone: '', address: '', status: 'Active' });

  useEffect(() => {
    if (activeTab === 'collectors') {
      fetchCollectors();
    }
    if (activeTab === 'clients') {
      fetchClients();
    }
  }, [activeTab]);

  const fetchCollectors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/users/collectors', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Failed to fetch collectors: Server returned non-JSON response');
        return;
      }

      const data = await response.json();
      if (data.success) {
        setCollectors(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch collectors:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/clients', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setClients(data.data.clients || []);
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = editingCollector 
        ? `/api/v1/users/collectors/${editingCollector.id}` 
        : '/api/v1/users/collectors';
      const method = editingCollector ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
        setEditingCollector(null);
        setIsCreateOpen(false);
        fetchCollectors();
        alert(editingCollector ? 'Collector updated' : 'Collector created');
      } else {
        alert('Failed to save collector');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving collector');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collector: Collector) => {
    setEditingCollector(collector);
    setForm({
      name: collector.name,
      email: collector.email,
      phone: collector.phone,
      baseSalary: String(collector.baseSalary),
      commissionRate: String(collector.commissionRate)
    });
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this collector?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/users/collectors/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchCollectors();
        alert('Collector deleted');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = editingClient
        ? `/api/v1/clients/${editingClient.id}`
        : '/api/v1/clients';
      const method = editingClient ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientForm)
      });

      if (response.ok) {
        setClientForm({ name: '', email: '', phone: '', address: '', status: 'Active' });
        setEditingClient(null);
        setIsCreateOpen(false);
        fetchClients();
        alert(editingClient ? 'Client updated' : 'Client created');
      } else {
        alert('Failed to save client');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving client');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      status: client.status
    });
    setIsCreateOpen(true);
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Delete this client?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/clients/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchClients();
        alert('Client deleted');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const closeForm = () => {
    setIsCreateOpen(false);
    setEditingCollector(null);
    setEditingClient(null);
    setForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
    setClientForm({ name: '', email: '', phone: '', address: '', status: 'Active' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCollector ? 'Edit Collector' : editingClient ? 'Edit Client' : activeTab === 'collectors' ? 'Add Collector' : 'Add Client'}
              </h3>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={editingClient || activeTab === 'clients' ? handleSaveClient : handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={editingClient || activeTab === 'clients' ? clientForm.name : form.name}
                  onChange={(e) => editingClient || activeTab === 'clients' ?
                    setClientForm({ ...clientForm, name: e.target.value }) :
                    setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={editingClient || activeTab === 'clients' ? clientForm.email : form.email}
                  onChange={(e) => editingClient || activeTab === 'clients' ?
                    setClientForm({ ...clientForm, email: e.target.value }) :
                    setForm({ ...form, email: e.target.value })}
                  disabled={!!editingCollector || !!editingClient}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={editingClient || activeTab === 'clients' ? clientForm.phone : form.phone}
                  onChange={(e) => editingClient || activeTab === 'clients' ?
                    setClientForm({ ...clientForm, phone: e.target.value }) :
                    setForm({ ...form, phone: e.target.value })}
                />
              </div>
              {activeTab === 'collectors' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary (FCFA)</label>
                    <input
                      type="number"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      value={form.baseSalary}
                      onChange={(e) => setForm({ ...form, baseSalary: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      max="100"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      value={form.commissionRate}
                      onChange={(e) => setForm({ ...form, commissionRate: e.target.value })}
                    />
                  </div>
                </div>
              )}
              {activeTab === 'clients' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      value={clientForm.address}
                      onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      value={clientForm.status}
                      onChange={(e) => setClientForm({ ...clientForm, status: e.target.value as 'Active' | 'Inactive' })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingCollector || editingClient) ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Admin</h1>
          <p className="text-sm text-gray-600">Manage collectors, clients, and collection rules</p>
        </div>

        {/* Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'collectors', label: 'Collectors' },
              { id: 'clients', label: 'Clients' },
              { id: 'rules', label: 'Rules' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Auditor Tab with Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setActiveTab('auditor');
                  setAuditorDropdownOpen(!auditorDropdownOpen);
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'auditor'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Shield className="h-4 w-4" />
                Auditor
                <ChevronDown className={`h-4 w-4 transition-transform ${auditorDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {auditorDropdownOpen && activeTab === 'auditor' && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setActiveAuditorModule('audit-portal');
                        setAuditorDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                        activeAuditorModule === 'audit-portal' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Audit Portal
                    </button>
                    <button
                      onClick={() => {
                        setActiveAuditorModule('audit-logs');
                        setAuditorDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                        activeAuditorModule === 'audit-logs' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Audit Logs
                    </button>
                    <button
                      onClick={() => {
                        setActiveAuditorModule('compliance');
                        setAuditorDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                        activeAuditorModule === 'compliance' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Compliance Reports
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-600 mb-2">Total Collectors</div>
                    <div className="text-3xl font-bold text-gray-900">{collectors.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-600 mb-2">Total Revenue (Monthly)</div>
                    <div className="text-3xl font-bold text-gray-900">FCFA 45.2M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-600 mb-2">Daily Collections</div>
                    <div className="text-3xl font-bold text-gray-900">FCFA 2.4M</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button
                    onClick={() => setActiveTab('collectors')}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-left"
                  >
                    Manage Collectors
                  </button>
                  <button
                    onClick={() => setActiveTab('clients')}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-left"
                  >
                    Manage Clients
                  </button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* COLLECTORS */}
          {activeTab === 'collectors' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Collectors</h2>
                <button
                  onClick={() => { setForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' }); setEditingCollector(null); setIsCreateOpen(true); }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Collector
                </button>
              </div>

              <div className="space-y-3">
                {collectors.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                      No collectors yet. Create one to get started.
                    </CardContent>
                  </Card>
                ) : (
                  collectors.map((collector) => (
                    <Card key={collector.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{collector.name}</h3>
                            <p className="text-sm text-gray-600">{collector.email}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Salary: FCFA {collector.baseSalary} | Commission: {collector.commissionRate}%
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(collector)}
                              className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-1 text-sm"
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(collector.id)}
                              className="px-3 py-1 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-1 text-sm"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* CLIENTS */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
                <button
                  onClick={() => { setClientForm({ name: '', email: '', phone: '', address: '', status: 'Active' }); setEditingClient(null); setIsCreateOpen(true); }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Client
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-600 mb-2">Total Clients</div>
                    <div className="text-3xl font-bold text-gray-900">{clients.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-600 mb-2">Active Clients</div>
                    <div className="text-3xl font-bold text-green-600">{clients.filter(c => c.status === 'Active').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-600 mb-2">Inactive Clients</div>
                    <div className="text-3xl font-bold text-gray-600">{clients.filter(c => c.status === 'Inactive').length}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                {clients.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                      No clients yet. Create one to get started.
                    </CardContent>
                  </Card>
                ) : (
                  clients.map((client) => (
                    <Card key={client.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{client.name}</h3>
                            <p className="text-sm text-gray-600">{client.email}</p>
                            <p className="text-sm text-gray-600 mt-1">{client.phone} | {client.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {client.status}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditClient(client)}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-1 text-sm"
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClient(client.id)}
                                className="px-3 py-1 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-1 text-sm"
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Collection Rules</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Fee</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Global Transaction Fee (FCFA)</label>
                      <input
                        type="number"
                        defaultValue="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                      Save Changes
                    </button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Collection Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Collection Day</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grace Period (Days)</label>
                      <input
                        type="number"
                        defaultValue="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                      Save Changes
                    </button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Late Payment Fees</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee Amount (FCFA)</label>
                      <input
                        type="number"
                        defaultValue="500"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee Percentage (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue="2.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                      Save Changes
                    </button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Commission Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Monthly Fee (FCFA)</label>
                      <input
                        type="number"
                        defaultValue="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Commission Rate (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                      Save Changes
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* AUDITOR */}
          {activeTab === 'auditor' && (
            <div className="space-y-6">
              {activeAuditorModule === 'audit-portal' && <AuditorModule />}
              {activeAuditorModule === 'audit-logs' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">Audit logs functionality will be implemented here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeAuditorModule === 'compliance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Compliance Reports</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">Compliance reports functionality will be implemented here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Multi-tenant Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default OrgAdminDashboard;
