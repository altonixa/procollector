import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
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

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // TODO: Implement real API call
      setAgents([
        {
          id: '1',
          name: 'Jean Dupont',
          email: 'jean@example.com',
          phone: '+237 677 123 456',
          status: 'active',
          assignedClients: 25,
          todayCollections: 125000,
          performance: 'excellent'
        },
        {
          id: '2',
          name: 'Marie Kline',
          email: 'marie@example.com',
          phone: '+237 699 234 567',
          status: 'active',
          assignedClients: 18,
          todayCollections: 89000,
          performance: 'good'
        }
      ]);
    } catch (error) {
      console.error('Agents fetch error:', error);
    } finally {
      setLoading(false);
    }
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
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Agent
          </Button>
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
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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