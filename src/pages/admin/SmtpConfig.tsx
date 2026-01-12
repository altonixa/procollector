import { useState, useEffect } from 'react';
import { Mail, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function SmtpConfig() {
  const [config, setConfig] = useState({
    server: '',
    port: '587',
    username: '',
    password: '',
    encryption: 'tls',
    fromName: '',
    fromEmail: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState<null | 'success' | 'error'>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.get<any>('/admin/smtp-config');
      
      if (result.success && result.data) {
        setConfig(result.data);
      } else {
        setError(result.error || 'Failed to load SMTP configuration');
      }
    } catch (err) {
      console.error('Fetch config error:', err);
      setError('Network error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.put('/admin/smtp-config', config);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to save configuration');
      }
    } catch (err) {
      console.error('Save config error:', err);
      setError('Failed to save configuration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail.trim()) {
      alert('Please enter a test email address');
      return;
    }

    try {
      setTesting(true);
      setTestStatus(null);
      
      const apiClient = (await import('../../lib/api')).apiClient;
      const result = await apiClient.post('/admin/smtp-config/test', { email: testEmail });
      
      if (result.success) {
        setTestStatus('success');
        setTimeout(() => setTestStatus(null), 5000);
      } else {
        setTestStatus('error');
        setTimeout(() => setTestStatus(null), 5000);
      }
    } catch (err) {
      console.error('Test email error:', err);
      setTestStatus('error');
      setTimeout(() => setTestStatus(null), 5000);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SMTP Configuration</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-600">Configuration saved successfully!</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-brand-dark" />
        </div>
      ) : (
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

        </div>
      )}
    </div>
  );
}
