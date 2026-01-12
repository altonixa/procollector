import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

function parseCSV(text: string) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) return { headers: [], rows: [] };
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(l => l.split(',').map(c => c.trim()));
    return { headers, rows };
}

export function CSVImport() {
    const [preview, setPreview] = useState<{ headers: string[]; rows: string[][] } | null>(null);
    const [originalCsvData, setOriginalCsvData] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    const handleFile = async (file?: File) => {
        setMessage(null);
        setErrors([]);
        setPreview(null);
        setOriginalCsvData('');
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const text = String(reader.result || '');
            setOriginalCsvData(text);

            const parsed = parseCSV(text);

            // Validate with backend
            try {
                const token = localStorage.getItem('procollector_auth_token');
                const type = parsed.headers.map(h => h.toLowerCase()).includes('client_phone') ? 'collections' : 'clients';

                const response = await fetch('/api/v1/csv-import/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        csvData: text,
                        type
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    const errs: string[] = [];
                    if (data.data.headers.missing.length > 0) {
                        errs.push(`Missing required columns: ${data.data.headers.missing.join(', ')}`);
                    }
                    if (data.data.headers.invalid.length > 0) {
                        errs.push(`Invalid columns: ${data.data.headers.invalid.join(', ')}`);
                    }

                    setErrors(errs);
                    setPreview(parsed);
                } else {
                    setErrors([data.error || 'Validation failed']);
                }
            } catch (error) {
                console.error('Validation error:', error);
                setErrors(['Failed to validate CSV. Please try again.']);
            }
        };
        reader.readAsText(file);
    };

    const handleApply = async () => {
        if (!preview) return;
        if (errors.length) { setMessage('Cannot apply: fix errors first'); return; }

        try {
            setMessage('Applying migration...');

            const token = localStorage.getItem('procollector_auth_token');
            const endpoint = preview.headers.includes('client_phone') ? '/api/v1/csv-import/collections' : '/api/v1/csv-import/clients';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    csvData: originalCsvData,
                    dryRun: false
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage(`Migration applied successfully. Records processed: ${data.data.results.successful}`);
                setPreview(null);
                setErrors([]);
            } else {
                setMessage(`Migration failed: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Migration error:', error);
            setMessage('Migration failed. Please try again.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black uppercase">CSV Migration</h2>
                    <p className="text-sm text-brand-dark/60">Upload `clients_import.csv` or `transactions_import.csv` and preview before applying (frontend-only mock).</p>
                </div>
                <div className="flex gap-2">
                    <a href="/clients_import.csv" download className="inline-block">
                        <Button variant="outline">Download clients_import.csv</Button>
                    </a>
                    <a href="/transactions_import.csv" download className="inline-block">
                        <Button variant="outline">Download transactions_import.csv</Button>
                    </a>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-black">Upload CSV</CardTitle>
                    <CardDescription className="text-xs">Preview & validate before applying. This is client-side only (no DB).</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <input type="file" accept=".csv,text/csv" onChange={(e) => handleFile(e.target.files?.[0])} />

                        {errors.length > 0 && (
                            <div className="bg-rose-50 p-3 rounded">
                                <strong className="font-black">Errors:</strong>
                                <ul className="list-disc pl-6">
                                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        {preview && (
                            <div>
                                <div className="overflow-x-auto border rounded">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-brand-dark text-white">
                                                {preview.headers.map((h, i) => <th key={i} className="px-3 py-2 text-xs font-black">{h}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preview.rows.slice(0, 10).map((r, i) => (
                                                <tr key={i} className="odd:bg-white even:bg-gray-50">
                                                    {r.map((c, j) => <td key={j} className="px-3 py-2 text-sm">{c}</td>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <Button onClick={handleApply} variant="secondary">Apply Migration (Mock)</Button>
                                    <Button variant="outline" onClick={() => { setPreview(null); setErrors([]); setMessage(null); }}>Clear</Button>
                                </div>
                            </div>
                        )}

                        {message && <div className="text-sm font-bold">{message}</div>}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">
              Powered by Altonixa Group Ltd • Data Migration
            </p>
          </div>
        </footer>
    );
}

export default CSVImport;
