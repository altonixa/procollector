import { useState } from 'react';
import { csvTemplateGenerator, downloadCSV } from '../../lib/csvTemplates';

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
                const apiClient = (await import('../../lib/api')).apiClient;
                const type = parsed.headers.map(h => h.toLowerCase()).includes('client_phone') ? 'collections' : 'clients';

                const result = await apiClient.post('/csv-import/validate', {
                    csvData: text,
                    type
                });

                if (result.success && result.data) {
                    const data = result.data as any;
                    const errs: string[] = [];
                    if (data.headers?.missing?.length > 0) {
                        errs.push(`Missing required columns: ${data.headers.missing.join(', ')}`);
                    }
                    if (data.headers?.invalid?.length > 0) {
                        errs.push(`Invalid columns: ${data.headers.invalid.join(', ')}`);
                    }

                    setErrors(errs);
                    setPreview(parsed);
                } else {
                    setErrors([result.error || 'Validation failed']);
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

            const apiClient = (await import('../../lib/api')).apiClient;
            const endpoint = preview.headers.includes('client_phone') ? '/csv-import/collections' : '/csv-import/clients';

            const result = await apiClient.post(endpoint, {
                csvData: originalCsvData,
                dryRun: false
            });

            if (result.success && result.data) {
                const data = result.data as any;
                setMessage(`Migration applied successfully. Records processed: ${data.results?.successful || 'N/A'}`);
                setPreview(null);
                setErrors([]);
                setOriginalCsvData('');
            } else {
                setMessage(`Migration failed: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Migration error:', error);
            setMessage('Migration failed. Please try again.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">Bulk Data Import</h2>
                    <p className="text-sm text-gray-600">Upload CSV files to bulk import clients, collectors, agents, and transactions</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => {
                            const content = csvTemplateGenerator.generateTemplateContent('clients');
                            if (content) downloadCSV(content, 'clients_import_template.csv');
                        }}
                        className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 text-sm font-medium"
                    >
                        Download Clients Template
                    </button>
                    <button
                        onClick={() => {
                            const content = csvTemplateGenerator.generateTemplateContent('collectors');
                            if (content) downloadCSV(content, 'collectors_import_template.csv');
                        }}
                        className="px-4 py-2 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700 text-sm font-medium"
                    >
                        Download Collectors Template
                    </button>
                    <button
                        onClick={() => {
                            const content = csvTemplateGenerator.generateTemplateContent('agents');
                            if (content) downloadCSV(content, 'agents_import_template.csv');
                        }}
                        className="px-4 py-2 bg-purple-600 text-white border border-purple-600 rounded hover:bg-purple-700 text-sm font-medium"
                    >
                        Download Agents Template
                    </button>
                    <button
                        onClick={() => {
                            const content = csvTemplateGenerator.generateTemplateContent('transactions');
                            if (content) downloadCSV(content, 'transactions_import_template.csv');
                        }}
                        className="px-4 py-2 bg-orange-600 text-white border border-orange-600 rounded hover:bg-orange-700 text-sm font-medium"
                    >
                        Download Transactions Template
                    </button>
                </div>
            </div>

            {/* Template Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Available Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <strong>Clients Template:</strong> client_name, client_phone, client_email, client_address, account_balance, registration_date, client_type, status
                    </div>
                    <div>
                        <strong>Collectors Template:</strong> collector_name, collector_phone, collector_email, assigned_zone, supervisor_name, start_date, status, target_amount, daily_limit
                    </div>
                    <div>
                        <strong>Agents Template:</strong> agent_name, agent_phone, agent_email, assigned_zone, manager_name, start_date, status, monthly_target, commission_rate
                    </div>
                    <div>
                        <strong>Transactions Template:</strong> transaction_id, client_name, client_phone, collector_name, amount, transaction_date, transaction_type, payment_method, status, notes
                    </div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Upload CSV File</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select CSV File</label>
                        <input
                            type="file"
                            accept=".csv,text/csv"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                            <strong className="text-red-800">Validation Errors:</strong>
                            <ul className="list-disc pl-6 mt-2 text-red-700">
                                {errors.map((err, i) => <li key={i}>{err}</li>)}
                            </ul>
                        </div>
                    )}

                    {preview && (
                        <div>
                            <h4 className="font-medium mb-2">Preview (showing first 10 rows):</h4>
                            <div className="overflow-x-auto border border-gray-300 rounded">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-300">
                                            {preview.headers.map((h, i) => (
                                                <th key={i} className="px-3 py-2 text-xs font-medium text-gray-700 border-r border-gray-300 last:border-r-0">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preview.rows.slice(0, 10).map((r, i) => (
                                            <tr key={i} className="border-b border-gray-200 last:border-b-0">
                                                {r.map((c, j) => (
                                                    <td key={j} className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 last:border-r-0">
                                                        {c}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={handleApply}
                                    disabled={errors.length > 0}
                                    className="px-4 py-2 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    Import Data
                                </button>
                                <button
                                    onClick={() => { setPreview(null); setErrors([]); setMessage(null); }}
                                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={`p-3 rounded border ${
                            message.includes('successfully') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                        }`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Import Instructions</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Download the appropriate template file for your data type</li>
                    <li>• Fill in your data following the column headers exactly</li>
                    <li>• Save as CSV format (comma-separated values)</li>
                    <li>• Upload the file to validate and preview before importing</li>
                    <li>• Review any validation errors and fix them before proceeding</li>
                    <li>• Click "Import Data" to complete the bulk upload</li>
                </ul>
            </div>
        </div>
    );
}

export default CSVImport;
