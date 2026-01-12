import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Button } from '../../components/ui/Button';
import { MapPin, Camera, CheckCircle2, Loader2, Wifi, WifiOff, RefreshCcw, Users, DollarSign, Search, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { offlineStorage, type PendingCollection } from '../../lib/offlineStorage';
import { v4 as uuidv4 } from 'uuid';

const API_URL = '/api/v1';

export default function FieldCollection() {
    const [view, setView] = useState<'dashboard' | 'select-client' | 'enter-collection'>('select-client');
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mobile_money'>('cash');
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [pendingCount, setPendingCount] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [, setLoadingClients] = useState(true);

    const { location, isLoading: geoLoading, captureLocation } = useGeolocation();

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        refreshPendingCount();
        fetchClients();
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const fetchClients = async () => {
        try {
            setLoadingClients(true);
            const token = localStorage.getItem('procollector_auth_token');
            const response = await fetch(`${API_URL}/collector/clients`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setClients(data.data.clients);
            } else {
                console.error('Failed to fetch clients:', data.error);
            }
        } catch (error) {
            console.error('Fetch clients error:', error);
        } finally {
            setLoadingClients(false);
        }
    };

    const refreshPendingCount = async () => {
        const count = await offlineStorage.getPendingCount();
        setPendingCount(count);
    };

    const handleSync = async () => {
        if (!isOnline) return;
        setIsSyncing(true);
        try {
            const pending = await offlineStorage.getPendingCollections();
            for (const item of pending) {
                try {
                    // Create FormData for file upload
                    const formData = new FormData();
                    formData.append('clientId', item.clientId);
                    formData.append('amount', item.amount.toString());
                    formData.append('paymentMethod', item.paymentMethod);
                    formData.append('description', item.description);
                    if (item.latitude && item.longitude) {
                        formData.append('latitude', item.latitude.toString());
                        formData.append('longitude', item.longitude.toString());
                    }
                    if (item.proofFile) {
                        formData.append('proofImage', item.proofFile);
                    }

                    const token = localStorage.getItem('procollector_auth_token');
                    const response = await fetch(`${API_URL}/collector/collections`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData
                    });

                    if (response.ok) {
                        await offlineStorage.removeCollection(item.id);
                    }
                } catch (error) {
                    console.error(`Failed to sync collection ${item.id}:`, error);
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            await refreshPendingCount();
        } catch (error) {
            console.error("Sync failed:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    const handleCollectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isOnline && !location) {
                await captureLocation();
            }

            const collectionData: PendingCollection = {
                id: uuidv4(),
                clientId: selectedClient?.id || 'unknown',
                description: `Collection from ${selectedClient?.name}`,
                amount: parseFloat(amount),
                paymentMethod,
                collectedAt: new Date().toISOString(),
                status: 'pending_sync',
                ...(location ? { latitude: location.latitude, longitude: location.longitude } : {}),
                ...(proofFile ? { proofFile, proofFileName: proofFile.name } : {})
            };

            if (isOnline) {
                try {
                    const token = localStorage.getItem('procollector_auth_token');

                    // Create FormData for file upload
                    const formData = new FormData();
                    formData.append('clientId', selectedClient.id);
                    formData.append('amount', amount);
                    formData.append('paymentMethod', paymentMethod);
                    formData.append('description', `Collection from ${selectedClient.name}`);
                    if (location) {
                        formData.append('latitude', location.latitude.toString());
                        formData.append('longitude', location.longitude.toString());
                    }
                    if (proofFile) {
                        formData.append('proofImage', proofFile);
                    }

                    const response = await fetch(`${API_URL}/collector/collections`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        console.log("Collection submitted successfully:", result);
                        setSuccessMessage(`Collection submitted successfully! Receipt: ${result.data.collection.receiptNumber}`);
                    } else {
                        throw new Error(result.error || 'Failed to submit collection');
                    }
                } catch (error) {
                    console.error("Failed to submit collection:", error);
                    await offlineStorage.saveCollection(collectionData);
                    await refreshPendingCount();
                }
            } else {
                await offlineStorage.saveCollection(collectionData);
                await refreshPendingCount();
            }

            setSuccessMessage(`Collected FCFA ${amount} from ${selectedClient?.name}`);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setAmount('');
                setProofFile(null);
                setSelectedClient(null);
                setView('dashboard');
            }, 3000);

        } catch (error) {
            console.error("Collection failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Fixed Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
                <div className="px-4 py-3 max-w-screen-sm mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            {view !== 'dashboard' && (
                                <button
                                    onClick={() => setView('dashboard')}
                                    className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                                </button>
                            )}
                            <div>
                                <h1 className="font-bold text-base text-slate-900">
                                    {view === 'dashboard' ? 'Collector Portal' :
                                        view === 'select-client' ? 'Select Client' :
                                            'Record Collection'}
                                </h1>
                                <p className="text-xs text-slate-500">Welcome, Collector</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide",
                            isOnline ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        )}>
                            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                            {isOnline ? 'Online' : 'Offline'}
                        </div>
                        <div className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide",
                            geoLoading ? "bg-amber-100 text-amber-700" : location ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                        )}>
                            <MapPin className="h-3 w-3" />
                            {geoLoading ? 'Locating...' : location ? 'GPS OK' : 'No GPS'}
                        </div>
                    </div>
                </div>
            </header>

            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="px-4 py-4 max-w-screen-sm mx-auto space-y-4">
                    {/* Pending Sync Alert */}
                    {pendingCount > 0 && view === 'dashboard' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                    <RefreshCcw className={cn("h-5 w-5", isSyncing && "animate-spin")} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-amber-900">{pendingCount} Pending</p>
                                    <p className="text-xs text-amber-700">Tap to sync</p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleSync}
                                disabled={isSyncing || !isOnline}
                                className="bg-white border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-bold"
                            >
                                {isSyncing ? 'Syncing...' : 'Sync'}
                            </Button>
                        </div>
                    )}

                    {/* Dashboard View */}
                    {view === 'dashboard' && !success && (
                        <div className="space-y-4">
                            {/* Stats Card */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Total Clients</p>
                                        <p className="text-2xl font-bold text-slate-900">{clients.length}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => setView('select-client')}
                                className="w-full bg-blue-600 hover:bg-blue-700 p-6 rounded-xl shadow-sm flex items-center justify-center gap-3 transition-colors"
                            >
                                <div className="h-14 w-14 bg-blue-500 rounded-xl flex items-center justify-center">
                                    <DollarSign className="h-7 w-7 text-white" />
                                </div>
                                <span className="text-lg font-bold text-white">Record Collection</span>
                            </button>
                        </div>
                    )}

                    {/* Select Client View */}
                    {view === 'select-client' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search client name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ul className="bg-white border border-gray-300 divide-y divide-gray-200">
                                {filteredClients.map(client => (
                                    <li key={client.id}>
                                        <button
                                            onClick={() => { setSelectedClient(client); setView('enter-collection'); }}
                                            className="w-full text-left py-3 px-4 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                                        >
                                            <div className="font-medium text-gray-900">{client.name}</div>
                                            <div className="text-sm text-gray-500">{client.address || client.phone || 'No address'}</div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Enter Collection View */}
                    {view === 'enter-collection' && selectedClient && (
                        <form onSubmit={handleCollectionSubmit} className="space-y-6">
                            {/* Client Info */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600">
                                    {selectedClient.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{selectedClient.name}</p>
                                    <p className="text-sm text-slate-500">{selectedClient.address || selectedClient.phone || 'No address'}</p>
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 block">Daily Saving Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        autoFocus
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        className="w-full text-4xl font-black text-slate-900 bg-transparent border-b-2 border-slate-200 focus:border-blue-500 outline-none py-3 placeholder:text-slate-200"
                                    />
                                    <span className="absolute right-0 bottom-3 text-lg font-bold text-slate-400">FCFA</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cash')}
                                        className={cn(
                                            "py-4 rounded-xl text-sm font-semibold border-2 transition-colors",
                                            paymentMethod === 'cash'
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                                        )}
                                    >
                                        Cash
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('mobile_money')}
                                        className={cn(
                                            "py-4 rounded-xl text-sm font-semibold border-2 transition-colors",
                                            paymentMethod === 'mobile_money'
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                                        )}
                                    >
                                        Mobile Money
                                    </button>
                                </div>
                            </div>

                            {/* Proof Upload */}
                            {paymentMethod === 'mobile_money' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Proof of Payment</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className={cn(
                                            "w-full p-5 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all",
                                            proofFile ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400"
                                        )}>
                                            <Camera className="h-5 w-5" />
                                            <span className="text-sm font-medium">{proofFile ? proofFile.name : "Upload Screenshot"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={submitting || !amount}
                                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base shadow-sm transition-colors"
                            >
                                {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Confirm Collection'}
                            </Button>
                        </form>
                    )}

                    {/* Success Overlay */}
                    {success && (
                        <div className="fixed inset-0 bg-blue-600 z-50 flex items-center justify-center p-6">
                            <div className="text-center text-white space-y-6">
                                <div className="h-24 w-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="h-14 w-14 text-white" />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight">Success!</h2>
                                <p className="text-white/90 font-medium text-lg leading-relaxed max-w-xs mx-auto">
                                    {successMessage}
                                </p>
                                <p className="text-xs text-white/50 pt-8 uppercase tracking-widest">Redirecting...</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Powered by Altonixa Group Ltd • GPS Enabled
                </p>
              </div>
            </footer>
        </div>
    );
}
