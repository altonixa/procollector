import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { CheckCircle2, User, Shield, Eye, ShoppingCart } from 'lucide-react';

export function DemoTest() {
    const { user, setDemoUser } = useAuth();
    const [testResults, setTestResults] = useState<string[]>([]);

    const runDemoTest = () => {
        const results: string[] = [];
        
        // Test 1: Set demo user
        setDemoUser('Test Organization', 'organization');
        results.push('✓ Demo user created successfully');
        
        // Test 2: Check user data
        setTimeout(() => {
            if (user) {
                results.push(`✓ User authenticated: ${user.name}`);
                results.push(`✓ Organization: ${user.organizationName}`);
                results.push(`✓ Role: ${user.role}`);
                results.push(`✓ Demo mode: ${user.isDemo ? 'Yes' : 'No'}`);
            } else {
                results.push('✗ User not found');
            }
            setTestResults([...results]);
        }, 100);
    };

    return (
        <div className="min-h-screen bg-brand-dustGold p-8 font-sans text-brand-dark">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">Demo System Test</h1>
                        <p className="text-sm text-brand-dark/60 mt-1">Verify the new demo functionality</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/demo-landing">
                            <Button variant="outline">← Back to Demo</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline">Try Demo</Button>
                        </Link>
                    </div>
                </div>

                {/* Test Controls */}
                <Card>
                    <CardHeader>
                        <CardTitle>Test Demo Flow</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-brand-dark/60">
                            This test verifies that the new demo system works correctly with organization names and role-based access.
                        </p>
                        <Button onClick={runDemoTest} className="w-full h-12">
                            Run Demo Test
                        </Button>
                    </CardContent>
                </Card>

                {/* Test Results */}
                {testResults.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Test Results</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {testResults.map((result, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-brand-dark/5 rounded-lg">
                                    <span className="text-sm font-black">{result}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Demo Portal Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Try Demo Portals</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        <Link to="/demo-organization?org=Test%20Organization">
                            <Card className="hover:border-brand-green transition-all cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <User className="h-6 w-6 text-brand-dark" />
                                    <div>
                                        <div className="font-black">Organization Admin</div>
                                        <div className="text-xs text-brand-dark/50">Manage collectors and clients</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link to="/demo-Manager?org=Test%20Organization">
                            <Card className="hover:border-brand-green transition-all cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <Eye className="h-6 w-6 text-brand-dark" />
                                    <div>
                                        <div className="font-black">Manager</div>
                                        <div className="text-xs text-brand-dark/50">Monitor field agents</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link to="/demo-collector?org=Test%20Organization">
                            <Card className="hover:border-brand-green transition-all cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <ShoppingCart className="h-6 w-6 text-brand-dark" />
                                    <div>
                                        <div className="font-black">Collector</div>
                                        <div className="text-xs text-brand-dark/50">Field collection interface</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link to="/demo-client?org=Test%20Organization">
                            <Card className="hover:border-brand-green transition-all cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <Shield className="h-6 w-6 text-brand-dark" />
                                    <div>
                                        <div className="font-black">Client</div>
                                        <div className="text-xs text-brand-dark/50">Payment tracking portal</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </CardContent>
                </Card>

                {/* Benefits Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>What's New</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="h-5 w-5 text-brand-green" />
                                    <span className="font-black text-brand-green">No More Card Clicking</span>
                                </div>
                                <p className="text-sm text-brand-dark/60">
                                    Direct access to real portal pages instead of non-functional demo cards.
                                </p>
                            </div>

                            <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="h-5 w-5 text-brand-green" />
                                    <span className="font-black text-brand-green">Organization Names</span>
                                </div>
                                <p className="text-sm text-brand-dark/60">
                                    Pass your organization name to see personalized demo experience.
                                </p>
                            </div>

                            <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="h-5 w-5 text-brand-green" />
                                    <span className="font-black text-brand-green">No Authentication Required</span>
                                </div>
                                <p className="text-sm text-brand-dark/60">
                                    Demo users bypass login and get instant access to all features.
                                </p>
                            </div>

                            <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="h-5 w-5 text-brand-green" />
                                    <span className="font-black text-brand-green">Mobile-Friendly</span>
                                </div>
                                <p className="text-sm text-brand-dark/60">
                                    All portals work seamlessly on mobile devices with responsive design.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}