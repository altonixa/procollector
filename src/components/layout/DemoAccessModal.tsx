import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { X, Play, Lock, CheckCircle2 } from 'lucide-react';

interface DemoAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orgName: string) => void;
}

export function DemoAccessModal({ isOpen, onClose, onSubmit }: DemoAccessModalProps) {
  const [orgName, setOrgName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgName.trim()) {
      setSubmitted(true);
      onSubmit(orgName);
      setTimeout(() => {
        setOrgName('');
        setSubmitted(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-brand-green/30 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Demo Access</CardTitle>
          <button
            onClick={onClose}
            className="text-brand-dark/50 hover:text-brand-dark transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {submitted ? (
            <div className="space-y-4 py-6 text-center">
              <div className="h-16 w-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-brand-dark" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark">Welcome, {orgName}!</h3>
              <p className="text-sm text-brand-dark/60">
                Preparing your demo environment...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold uppercase tracking-widest text-brand-dark">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Your Organization"
                  className="w-full px-4 py-3 border-2 border-brand-dark/20 rounded-lg focus:border-brand-green focus:outline-none font-bold text-brand-dark"
                  autoFocus
                />
              </div>

              <div className="space-y-3 p-4 bg-brand-green/10 border border-brand-green/20 rounded-lg">
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-dark">
                  You'll have access to:
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark/70">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-brand-green rounded-full"></div>
                    System Admin Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-brand-green rounded-full"></div>
                    Organization Admin Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-brand-green rounded-full"></div>
                    Manager Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-brand-green rounded-full"></div>
                    Collector Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-brand-green rounded-full"></div>
                    Client Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-brand-green rounded-full"></div>
                    Auditor Portal
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-brand-green hover:bg-brand-green/90"
                  disabled={!orgName.trim()}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Demo
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
