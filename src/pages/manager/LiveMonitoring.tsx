import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, WifiOff, Clock, User, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function LiveMonitoring() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'John Doe',
      location: { lat: 4.0489, lng: 9.7040 },
      status: 'active',
      lastUpdate: '2 minutes ago',
      isOnline: true,
      currentClient: 'ABC Company'
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: { lat: 4.0500, lng: 9.7050 },
      status: 'active',
      lastUpdate: '5 minutes ago',
      isOnline: true,
      currentClient: 'XYZ Store'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      location: { lat: 4.0470, lng: 9.7030 },
      status: 'inactive',
      lastUpdate: '15 minutes ago',
      isOnline: false,
      currentClient: 'Pending'
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    let interval: any;
    if (autoRefresh) {
      interval = setInterval(() => {
        // Simulate real-time updates
        setAgents(prev => prev.map(agent => ({
          ...agent,
          lastUpdate: 'Just now',
          location: {
            lat: agent.location.lat + (Math.random() - 0.5) * 0.001,
            lng: agent.location.lng + (Math.random() - 0.5) * 0.001
          }
        })));
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = () => {
    setAgents(prev => prev.map(agent => ({
      ...agent,
      lastUpdate: 'Just now'
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Agent Monitoring</h1>
          <p className="text-gray-600">Real-time tracking of field agents</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant={autoRefresh ? "primary" : "outline"}
            className="flex items-center space-x-2"
          >
            <Clock className="w-4 h-4" />
            <span>{autoRefresh ? 'Auto Refresh: ON' : 'Auto Refresh: OFF'}</span>
          </Button>
          <Button
            onClick={handleRefresh}
            className="flex items-center space-x-2"
          >
            <Wifi className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Live Map</h2>
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>Interactive Map View</p>
              <p className="text-sm">Agents shown as blue dots</p>
            </div>
          </div>
        </div>

        {/* Agent List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Agent Status</h2>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAgent === agent.id
                    ? 'border-blue-300 bg-blue-50'
                    : agent.isOnline
                    ? 'border-green-200 bg-green-50 hover:border-green-300'
                    : 'border-red-200 bg-red-50 hover:border-red-300'
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      agent.isOnline ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{agent.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {agent.isOnline ? (
                      <Wifi className="w-4 h-4 text-green-600" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-xs text-gray-500">{agent.lastUpdate}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Current: {agent.currentClient}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>Location: {agent.location.lat.toFixed(4)}, {agent.location.lng.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Agent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.filter(a => a.id === selectedAgent).map(agent => (
              <div key={agent.id} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    agent.isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.isOnline ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Client:</span>
                    <span className="font-medium">{agent.currentClient}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Update:</span>
                    <span className="font-medium">{agent.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-medium">{agent.location.lat.toFixed(6)}, {agent.location.lng.toFixed(6)}</span>
                  </div>
                </div>
                {!agent.isOnline && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">Agent is offline</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
