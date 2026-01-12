import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Download, Wallet, X, LogOut, Settings, HelpCircle, Home as HomeIcon, History, FileText, AlertCircle, User, Loader2 } from 'lucide-react';

export function ClientPortal() {
  const [tab, setTab] = useState<'overview' | 'history' | 'statements' | 'disputes' | 'payment-methods' | 'profile'>('overview');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState<'MTN MOMO' | 'Orange Money'>('MTN MOMO');

  // State for API data
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newDispute, setNewDispute] = useState('');
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...'
  });
  const [paymentMethods, setPaymentMethods] = useState({
    primary: 'MTN MOMO',
    mtnMomo: 'Loading...',
    orangeMoney: 'Loading...'
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('procollector_auth_token');
      const response = await fetch('/api/v1/client/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setDashboardData(data.data);
        if (data.data.client) {
          setProfile({
            name: data.data.client.name || 'N/A',
            email: data.data.client.email || 'N/A',
            phone: data.data.client.phone || 'N/A'
          });
        }
        if (data.data.paymentMethods) {
          setPaymentMethods(data.data.paymentMethods);
        }
      } else {
        setError(data.error || 'Failed to load dashboard');
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('procollector_auth_token');
      const response = await fetch('/api/v1/client/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setTransactions(data.data.transactions);
      }
    } catch (err) {
      console.error('Transactions fetch error:', err);
    }
  };

  const fetchDisputes = async () => {
    try {
      const token = localStorage.getItem('procollector_auth_token');
      const response = await fetch('/api/v1/client/disputes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setDisputes(data.data.disputes);
      }
    } catch (err) {
      console.error('Disputes fetch error:', err);
    }
  };

  const handleTabChange = (newTab: typeof tab) => {
    setTab(newTab);
    if (newTab === 'history' && transactions.length === 0) {
      fetchTransactions();
    }
    if (newTab === 'disputes' && disputes.length === 0) {
      fetchDisputes();
    }
  };

  const handleWithdrawalRequest = () => {
    if (!withdrawalAmount.trim()) return;
    alert(`Withdrawal request submitted: FCFA ${withdrawalAmount} via ${withdrawalMethod}`);
    setWithdrawalAmount('');
    setWithdrawalMethod('MTN MOMO');
    setShowWithdrawalModal(false);
  };

  const submitDispute = async () => {
    if (!newDispute.trim()) return;

    try {
      const token = localStorage.getItem('procollector_auth_token');
      const response = await fetch('/api/v1/client/disputes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          transactionId: 'sample-transaction-id', // This should come from selecting a transaction
          reason: 'General Dispute',
          description: newDispute
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setDisputes([data.data.dispute, ...disputes]);
        setNewDispute('');
        alert('Dispute submitted successfully');
      } else {
        alert(data.error || 'Failed to submit dispute');
      }
    } catch (error) {
      console.error('Submit dispute error:', error);
      alert('Failed to submit dispute. Please try again.');
    }
  };

  const handleProfileUpdate = () => {
    alert('Profile updated successfully');
    setProfileEdit(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dustGold flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-dark mx-auto mb-4" />
          <p className="text-brand-dark font-bold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-dustGold flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchDashboardData} className="bg-brand-green text-white px-4 py-2 rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 lg:bg-white">
      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSidebar(false)} />
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <HelpCircle className="w-5 h-5" /> Help & Support
              </button>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Request Withdrawal</h3>
              <button onClick={() => setShowWithdrawalModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50" style={{ borderColor: withdrawalMethod === 'MTN MOMO' ? '#1f2937' : '#d1d5db' }}>
                    <input
                      type="radio"
                      name="method"
                      value="MTN MOMO"
                      checked={withdrawalMethod === 'MTN MOMO'}
                      onChange={(e) => setWithdrawalMethod(e.target.value as 'MTN MOMO' | 'Orange Money')}
                      className="w-4 h-4"
                    />
                    <span className="font-medium text-gray-900">MTN MOMO</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50" style={{ borderColor: withdrawalMethod === 'Orange Money' ? '#1f2937' : '#d1d5db' }}>
                    <input
                      type="radio"
                      name="method"
                      value="Orange Money"
                      checked={withdrawalMethod === 'Orange Money'}
                      onChange={(e) => setWithdrawalMethod(e.target.value as 'MTN MOMO' | 'Orange Money')}
                      className="w-4 h-4"
                    />
                    <span className="font-medium text-gray-900">Orange Money</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (FCFA)</label>
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="e.g., 50000"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowWithdrawalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdrawalRequest}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">{profile.name}</h1>
              <p className="text-xs text-gray-600">Account Balance: FCFA {dashboardData?.client?.balance?.toLocaleString() || '0'}</p>
          </div>
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {profile.name.charAt(0)}
            </div>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto lg:w-full">
        {/* Desktop Header */}
        <div className="hidden lg:block lg:col-span-full bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-600">Your Collection Account</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {profile.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar Navigation - Hidden on Mobile */}
        <div className="hidden lg:block lg:w-56 lg:border-r lg:border-gray-200 lg:bg-gray-50 lg:p-6">
          <nav className="space-y-1">
            <button
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === 'overview'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HomeIcon className="w-5 h-5" /> Overview
            </button>
            <button
              onClick={() => handleTabChange('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === 'history'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <History className="w-5 h-5" /> Payment History
            </button>
            <button
              onClick={() => handleTabChange('statements')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === 'statements'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" /> Statements
            </button>
            <button
              onClick={() => handleTabChange('disputes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === 'disputes'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <AlertCircle className="w-5 h-5" /> Disputes
            </button>
            <button
              onClick={() => handleTabChange('payment-methods')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === 'payment-methods'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Wallet className="w-5 h-5" /> Payment Methods
            </button>
            <button
              onClick={() => setTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === 'profile'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5" /> Profile
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:p-6">
          {tab === 'overview' && (
            <div className="space-y-4 lg:space-y-6 pb-20 lg:pb-0">
              {/* Mobile App Style Cards */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Total Paid</p>
                  <p className="text-xl font-bold text-gray-900">{dashboardData?.stats?.totalPaid?.toLocaleString() || '0'}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Pending</p>
                  <p className="text-xl font-bold text-orange-600">{dashboardData?.stats?.pendingPayments || '0'}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 col-span-2 lg:col-span-1">
                  <p className="text-xs text-gray-600 mb-1">Available</p>
                  <p className="text-xl font-bold text-green-600">{(dashboardData?.client?.balance || 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons - Mobile App Style */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowWithdrawalModal(true)}
                  className="bg-gray-900 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" /> Withdraw
                </button>
                <button className="bg-white border border-gray-300 text-gray-900 rounded-lg py-3 font-medium flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Export
                </button>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Payments</h3>
                <div className="space-y-3">
                  {dashboardData?.recentTransactions?.map((transaction: any) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{transaction.collector}</p>
                        <p className="text-xs text-gray-600">{new Date(transaction.time).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{transaction.amount}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${transaction.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">No recent transactions</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="space-y-3 pb-20 lg:pb-0">
              <h2 className="text-xl font-bold text-gray-900 lg:hidden">Payment History</h2>
              {transactions.length > 0 ? transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.collector}</p>
                        <p className="text-sm text-gray-600">{new Date(transaction.collectedAt).toLocaleDateString()} • {transaction.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">FCFA {transaction.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded inline-block mt-1 ${transaction.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm">No payment history available</p>
                </div>
              )}
            </div>
          )}

          {tab === 'statements' && (
            <div className="space-y-4 pb-20 lg:pb-0">
              <h2 className="text-xl font-bold text-gray-900 lg:hidden">Statements</h2>
              <Card>
                <CardContent className="p-6 text-center text-gray-600">
                  <Download className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-4">Download your monthly statements</p>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                    Download January 2026
                  </button>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === 'disputes' && (
            <div className="space-y-4 pb-20 lg:pb-0">
              <h2 className="text-xl font-bold text-gray-900 lg:hidden">Disputes</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Report an Issue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <textarea
                    value={newDispute}
                    onChange={(e) => setNewDispute(e.target.value)}
                    placeholder="Describe your issue..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-24"
                  />
                  <button
                    onClick={submitDispute}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Submit Dispute
                  </button>
                </CardContent>
              </Card>

              {disputes.length > 0 && (
                <div className="space-y-3">
                  {disputes.map((dispute) => (
                    <Card key={dispute.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{dispute.reason}: {dispute.description}</p>
                            <p className="text-sm text-gray-600">Transaction: {dispute.transaction?.amount} FCFA</p>
                            <p className="text-xs text-gray-500">Filed: {new Date(dispute.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            dispute.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            dispute.status === 'resolved' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {dispute.status}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'payment-methods' && (
            <div className="space-y-4 pb-20 lg:pb-0">
              <h2 className="text-xl font-bold text-gray-900 lg:hidden">Payment Methods</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Your payment methods are fixed. To change them, please submit a complaint through the Disputes section and our admin team will review your request.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 border-2 rounded-lg transition-colors ${paymentMethods.primary === 'MTN MOMO' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">MTN MOMO</h3>
                        <p className="text-lg text-gray-900 font-bold">{paymentMethods.mtnMomo}</p>
                      </div>
                      {paymentMethods.primary === 'MTN MOMO' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Primary</span>
                      )}
                    </div>
                  </div>

                  <div className={`p-4 border-2 rounded-lg transition-colors ${paymentMethods.primary === 'Orange Money' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">Orange Money</h3>
                        <p className="text-lg text-gray-900 font-bold">{paymentMethods.orangeMoney}</p>
                      </div>
                      {paymentMethods.primary === 'Orange Money' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Primary</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Primary payment method for withdrawals:</p>
                    <p className="text-lg font-semibold text-gray-900">{paymentMethods.primary}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Request Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">To change your payment methods, please submit a complaint with details about what needs to be updated.</p>
                  <button
                    onClick={() => setTab('disputes')}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Go to Disputes
                  </button>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === 'profile' && (
            <div className="space-y-4 pb-20 lg:pb-0">
              <h2 className="text-xl font-bold text-gray-900 lg:hidden">Profile</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  {!profileEdit ? (
                    <>
                      <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <p className="text-lg font-medium text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="text-lg font-medium text-gray-900">{profile.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
                      </div>
                      <button
                        onClick={() => setProfileEdit(true)}
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 mt-4"
                      >
                        Edit Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => setProfileEdit(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProfileUpdate}
                          className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around">
          <button
            onClick={() => setTab('overview')}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
              tab === 'overview'
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-600'
            }`}
          >
            <HomeIcon className="w-5 h-5 mb-1" /> Home
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
              tab === 'history'
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-600'
            }`}
          >
            <History className="w-5 h-5 mb-1" /> History
          </button>
          <button
            onClick={() => setTab('statements')}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
              tab === 'statements'
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-600'
            }`}
          >
            <FileText className="w-5 h-5 mb-1" /> Docs
          </button>
          <button
            onClick={() => setTab('payment-methods')}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
              tab === 'payment-methods'
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-600'
            }`}
          >
            <Wallet className="w-5 h-5 mb-1" /> Payment
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
              tab === 'profile'
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-600'
            }`}
          >
            <User className="w-5 h-5 mb-1" /> Profile
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Powered by Altonixa Group Ltd • Secure & Auditable
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ClientPortal;
