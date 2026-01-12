import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Bed, Plus, Users } from 'lucide-react';

interface Room {
  id: string;
  type: string;
  capacity: number;
  occupied: number;
  status: 'available' | 'occupied' | 'maintenance';
  residents: string[];
}

export function HostelModule() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'residents' | 'maintenance'>('rooms');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('procollector_auth_token');
      const response = await fetch('/api/v1/hostel/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setRooms(data.data.rooms);
      } else {
        // Fallback mock data
        setRooms([
          {
            id: 'A101',
            type: 'Single',
            capacity: 1,
            occupied: 1,
            status: 'occupied',
            residents: ['John Doe']
          },
          {
            id: 'B202',
            type: 'Double',
            capacity: 2,
            occupied: 1,
            status: 'occupied',
            residents: ['Jane Smith']
          },
          {
            id: 'C303',
            type: 'Triple',
            capacity: 3,
            occupied: 0,
            status: 'available',
            residents: []
          }
        ]);
      }
    } catch (error) {
      console.error('Rooms fetch error:', error);
      // Fallback mock data
      setRooms([
        {
          id: 'A101',
          type: 'Single',
          capacity: 1,
          occupied: 1,
          status: 'occupied',
          residents: ['John Doe']
        },
        {
          id: 'B202',
          type: 'Double',
          capacity: 2,
          occupied: 1,
          status: 'occupied',
          residents: ['Jane Smith']
        },
        {
          id: 'C303',
          type: 'Triple',
          capacity: 3,
          occupied: 0,
          status: 'available',
          residents: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'occupied': return 'bg-blue-100 text-blue-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading hostel module...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Hostel Module</h1>
            <p className="text-gray-600">Room and resident management</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Resident
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
          {[
            { id: 'rooms', label: 'Rooms' },
            { id: 'residents', label: 'Residents' },
            { id: 'maintenance', label: 'Maintenance' }
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
        {activeTab === 'rooms' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Room Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Room
              </Button>
            </div>

            <div className="space-y-3">
              {rooms.map((room) => (
                <Card key={room.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bed className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{room.id}</h3>
                          <p className="text-sm text-gray-600">{room.type} • {room.occupied}/{room.capacity} occupied</p>
                          {room.residents.length > 0 && (
                            <p className="text-sm text-gray-600">
                              Residents: {room.residents.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mb-2 block ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
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

            {rooms.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No rooms configured</p>
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Room
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {(activeTab === 'residents' || activeTab === 'maintenance') && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h3>
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
            Powered by Altonixa Group Ltd • Hostel Management
          </p>
        </div>
      </footer>
    </div>
  );
}
