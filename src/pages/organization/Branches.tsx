import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Users, TrendingUp, MapPin, Plus } from 'lucide-react';

export function Branches() {
    const [branches] = useState([
        {
            id: 1,
            name: 'Downtown Branch',
            location: '123 Main St, Douala',
            manager: 'John Doe',
            collectors: 15,
            revenue: 'FCFA 2.5M',
            performance: 92,
            status: 'Active'
        },
        {
            id: 2,
            name: 'North District Branch',
            location: '456 North Ave, Douala',
            manager: 'Jane Smith',
            collectors: 12,
            revenue: 'FCFA 1.8M',
            performance: 88,
            status: 'Active'
        },
        {
            id: 3,
            name: 'East Side Branch',
            location: '789 East Rd, Douala',
            manager: null,
            collectors: 8,
            revenue: 'FCFA 1.2M',
            performance: 75,
            status: 'Needs Manager'
        }
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold">Branch Management</h2>
                <p>Manage branches, assign managers, and track performance</p>
            </div>

            <div className="space-y-4">
                {branches.map((branch) => (
                    <div key={branch.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-medium">{branch.name}</h3>
                                <p className="text-sm">{branch.location}</p>
                            </div>
                            <span className="text-sm">{branch.status}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-sm">Manager: {branch.manager || 'Not Assigned'}</p>
                            </div>
                            <div>
                                <p className="text-sm">Collectors: {branch.collectors}</p>
                            </div>
                            <div>
                                <p className="text-sm">Revenue: {branch.revenue}</p>
                            </div>
                            <div>
                                <p className="text-sm">Performance: {branch.performance}%</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border text-sm">
                                {branch.manager ? 'Change Manager' : 'Assign Manager'}
                            </button>
                            <button className="px-3 py-1 border text-sm">
                                View Details
                            </button>
                            <button className="px-3 py-1 border text-sm">
                                Performance Report
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}