import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Package, Plus } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  location?: string;
}

export function InventoryModule() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'procurement' | 'reports'>('inventory');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      // TODO: Implement real API call
      setItems([
        {
          id: 'ITM-001',
          name: 'Office Chairs',
          category: 'Furniture',
          quantity: 25,
          status: 'in_stock',
          location: 'Storage Room A'
        },
        {
          id: 'ITM-002',
          name: 'Printer Paper',
          category: 'Supplies',
          quantity: 5,
          status: 'low_stock',
          location: 'Office Supplies'
        }
      ]);
    } catch (error) {
      console.error('Inventory fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-700';
      case 'low_stock': return 'bg-yellow-100 text-yellow-700';
      case 'out_of_stock': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading inventory module...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Inventory Module</h1>
            <p className="text-gray-600">Asset and resource management</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
          {[
            { id: 'inventory', label: 'Inventory' },
            { id: 'procurement', label: 'Procurement' },
            { id: 'reports', label: 'Reports' }
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
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Inventory Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.category} • Qty: {item.quantity}</p>
                          {item.location && (
                            <p className="text-sm text-gray-600">Location: {item.location}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mb-2 block ${getStatusColor(item.status)}`}>
                          {item.status.replace('_', ' ')}
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

            {items.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No inventory items</p>
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Item
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {(activeTab === 'procurement' || activeTab === 'reports') && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
            Powered by Altonixa Group Ltd • Inventory Control
          </p>
        </div>
      </footer>
    </div>
  );
}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Inventory Control</h2>
                    <p className="text-sm text-gray-600 mt-1">Resource planning and procurement tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        <Button
                            variant={view === 'grid' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setView('grid')}
                            className="h-9 px-3 text-xs"
                        >
                            Grid
                        </Button>
                        <Button
                            variant={view === 'table' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setView('table')}
                            className="h-9 px-3 text-xs"
                        >
                            Table
                        </Button>
                    </div>
                    <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Stock
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Assets', value: 'Loading...', icon: Package },
                    { label: 'Out of Stock', value: 'Loading...', icon: AlertTriangle },
                    { label: 'Low Stock', value: 'Loading...', icon: AlertTriangle },
                    { label: 'Daily Movement', value: 'Loading...', icon: BarChart3 }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">{stat.label}</p>
                                <p className="text-xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <stat.icon className="h-5 w-5 text-gray-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search inventory assets..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-9 px-3 text-sm">
                            <Filter className="h-4 w-4 mr-2" />
                            All Categories
                        </Button>
                        <Button variant="outline" className="h-9 px-3 text-sm">
                            Procurement History
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    {view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: 'Loading...', category: 'Loading...', sku: 'Loading...', stock: 'Loading...', unit: 'Loading...', status: 'Loading...' }
                ].map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                Loading...
                            </span>
                        </div>
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 uppercase mb-1">{item.category}</p>
                            <h4 className="text-base font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Stock Level</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-semibold text-gray-900">{item.stock}</span>
                                    <span className="text-xs text-gray-500">{item.unit}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <ArrowDownLeft className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">SKU</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Stock</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="px-4 py-3 text-sm text-gray-900">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">Edit</Button>
                                                <Button size="sm" variant="outline">View</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
