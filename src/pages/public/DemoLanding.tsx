import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Eye,
  ShoppingCart,
  User,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';

const portals = [
  {
    id: 'admin',
    title: 'System Admin Portal',
    description: 'Manage organizations, subscriptions, and global settings',
    icon: Building2,
    color: 'from-blue-500 to-blue-600',
    features: ['Organization Management', 'Billing & Subscriptions', 'CSV Imports', 'Global Analytics'],
    demoRoute: '/demo-admin'
  },
  {
    id: 'organization',
    title: 'Organization Admin Portal',
    description: 'Oversee collectors, clients, rules, and reconciliation',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    features: ['Collector Management', 'Client Registry', 'Collection Rules', 'Daily Reconciliation'],
    demoRoute: '/demo-organization'
  },
  {
    id: 'Manager',
    title: 'Manager Portal',
    description: 'Real-time monitoring of field collectors and performance',
    icon: Eye,
    color: 'from-amber-500 to-amber-600',
    features: ['Real-time Tracking', 'Agent Monitoring', 'Performance Alerts', 'Activity Logs'],
    demoRoute: '/demo-Manager'
  },
  {
    id: 'collector',
    title: 'Collector Portal',
    description: 'Mobile-first field collection with GPS and digital receipts',
    icon: ShoppingCart,
    color: 'from-green-500 to-green-600',
    features: ['GPS Collection', 'Digital Receipts', 'Deposit Management', 'Offline Support'],
    demoRoute: '/demo-collector'
  },
  {
    id: 'client',
    title: 'Client Portal',
    description: 'Payment tracking, statements, and dispute management',
    icon: User,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Payment History', 'Account Statements', 'Receipt Verification', 'Dispute Tracking'],
    demoRoute: '/demo-client'
  }
];

export function DemoLanding() {
  const [orgName, setOrgName] = useState('Demo Organization');

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark to-brand-dark/95 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-6 mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors font-bold uppercase tracking-widest text-sm group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Professional Demo Access
            </h1>
            <p className="text-xl text-brand-slate-300 font-bold">
              Request access to experience ProCollector with your organization
            </p>
          </div>

          <div className="p-6 bg-brand-green/10 border border-brand-green/20 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-brand-green" />
              <h3 className="text-lg font-bold text-brand-green">Verified Organizations Only</h3>
            </div>
            <p className="text-brand-dark/70 leading-relaxed">
              Demo access is available exclusively to verified organizations using professional email addresses.
              No Gmail, Yahoo, or temporary emails are accepted.
            </p>
          </div>
        </div>

        {/* Organization Name Input */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">
              Your Organization Name
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g., City Council, National Bank, Market Union"
                className="flex-1 px-4 py-3 text-lg font-black bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
              />
              <Button
                variant="secondary"
                className="h-14 px-8 text-lg font-black"
                onClick={() => setOrgName('Demo Organization')}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Portals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card
                key={portal.id}
                className="border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                {/* Simple Icon Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{portal.title}</CardTitle>
                  <CardDescription className="text-sm">{portal.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features List */}
                  <div className="space-y-2">
                    {portal.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo Button */}
                  <Link
                    to={`/signup?demo=${portal.id}&org=${encodeURIComponent(orgName)}`}
                    className="block"
                  >
                    <Button className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-sm">
                      Request Demo Access
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="text-lg text-brand-green">📧 Professional Email Required</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-brand-dark/70 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>No Gmail, Yahoo, or temporary emails</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Organizational email address required</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Verification email sent within 24 hours</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="text-lg text-brand-green">🔒 Secure Demo Environment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-brand-dark/70 space-y-2">
              <p>• Demo data is completely isolated</p>
              <p>• No real transactions or sensitive data</p>
              <p>• Full feature access for evaluation</p>
              <p>• 7-day access period</p>
            </CardContent>
          </Card>

          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="text-lg text-brand-green">✅ Ready to Deploy?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-brand-dark/70 space-y-2">
              <p>• Contact our sales team</p>
              <p>• 2-hour onboarding process</p>
              <p>• Dedicated support included</p>
              <p>• Custom implementation available</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 md:p-12 bg-gradient-to-r from-brand-green/10 to-brand-green/5 border border-brand-green/20 rounded-3xl text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Ready to Experience ProCollector?
          </h2>
          <p className="text-brand-slate-300 font-bold max-w-2xl mx-auto">
            Join hundreds of organizations using ProCollector to increase collection efficiency and transparency.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button className="h-12 px-6 text-base bg-gray-900 hover:bg-gray-800">
                Contact Sales
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="h-12 px-6 text-base border-gray-300 hover:bg-gray-100">
                Request Demo Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}