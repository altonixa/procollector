import React, { useState } from 'react';

export default function FinancialConfig() {
  const [settings, setSettings] = useState({
    currency: 'USD',
    monthlyCharge: 50,
    paymentGateways: {
      stripe: { enabled: true, apiKey: '•••••••••••••' },
      flutterwave: { enabled: false, apiKey: '' },
      paypal: { enabled: true, apiKey: '•••••••••••••' }
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Financial Configuration</h1>
      
      <div className="space-y-6">
        {/* Basic Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Basic Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Service Charge
              </label>
              <input
                type="number"
                value={settings.monthlyCharge}
                onChange={(e) => setSettings({ ...settings, monthlyCharge: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Gateways</h2>
          <div className="space-y-6">
            {/* Stripe */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Stripe</h3>
                  <p className="text-sm text-gray-500">Accept credit card payments</p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentGateways.stripe.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentGateways: {
                          ...settings.paymentGateways,
                          stripe: {
                            ...settings.paymentGateways.stripe,
                            enabled: e.target.checked
                          }
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              {settings.paymentGateways.stripe.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={settings.paymentGateways.stripe.apiKey}
                    onChange={(e) => setSettings({
                      ...settings,
                      paymentGateways: {
                        ...settings.paymentGateways,
                        stripe: {
                          ...settings.paymentGateways.stripe,
                          apiKey: e.target.value
                        }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
