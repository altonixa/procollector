import { useState } from 'react';

export function Collectors() {
    const [collectors] = useState([
        {
            id: 1,
            name: 'Jean Dupont',
            branch: 'Downtown Branch',
            collections: 45,
            revenue: 'FCFA 125,000',
            performance: 92,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Marie Smith',
            branch: 'North District',
            collections: 38,
            revenue: 'FCFA 98,000',
            performance: 88,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Paul Biya',
            branch: 'East Side',
            collections: 22,
            revenue: 'FCFA 65,000',
            performance: 75,
            status: 'Inactive'
        }
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold">Collector Management</h2>
                <p>Manage collectors, track performance, and generate reports</p>
            </div>

            <div className="space-y-4">
                {collectors.map((collector) => (
                    <div key={collector.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-medium">{collector.name}</h3>
                                <p className="text-sm">{collector.branch}</p>
                            </div>
                            <span className="text-sm">{collector.status}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-sm">Collections: {collector.collections}</p>
                            </div>
                            <div>
                                <p className="text-sm">Revenue: {collector.revenue}</p>
                            </div>
                            <div>
                                <p className="text-sm">Performance: {collector.performance}%</p>
                            </div>
                            <div>
                                <p className="text-sm">Branch: {collector.branch}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border text-sm">
                                View Details
                            </button>
                            <button className="px-3 py-1 border text-sm">
                                Generate Report
                            </button>
                            <button className="px-3 py-1 border text-sm">
                                Track Performance
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}