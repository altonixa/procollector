import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Search, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AuditRecord {
  id: string;
  transactionId: string;
  organization: string;
  collector: string;
  client: string;
  amount: number;
  status: 'verified' | 'flagged' | 'pending';
  timestamp: string;
  hash: string;
}

export function AuditorPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'reports'>('overview');
  const [auditRecords, setAuditRecords] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      setLoading(true);
      // TODO: Implement real audit API
      setAuditRecords([
        {
          id: '1',
          transactionId: 'TXN-001',
          organization: 'Douala City Council',
          collector: 'Jean Dupont',
          client: 'Boutique Alpha',
          amount: 25000,
          status: 'verified',
          timestamp: '2025-01-15 14:30',
          hash: '8f3d2a1c9e7b4f6a5d2c1e9b7f3a5d2c'
        },
        {
          id: '2',
          transactionId: 'TXN-002',
          organization: 'National Teachers Union',
          collector: 'Marie Kline',
          client: 'Pharmacie De La Paix',
          amount: 15000,
          status: 'flagged',
          timestamp: '2025-01-15 13:45',
          hash: '4a7b8c2d9e1f3g5h6i2j4k7l8m9n0o1'
        }
      ]);
    } catch (error) {
      console.error('Audit data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = auditRecords.filter(record =>
    record.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.collector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'flagged': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'flagged': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading audit portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Audit Portal</h1>
          <p className="text-gray-600">Compliance monitoring and transaction verification</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'reports', label: 'Reports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{auditRecords.length}</p>
                      <p className="text-sm text-gray-600">Total Audits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {auditRecords.filter(r => r.status === 'verified').length}
                      </p>
                      <p className="text-sm text-gray-600">Verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {auditRecords.filter(r => r.status === 'flagged').length}
                      </p>
                      <p className="text-sm text-gray-600">Flagged</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Audit Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditRecords.slice(0, 5).map((record) => (
                    <div key={record.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <div>
                          <p className="font-medium text-gray-900">{record.transactionId}</p>
                          <p className="text-sm text-gray-600">{record.organization} • {record.collector}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">FCFA {record.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{record.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transaction List */}
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{record.transactionId}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{record.organization}</p>
                          <p className="text-sm text-gray-600">{record.collector} → {record.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">FCFA {record.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{record.timestamp}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>

                    {/* Hash verification */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                        {record.hash}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No transactions found</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-gray-600" />
                    <span>Monthly Compliance Report</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <Shield className="w-8 h-8 text-gray-600" />
                    <span>Anomaly Detection Report</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <CheckCircle className="w-8 h-8 text-gray-600" />
                    <span>Verification Summary</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <AlertTriangle className="w-8 h-8 text-gray-600" />
                    <span>Flagged Transactions</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Regulatory Compliance
          </p>
        </div>
      </footer>
    </div>
  );
}