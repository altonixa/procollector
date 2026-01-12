import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Users, Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  assignedClients: number;
  todayCollections: number;
  performance: 'excellent' | 'good' | 'needs_improvement';
}

export function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // Mock data - all data is seeded
      setAgents([
        {
          id: '1',
          name: 'Jean Dupont',
          email: 'jean.dupont@procollector.com',
          phone: '+237 677 123 456',
          status: 'active',
          assignedClients: 25,
          todayCollections: 125000,
          performance: 'excellent'
        },
        {
          id: '2',
          name: 'Marie Kline',
          email: 'marie.kline@procollector.com',
          phone: '+237 699 234 567',
          status: 'active',
          assignedClients: 18,
          todayCollections: 89000,
          performance: 'good'
        },
        {
          id: '3',
          name: 'Sarah Ngono',
          email: 'sarah.ngono@procollector.com',
          phone: '+237 673 456 789',
          status: 'active',
          assignedClients: 32,
          todayCollections: 145000,
          performance: 'excellent'
        },
        {
          id: '4',
          name: 'Pierre Mboh',
          email: 'pierre.mboh@procollector.com',
          phone: '+237 674 567 890',
          status: 'inactive',
          assignedClients: 8,
          todayCollections: 25000,
          performance: 'needs_improvement'
        },
        {
          id: '5',
          name: 'Grace Nkono',
          email: 'grace.nkono@procollector.com',
          phone: '+237 675 678 901',
          status: 'active',
          assignedClients: 15,
          todayCollections: 78000,
          performance: 'good'
        }
      ]);
    } catch (error) {
      console.error('Agents fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAgent = () => {
    setFormData({ name: '', email: '', phone: '', status: 'active' });
    setEditingAgent(null);
    setShowAddModal(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      status: agent.status
    });
    setEditingAgent(agent);
    setShowAddModal(true);
  };

  const handleDeleteAgent = (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter(agent => agent.id !== agentId));
    }
  };

  const handleSaveAgent = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingAgent) {
      // Update existing agent
      setAgents(agents.map(agent =>
        agent.id === editingAgent.id
          ? { ...agent, ...formData }
          : agent
      ));
    } else {
      // Add new agent
      const newAgent: Agent = {
        id: Date.now().toString(),
        ...formData,
        assignedClients: 0,
        todayCollections: 0,
        performance: 'good'
      };
      setAgents([...agents, newAgent]);
    }

    setShowAddModal(false);
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'needs_improvement': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
            <p className="text-gray-600">Manage field collectors and monitor performance</p>
          </div>
          <button onClick={handleAddAgent} className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 text-sm font-medium">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Agent
          </button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Agents List */}
        <div className="space-y-4">
          {filteredAgents.map((agent) => (
            <Card key={agent.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center font-medium text-gray-900">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.email}</p>
                      <p className="text-sm text-gray-600">{agent.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Clients</p>
                      <p className="font-medium text-gray-900">{agent.assignedClients}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Today</p>
                      <p className="font-medium text-gray-900">FCFA {agent.todayCollections.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Performance</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(agent.performance)}`}>
                        {agent.performance.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditAgent(agent)} className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                        <Edit className="w-4 h-4 inline" />
                      </button>
                      <button onClick={() => handleDeleteAgent(agent.id)} className="px-3 py-1 text-sm border border-red-300 rounded text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No agents found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Agent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {editingAgent ? 'Edit Agent' : 'Add New Agent'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter agent name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+237 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex gap-2 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAgent}
                className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700"
              >
                {editingAgent ? 'Update Agent' : 'Add Agent'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Agent Management
          </p>
        </div>
      </footer>
    </div>
  );
}