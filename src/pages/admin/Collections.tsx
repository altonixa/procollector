import { Filter, CheckCircle2, AlertCircle, Clock, FileDown, FileSpreadsheet } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { generatePDFReport, generateExcelReport } from '../../lib/reports';

const mockCollections = [
    { id: '1', agent: 'Jean Dupont', amount: 'FCFA 45,000', method: 'Mobile Money', taxType: 'Market Fee', date: '2025-12-20 10:30', status: 'Verified' },
    { id: '2', agent: 'Marie Kline', amount: 'FCFA 12,000', method: 'Cash', taxType: 'Parking', date: '2025-12-20 10:15', status: 'Pending' },
    { id: '3', agent: 'Jean Dupont', amount: 'FCFA 8,500', method: 'Cash', taxType: 'Waste Col.', date: '2025-12-20 09:50', status: 'Verified' },
    { id: '4', agent: 'Sarah Ngono', amount: 'FCFA 125,000', method: 'Card', taxType: 'Licensing', date: '2025-12-20 09:12', status: 'Flagged' },
    { id: '5', agent: 'Marie Kline', amount: 'FCFA 3,000', method: 'Mobile Money', taxType: 'Market Fee', date: '2025-12-20 08:45', status: 'Verified' },
];

export function Collections() {
    const handleExportPDF = async () => {
        try {
            const token = localStorage.getItem('procollector_auth_token');
            const response = await fetch('/api/v1/exports/collections/pdf', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `collections_report_${new Date().toISOString().split('T')[0]}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                console.error('Export failed');
                alert('Export failed. Please try again.');
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('Export failed. Please try again.');
        }
    };

    const handleExportExcel = async () => {
        try {
            const token = localStorage.getItem('procollector_auth_token');
            const response = await fetch('/api/v1/exports/collections/excel', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.download = `collections_report_${new Date().toISOString().split('T')[0]}.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Export failed');
                alert('Export failed. Please try again.');
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('Export failed. Please try again.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase">Collection Logs</h2>
                    <p className="text-brand-dark/50 mt-1 font-bold uppercase tracking-widest text-[10px] italic">Verified Ledger of Field Activities</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleExportPDF} variant="outline" size="sm" className="h-12 border-brand-dark/20 text-brand-dark font-black uppercase tracking-widest text-[10px]">
                        <FileDown className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                    <Button onClick={handleExportExcel} variant="outline" size="sm" className="h-12 border-brand-dark/20 text-brand-dark font-black uppercase tracking-widest text-[10px]">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
                    </Button>
                    <Button variant="secondary" className="shadow-lg shadow-black/10 h-12">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            <Card className="overflow-hidden border-brand-dark/5 bg-white shadow-premium">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-dark text-white border-b border-brand-dark/10">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Agent</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Type</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Method</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Timestamp</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-dark/5">
                            {mockCollections.map((log) => (
                                <tr key={log.id} className="hover:bg-brand-dark/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-brand-dark/5 flex items-center justify-center text-[10px] font-black text-brand-dark group-hover:bg-brand-green group-hover:text-brand-dark transition-colors">
                                                {log.agent.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-sm font-black text-brand-dark tracking-tight">{log.agent}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-black text-brand-dark uppercase tracking-tighter italic">{log.amount}</td>
                                    <td className="px-6 py-5">
                                        <span className="px-2 py-1 rounded bg-brand-dark/5 text-[9px] font-black text-brand-dark uppercase tracking-widest">
                                            {log.taxType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-[10px] font-black text-brand-dark/60 uppercase tracking-widest">{log.method}</td>
                                    <td className="px-6 py-5 text-[10px] font-black text-brand-dark/40 italic uppercase">{log.date}</td>
                                    <td className="px-6 py-5 text-right">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm",
                                            log.status === 'Verified' && "bg-brand-green text-brand-dark",
                                            log.status === 'Pending' && "bg-brand-dustGold text-brand-dark",
                                            log.status === 'Flagged' && "bg-rose-100 text-rose-700"
                                        )}>
                                            {log.status === 'Verified' && <CheckCircle2 className="h-3 w-3" />}
                                            {log.status === 'Pending' && <Clock className="h-3 w-3" />}
                                            {log.status === 'Flagged' && <AlertCircle className="h-3 w-3" />}
                                            {log.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">
              Powered by Altonixa Group Ltd • System Audit
            </p>
          </div>
        </footer>
    );
}
