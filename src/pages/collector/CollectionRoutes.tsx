import React from 'react';
import { Map, Navigation, MapPin } from 'lucide-react';

export default function CollectionRoutes() {
  const routes = [
    {
      id: 1,
      area: 'Downtown Business District',
      clients: [
        { name: 'ABC Company', address: '123 Business St', time: '10:00 AM', amount: '$500.00' },
        { name: 'XYZ Store', address: '456 Commerce Ave', time: '11:30 AM', amount: '$750.00' },
      ]
    },
    {
      id: 2,
      area: 'Shopping Mall Complex',
      clients: [
        { name: 'Quick Mart', address: '789 Market Rd', time: '2:00 PM', amount: '$300.00' },
        { name: 'Fashion Hub', address: '321 Mall Street', time: '3:30 PM', amount: '$450.00' },
      ]
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Collection Routes</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Navigation className="w-5 h-5" />
          <span>Start Navigation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map View */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:row-span-2">
          <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <Map className="w-16 h-16 text-gray-400" />
            <span className="ml-2 text-gray-500">Map View</span>
          </div>
        </div>

        {/* Route List */}
        <div className="space-y-6">
          {routes.map((route) => (
            <div key={route.id} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{route.area}</h2>
              <div className="space-y-4">
                {route.clients.map((client, index) => (
                  <div key={index} className="flex items-start space-x-4 border-b pb-4">
                    <div className="mt-1">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-gray-500">{client.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">{client.amount}</p>
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
