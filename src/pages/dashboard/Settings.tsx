import { Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
                <p className="text-gray-600">Manage your account and preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg">
                            AD
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">Change Avatar</button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" defaultValue="Admin User" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" defaultValue="admin@procollector.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                            <div className="flex items-center gap-3">
                                <Lock className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                </div>
                            </div>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100">Enable</button>
                        </div>
                        <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded text-sm hover:bg-gray-200">Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
