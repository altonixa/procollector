import React, { useState } from 'react';
import { UserPlus, Mail, Phone, IdCard, Home, Loader2, Wallet } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function AddClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idCardNumber: '',
    quarter: '',
    mtnMomo: '',
    orangeMoney: '',
    primaryPaymentMethod: 'MTN MOMO' as 'MTN MOMO' | 'Orange Money'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create client
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Client created:', formData);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          idCardNumber: '',
          quarter: '',
          mtnMomo: '',
          orangeMoney: '',
          primaryPaymentMethod: 'MTN MOMO'
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Add New Client</h2>
            <p className="text-sm text-gray-600">Onboard client to your collection portfolio</p>
          </div>
        </div>

        {success ? (
          <div className="bg-brand-slate-50 border border-brand-slate-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-brand-slate-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-brand-slate-600" />
              </div>
              <div>
                <p className="font-medium text-brand-dark">Client Successfully Added!</p>
                <p className="text-sm text-brand-slate-600">Credentials sent to {formData.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name / Business Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Marie Kwedi"
                />
                <UserPlus className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="client@email.com"
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="6xxxxxxxx"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID / CNI Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="idCardNumber"
                  value={formData.idCardNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456789"
                />
                <IdCard className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter / Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="quarter"
                  value={formData.quarter}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Akwa Nord"
                />
                <Home className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Wallet className="w-5 h-5" /> Payment Methods
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MTN MOMO Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mtnMomo"
                    value={formData.mtnMomo}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 6xxxxxxxx"
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Orange Money Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="orangeMoney"
                    value={formData.orangeMoney}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 6xxxxxxxx"
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Payment Method
                </label>
                <select
                  name="primaryPaymentMethod"
                  value={formData.primaryPaymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MTN MOMO">MTN MOMO</option>
                  <option value="Orange Money">Orange Money</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating Client...
                </>
              ) : (
                'Complete Onboarding'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}