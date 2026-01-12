import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Shield, Plus } from 'lucide-react';

interface AuditRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggers: string[];
}

export function AuditorModule() {
  const [activeTab, setActiveTab] = useState<'rules' | 'logs' | 'reports'>('rules');
  const [rules, setRules] = useState<AuditRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditRules();
  }, []);

  const fetchAuditRules = async () => {
    try {
      setLoading(true);
      // TODO: Implement real API call
      setRules([
        {
          id: 'RULE-001',
          name: 'Large Transaction Alert',
          description: 'Flag transactions over FCFA 100,000',
          status: 'active',
          triggers: ['amount > 100000']
        },
        {
          id: 'RULE-002',
          name: 'Frequent Collections',
          description: 'Alert on more than 10 collections per day',
          status: 'active',
          triggers: ['daily_count > 10']
        }
      ]);
    } catch (error) {
      console.error('Audit rules fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading auditor module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Auditor Module</h1>
            <p className="text-gray-600">Compliance and audit rule management</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Rule
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
          {[
            { id: 'rules', label: 'Rules' },
            { id: 'logs', label: 'Audit Logs' },
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
        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Audit Rules</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-3">
              {rules.map((rule) => (
                <Card key={rule.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{rule.name}</h3>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                          <div className="flex gap-2 mt-1">
                            {rule.triggers.map((trigger, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {trigger}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mb-2 block ${getStatusColor(rule.status)}`}>
                          {rule.status}
                        </span>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {rules.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No audit rules configured</p>
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Rule
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {(activeTab === 'logs' || activeTab === 'reports') && (
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h3>
              <p className="text-gray-600 mb-4">This feature is under development</p>
              <Button variant="outline">Coming Soon</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Audit Rules
          </p>
        </div>
      </footer>
    </div>
  );
}
            {/* Profile Modal for Mobile */}
            {showProfile && isMobile && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowProfile(false)}
                >
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">My Profile</h3>
                            <button onClick={() => setShowProfile(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                    <p className="text-sm text-gray-900">{user?.name || 'Loading...'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                    <p className="text-sm text-gray-900">{user?.email || 'Loading...'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                                    <p className="text-sm text-gray-900">{user?.role || 'Loading...'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Organization</label>
                                    <p className="text-sm text-gray-900">{user?.organizationName || 'Loading...'}</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg mt-4">
                                    <p className="text-green-800 text-sm">As an auditor, your profile is read-only for security purposes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 lg:pb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gray-900 text-white rounded-lg">
                            <Shield className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Regulatory Compliance Portal</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">External <span className="text-gray-700">Audit</span></h2>
                    <p className="text-sm text-gray-600 mt-1">Read-only transparency for state & union oversight</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-4 text-xs font-medium">
                        <History className="mr-2 h-4 w-4" /> View Logs
                    </Button>
                    <Button className="h-10 px-4 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium">
                        <Download className="mr-2 h-4 w-4" /> Request Full Archive
                    </Button>
                    <button
                        onClick={() => setShowProfile(true)}
                        className="lg:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        <User className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Profile for Desktop */}
            {!isMobile && showProfile && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">My Profile</h3>
                    <div className="bg-black text-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <p className="text-white font-semibold">{user?.name || 'Auditor User'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <p className="text-white font-semibold">{user?.email || 'auditor@example.com'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                                <p className="text-white font-semibold">{user?.role || 'External Auditor'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                                <p className="text-white font-semibold">{user?.organizationName || 'Regulatory Authority'}</p>
                            </div>
                            <div className="bg-green-900 p-4 rounded-lg mt-6">
                                <p className="text-green-100 text-sm">As an auditor, your profile is read-only for security purposes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing Content */}
            <div className={`space-y-6 ${showProfile && !isMobile ? 'hidden' : 'block'}`}>

                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { label: 'Integrity Hash', value: 'Loading...', detail: 'Checking...', icon: CheckCircle2, status: 'valid' },
                        { label: 'Org Coverage', value: 'Loading...', detail: 'Counting...', icon: Eye, status: 'active' },
                        { label: 'Anomaly Rate', value: 'Loading...', detail: 'Analyzing...', icon: Shield, status: 'secure' },
                    ].map((item, i) => (
                        <Card key={i} className="border-brand-dark/5 bg-white shadow-premium group hover:border-brand-slate-300 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-brand-dark/5">
                                <CardTitle className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">{item.label}</CardTitle>
                                <item.icon className="h-5 w-5 text-brand-slate-600 group-hover:scale-125 transition-transform" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-2xl font-black text-brand-dark tracking-tighter italic uppercase">{item.value}</div>
                                <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest mt-1">{item.detail}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="border-brand-dark/5 bg-white shadow-premium overflow-hidden">
                    <CardHeader className="p-8 bg-brand-dark/5 border-b border-brand-dark/5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <CardTitle className="text-xl font-black uppercase tracking-tight italic">Public Audit Stream</CardTitle>
                                <CardDescription className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mt-1">Immutable transaction records for the current session</CardDescription>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/30" />
                                <input
                                    type="text"
                                    placeholder="Search by Hash or ID..."
                                    className="w-full pl-12 pr-6 py-3 bg-white border border-brand-dark/10 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-brand-green/20"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-brand-dark/5">
                            {[
                                // This will be replaced with real data from API
                                { id: 'Loading...', org: 'Loading...', type: 'Loading...', amount: 'Loading...', hash: 'Loading...', time: 'Loading...' },
                            ].map((rec, i) => (
                                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-brand-dark/5 transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className="text-[10px] font-black text-brand-dark/20 uppercase tracking-widest h-8 w-8 flex items-center justify-center border border-brand-dark/10 rounded">#{i + 1}</div>
                                        <div>
                                            <p className="text-sm font-black text-brand-dark uppercase tracking-tight">{rec.org}</p>
                                            <p className="text-[10px] font-black text-brand-slate-600 uppercase tracking-widest italic">{rec.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <div className="hidden lg:block text-right">
                                            <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest mb-1">Blockchain Hash</p>
                                            <code className="text-[10px] font-mono bg-brand-dark text-white px-2 py-1 rounded">{rec.hash}</code>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-brand-dark italic">{rec.amount}</p>
                                            <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest">{rec.time}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-brand-dark/5">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="p-8 bg-brand-dark rounded-[3rem] text-center space-y-4">
                    <h3 className="text-white font-black uppercase tracking-tight text-2xl italic">Secure Integrity Verification</h3>
                    <p className="text-white/50 font-bold text-sm max-w-2xl mx-auto italic">
                        This portal provides a window into the Altonixa collection ecosystem for institutional regulators. All data is signed and hashed at the source (field agent device) ensuring 100% audit accuracy.
                    </p>
                </div>
            </div>
        </div>
    );
}