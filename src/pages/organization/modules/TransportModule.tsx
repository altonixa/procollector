import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Bus, Plus, Settings } from 'lucide-react';

interface Vehicle {
  id: string;
  type: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
  driver?: string;
  location?: string;
}

export function TransportModule() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'routes' | 'bookings'>('fleet');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      // TODO: Implement real API call
      setVehicles([
        {
          id: 'VH-001',
          type: 'Bus',
          capacity: 50,
          status: 'active',
          driver: 'Jean Dupont',
          location: 'Douala Central'
        },
        {
          id: 'VH-002',
          type: 'Taxi',
          capacity: 4,
          status: 'active',
          driver: 'Marie Kline',
          location: 'Akwa Market'
        }
      ]);
    } catch (error) {
      console.error('Vehicles fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading transport module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transport Module</h1>
            <p className="text-gray-600">Fleet and transport management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
          {[
            { id: 'fleet', label: 'Fleet' },
            { id: 'routes', label: 'Routes' },
            { id: 'bookings', label: 'Bookings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'fleet' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Fleet Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bus className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{vehicle.id}</h3>
                          <p className="text-sm text-gray-600">{vehicle.type} • Capacity: {vehicle.capacity}</p>
                          {vehicle.driver && (
                            <p className="text-sm text-gray-600">Driver: {vehicle.driver}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mb-2 block ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </span>
                        {vehicle.location && (
                          <p className="text-sm text-gray-600">{vehicle.location}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {vehicles.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No vehicles in fleet</p>
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Vehicle
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {(activeTab === 'routes' || activeTab === 'bookings') && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
              <p className="text-gray-600 mb-4">This feature is under development</p>
              <Button variant="outline">Coming Soon</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Fleet Management
          </p>
        </div>
      </footer>
    </div>
  );
}
