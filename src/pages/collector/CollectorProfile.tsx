import React, { useState } from 'react';
import { User, Mail, Phone, Key } from 'lucide-react';

export default function CollectorProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Update Profile
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <Key className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <Key className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <Key className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
