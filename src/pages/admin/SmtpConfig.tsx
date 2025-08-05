import React, { useState } from 'react';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

export default function SmtpConfig() {
  const [config, setConfig] = useState({
    server: '',
    port: '',
    username: '',
    password: '',
    encryption: 'tls',
    fromName: '',
    fromEmail: ''
  });

  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState<null | 'success' | 'error'>(null);

  const handleTestEmail = () => {
    // Simulate sending test email
    setTestStatus('success');
    setTimeout(() => setTestStatus(null), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">SMTP Configuration</h1>

      <div className="space-y-6">
        {/* Server Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Server Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Server
              </label>
              <input
                type="text"
                value={config.server}
                onChange={(e) => setConfig({ ...config, server: e.target.value })}
                placeholder="smtp.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Port
              </label>
              <input
                type="text"
                value={config.port}
                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                placeholder="587"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Encryption
              </label>
              <select
                value={config.encryption}
                onChange={(e) => setConfig({ ...config, encryption: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sender Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Sender Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Name
              </label>
              <input
                type="text"
                value={config.fromName}
                onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
                placeholder="Procollector System"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Email
              </label>
              <input
                type="email"
                value={config.fromEmail}
                onChange={(e) => setConfig({ ...config, fromEmail: e.target.value })}
                placeholder="noreply@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Test Email */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Email Address
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handleTestEmail}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Mail className="w-5 h-5" />
              <span>Send Test Email</span>
            </button>
            {testStatus === 'success' && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Test email sent successfully!
              </div>
            )}
            {testStatus === 'error' && (
              <div className="flex items-center text-red-600">
                <XCircle className="w-5 h-5 mr-2" />
                Failed to send test email. Please check your configuration.
              </div>
            )}
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
