import { useState, useEffect } from 'react';
import { User, Mail, Phone, DollarSign, Percent } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function CollectorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    salary: 'FCFA 150,000', // Mock data
    clientMonthlyFee: 'FCFA 1,000', // Default client fee
    commissionRate: '5%' // Derived from client fee
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);


  return (
    <div className="space-y-4 lg:space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600 mt-1">View your account information</p>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {/* Profile Information */}
        <div className="bg-white p-4 lg:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Profile Information</h2>
          <div className="space-y-4 lg:space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.name}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profile.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={profile.phone}
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Salary and Commission */}
        <div className="bg-white p-4 lg:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Compensation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Salary
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.salary}
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                />
                <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Monthly Fee
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.clientMonthlyFee}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                  />
                  <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Rate (from client fee)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.commissionRate}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                  />
                  <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Profile changes and password resets must be handled by your manager or administrator.
            Contact support if you need any updates to your account information.
          </p>
        </div>
      </div>
    </div>
  );
}
