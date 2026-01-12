import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, AlertCircle, Search } from 'lucide-react';

export function ReceiptVerification() {
    const [refId, setRefId] = useState('');
    const [result, setResult] = useState<{ valid: boolean; amount: string; date: string; collector: string; method: string } | null>(null);
    const [error, setError] = useState('');

    const verifyReceipt = () => {
        setResult(null);
        setError('');
        if (!refId.trim()) {
            setError('Please enter a transaction reference');
            return;
        }
        // Mock verification
        if (refId.toUpperCase().startsWith('PAY-')) {
            setResult({
                valid: true,
                amount: 'FCFA 15,000',
                date: '2025-12-20 10:45 AM',
                collector: 'Jean Dupont',
                method: 'Mobile Money'
            });
        } else {
            setError('Reference not found in our system');
        }
    };

    return (
        <div className="min-h-screen bg-brand-dustGold p-4 md:p-8 font-sans text-brand-dark">
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Receipt Verification</h1>
                    <p className="text-sm text-brand-dark/60 mt-1">Verify any payment using your transaction reference (PAY-XXX)</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-black">Lookup Receipt</CardTitle>
                        <CardDescription className="text-xs">Enter your transaction reference to verify proof of payment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                placeholder="e.g. PAY-001"
                                value={refId}
                                onChange={(e) => setRefId(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && verifyReceipt()}
                                className="flex-1 p-3 border border-brand-dark/10 rounded-xl focus:ring-2 focus:ring-brand-green/20 font-black uppercase"
                            />
                            <Button onClick={verifyReceipt} className="h-12 px-6">
                                <Search className="mr-2 h-4 w-4" /> Verify
                            </Button>
                        </div>

                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
                                <div>
                                    <div className="font-black text-sm text-rose-800">{error}</div>
                                    <div className="text-xs text-rose-600 mt-1">Try: PAY-001, PAY-002, or PAY-003</div>
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-4">
                                <div className="p-6 bg-brand-green/10 border-2 border-brand-green rounded-2xl space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-brand-green" />
                                        <div className="font-black text-lg text-brand-green">Payment Verified</div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t-2 border-brand-green/20">
                                        <div>
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase mb-1">Amount</div>
                                            <div className="text-2xl font-black text-brand-dark italic">{result.amount}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase mb-1">Date & Time</div>
                                            <div className="text-sm font-black text-brand-dark">{result.date}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase mb-1">Collector</div>
                                            <div className="text-sm font-black text-brand-dark">{result.collector}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase mb-1">Payment Method</div>
                                            <div className="text-sm font-black text-brand-dark">{result.method}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-brand-dark/5 rounded-xl space-y-2">
                                    <div className="text-[10px] font-black text-brand-dark/50 uppercase">Transaction Hash</div>
                                    <code className="block text-[11px] font-mono bg-brand-dark text-brand-dustGold p-3 rounded break-all">
                                        8f3d2a1c9e7b4f6a5d2c1e9b7f3a5d2c
                                    </code>
                                </div>

                                <Button className="w-full" onClick={async () => {
                                    try {
                                        // Use the receipt PDF download endpoint
                                        const token = localStorage.getItem('procollector_auth_token');
                                        const response = await fetch(`/api/v1/exports/receipt/${result.id}/pdf`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`
                                            }
                                        });

                                        if (response.ok) {
                                            const blob = await response.blob();
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `receipt_${result.id}.pdf`;
                                            document.body.appendChild(a);
                                            a.click();
                                            window.URL.revokeObjectURL(url);
                                            document.body.removeChild(a);
                                        } else {
                                            alert('Receipt not found or access denied.');
                                        }
                                    } catch (error) {
                                        console.error('Receipt download error:', error);
                                        alert('Failed to download receipt. Please try again.');
                                    }
                                }}>Download Receipt (PDF)</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-black">How It Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                            <div>
                                <div className="font-black text-sm">Get Your Reference</div>
                                <div className="text-xs text-brand-dark/60">Every payment generates a unique transaction ID (PAY-XXX)</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                            <div>
                                <div className="font-black text-sm">Enter It Above</div>
                                <div className="text-xs text-brand-dark/60">Paste or type the reference in the search box</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                            <div>
                                <div className="font-black text-sm">Instant Verification</div>
                                <div className="text-xs text-brand-dark/60">Confirm payment details and download signed receipt</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center pt-8 border-t border-brand-dark/10">
                    <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">Powered by Altonixa Group Ltd • Immutable & Auditable</p>
                </div>
            </div>
        </div>
    );
}

export default ReceiptVerification;
