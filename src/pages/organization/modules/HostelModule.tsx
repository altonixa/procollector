import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Bed, Users, Settings, Plus, ShieldCheck, PieChart } from 'lucide-react';

export function HostelModule() {
    const [activeTab, setActiveTab] = useState<'rooms' | 'residents' | 'maintenance'>('rooms');

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Hostel & Accommodation</h2>
                    <p className="text-sm text-gray-600 mt-1">Smart Room Allocation & Residency tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-9 px-3 text-sm">
                        <PieChart className="h-4 w-4 mr-2" />
                        Occupancy Report
                    </Button>
                    <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Admission
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Capacity', value: 'Loading...', sub: 'Beds available', icon: Bed },
                    { label: 'Current Guests', value: 'Loading...', sub: 'Occupancy', icon: Users },
                    { label: 'Maintenance', value: 'Loading...', sub: 'Active requests', icon: Settings }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">{stat.label}</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                            </div>
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <stat.icon className="h-5 w-5 text-gray-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="flex border-b border-gray-200">
                    {(['rooms', 'residents', 'maintenance'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Room Management</h3>
                        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <ShieldCheck className="h-4 w-4" />
                            Biometric Sync Active
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Room</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Occupancy</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Residents</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { room: 'Loading...', type: 'Loading...', occupancy: 'Loading...', status: 'Loading...', residents: 'Loading...' }
                                ].map((item, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.room}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{item.type}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{item.occupancy}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{item.residents}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">Edit</Button>
                                                <Button size="sm" variant="outline">View</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
