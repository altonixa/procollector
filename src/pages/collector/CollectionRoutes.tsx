import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Navigation, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function CollectionRoutes() {
  const routes = [
    {
      id: 1,
      area: 'Downtown Business District',
      clients: [
        { name: 'ABC Company', address: '123 Business St', time: '10:00 AM', amount: 'FCFA 500.00', lat: 4.0511, lng: 9.7679 },
        { name: 'XYZ Store', address: '456 Commerce Ave', time: '11:30 AM', amount: 'FCFA 750.00', lat: 4.0521, lng: 9.7689 },
      ]
    },
    {
      id: 2,
      area: 'Shopping Mall Complex',
      clients: [
        { name: 'Quick Mart', address: '789 Market Rd', time: '2:00 PM', amount: 'FCFA 300.00', lat: 4.0531, lng: 9.7699 },
        { name: 'Fashion Hub', address: '321 Mall Street', time: '3:30 PM', amount: 'FCFA 450.00', lat: 4.0541, lng: 9.7709 },
      ]
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Collection Routes</h1>
        <button className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
          <Navigation className="w-4 h-4" />
          <span>Start Navigation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map View */}
        <div className="bg-white p-4 border lg:row-span-2">
          <div style={{ height: '600px', width: '100%', position: 'relative' }}>
            <MapContainer center={[4.0511, 9.7679]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {routes.flatMap(route => route.clients).map((client, index) => (
              <Marker key={index} position={[client.lat, client.lng]}>
                <Popup>
                  <div>
                    <strong>{client.name}</strong><br />
                    {client.address}<br />
                    Time: {client.time}<br />
                    Amount: {client.amount}
                  </div>
                </Popup>
              </Marker>
            ))}
            </MapContainer>
          </div>
        </div>

        {/* Route List */}
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="bg-white p-4 border">
              <h2 className="text-lg font-semibold mb-3">{route.area}</h2>
              <div className="space-y-3">
                {route.clients.map((client, index) => (
                  <div key={index} className="flex items-start space-x-3 border-b pb-3">
                    <div className="mt-1">
                      <MapPin className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-gray-500">{client.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{client.amount}</p>
                          <p className="text-sm text-gray-500">{client.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
