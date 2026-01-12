import { BarChart3, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight, Users, Download, FileDown, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';
import { generatePDFReport, generateExcelReport } from '../../lib/reports';

export function Reports() {
    const handleExportPDF = async () => {
        try {
            const token = localStorage.getItem('procollector_auth_token');
            const response = await fetch('/api/v1/exports/analytics/pdf', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.pdf`;
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
            const response = await fetch('/api/v1/exports/analytics/excel', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.xlsx`;
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

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-brand-dark uppercase">Analytics & Reports</h2>
                    <p className="text-brand-dark/60 mt-1 font-bold">Deep dive into collection performance and agent metrics.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleExportPDF} variant="outline" size="sm" className="h-12 border-brand-dark/10 text-brand-dark font-black uppercase tracking-widest text-[10px]">
                        <FileDown className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button onClick={handleExportExcel} variant="outline" size="sm" className="h-12 border-brand-dark/10 text-brand-dark font-black uppercase tracking-widest text-[10px]">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
                    </Button>
                    <Button variant="secondary" className="shadow-lg shadow-black/10 h-12">
                        <Download className="mr-2 h-4 w-4" /> Custom Sync
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Avg. Collection', value: 'FCFA 12,450', change: '+12%', up: true, icon: TrendingUp },
                    { label: 'Active Agents', value: '156', change: '+4', up: true, icon: Users },
                    { label: 'Compliance Rate', value: '98.2%', change: '-0.5%', up: false, icon: PieChart },
                    { label: 'Market Fees', value: 'FCFA 45M', change: '+18%', up: true, icon: BarChart3 },
                ].map((stat) => (
                    <Card key={stat.label} className="border-brand-dark/5 bg-white shadow-sm overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full",
                                    stat.up ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                                )}>
                                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-brand-dark tracking-tighter">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-brand-dark/5 bg-white shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight text-brand-dark italic">Weekly Revenue Stream</CardTitle>
                        <CardDescription className="text-xs font-bold text-brand-dark/50">Revenue collection trends over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 w-full flex items-end gap-2 pt-8">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                    <div
                                        className="w-full bg-brand-green/20 group-hover:bg-brand-green transition-all rounded-t-lg relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-dark text-white text-[10px] font-black px-2 py-1 rounded">
                                            {h}M
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-brand-dark/5 bg-white shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight text-brand-dark italic">Collection by Region</CardTitle>
                        <CardDescription className="text-xs font-bold text-brand-dark/50">Top performing geographic segments.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { name: 'Littoral (Douala)', value: 75 },
                            { name: 'Centre (Yaoundé)', value: 62 },
                            { name: 'West (Bafoussam)', value: 45 },
                            { name: 'South (Kribi)', value: 28 },
                        ].map((region) => (
                            <div key={region.name} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-brand-dark/60">
                                    <span>{region.name}</span>
                                    <span className="text-brand-green italic">{region.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-brand-dark/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-green rounded-full shadow-[0_0_10px_rgba(46,204,113,0.3)]"
                                        style={{ width: `${region.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
