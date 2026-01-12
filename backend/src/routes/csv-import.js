import express from 'express';
import { body, validationResult } from 'express-validator';
import { Client, Collection, User, Organization } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// All CSV import routes require authentication and organization access
router.use(authenticate);
router.use(authorize(['admin', 'organization']));

// Helper function to parse CSV
function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) return { headers: [], rows: [] };
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows = lines.slice(1).map(l => l.split(',').map(c => c.trim()));
    return { headers, rows };
}

// @route   POST /api/v1/csv-import/clients
// @desc    Import clients from CSV
// @access  Private (Admin, Organization)
router.post('/clients',
    [
        body('csvData').notEmpty().withMessage('CSV data is required'),
        body('dryRun').optional().isBoolean().default(false)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { csvData, dryRun = false } = req.body;
            const organizationId = req.organizationId;

            // Parse CSV
            const { headers, rows } = parseCSV(csvData);

            // Validate headers
            const requiredHeaders = ['full_name', 'phone'];
            const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

            if (missingHeaders.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: `Missing required headers: ${missingHeaders.join(', ')}`
                });
            }

            const results = {
                total: rows.length,
                successful: 0,
                failed: 0,
                errors: [],
                preview: []
            };

            // Process each row
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const rowData = {};

                // Map headers to values
                headers.forEach((header, index) => {
                    rowData[header] = row[index] || '';
                });

                try {
                    // Validate required fields
                    if (!rowData.full_name || !rowData.phone) {
                        results.errors.push({
                            row: i + 2,
                            error: 'Missing required fields: full_name or phone'
                        });
                        results.failed++;
                        continue;
                    }

                    // Check for duplicate phone in organization
                    const existingClient = await Client.findOne({
                        where: {
                            organizationId,
                            phone: rowData.phone
                        }
                    });

                    if (existingClient) {
                        results.errors.push({
                            row: i + 2,
                            error: `Client with phone ${rowData.phone} already exists`
                        });
                        results.failed++;
                        continue;
                    }

                    // Prepare client data
                    const clientData = {
                        organizationId,
                        fullName: rowData.full_name,
                        phone: rowData.phone,
                        email: rowData.email || null,
                        address: rowData.address || null,
                        balance: parseFloat(rowData.balance) || 0,
                        status: rowData.status === 'inactive' ? 'inactive' : 'active',
                        assignedCollectorId: rowData.assigned_collector_id || null
                    };

                    if (dryRun) {
                        // For dry run, just validate
                        results.preview.push({
                            row: i + 2,
                            data: clientData,
                            valid: true
                        });
                        results.successful++;
                    } else {
                        // Create client
                        await Client.create(clientData);
                        results.successful++;
                    }

                } catch (error) {
                    results.errors.push({
                        row: i + 2,
                        error: error.message
                    });
                    results.failed++;
                }
            }

            res.json({
                success: true,
                data: {
                    results,
                    dryRun
                }
            });

        } catch (error) {
            console.error('Client CSV import error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to import clients from CSV.'
            });
        }
    }
);

// @route   POST /api/v1/csv-import/collections
// @desc    Import collections/transactions from CSV
// @access  Private (Admin, Organization)
router.post('/collections',
    [
        body('csvData').notEmpty().withMessage('CSV data is required'),
        body('dryRun').optional().isBoolean().default(false)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { csvData, dryRun = false } = req.body;
            const organizationId = req.organizationId;

            // Parse CSV
            const { headers, rows } = parseCSV(csvData);

            // Validate headers
            const requiredHeaders = ['client_phone', 'amount', 'date'];
            const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

            if (missingHeaders.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: `Missing required headers: ${missingHeaders.join(', ')}`
                });
            }

            const results = {
                total: rows.length,
                successful: 0,
                failed: 0,
                errors: [],
                preview: []
            };

            // Process each row
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const rowData = {};

                // Map headers to values
                headers.forEach((header, index) => {
                    rowData[header] = row[index] || '';
                });

                try {
                    // Validate required fields
                    if (!rowData.client_phone || !rowData.amount || !rowData.date) {
                        results.errors.push({
                            row: i + 2,
                            error: 'Missing required fields: client_phone, amount, or date'
                        });
                        results.failed++;
                        continue;
                    }

                    // Find client by phone
                    const client = await Client.findOne({
                        where: {
                            organizationId,
                            phone: rowData.client_phone
                        }
                    });

                    if (!client) {
                        results.errors.push({
                            row: i + 2,
                            error: `Client with phone ${rowData.client_phone} not found`
                        });
                        results.failed++;
                        continue;
                    }

                    // Find collector by email or name if provided
                    let collectorId = null;
                    if (rowData.collector_email) {
                        const collector = await User.findOne({
                            where: {
                                organizationId,
                                email: rowData.collector_email,
                                role: 'collector'
                            }
                        });
                        if (collector) collectorId = collector.id;
                    } else if (rowData.collector_name) {
                        const collector = await User.findOne({
                            where: {
                                organizationId,
                                name: rowData.collector_name,
                                role: 'collector'
                            }
                        });
                        if (collector) collectorId = collector.id;
                    }

                    // Parse date
                    const collectionDate = new Date(rowData.date);
                    if (isNaN(collectionDate.getTime())) {
                        results.errors.push({
                            row: i + 2,
                            error: 'Invalid date format'
                        });
                        results.failed++;
                        continue;
                    }

                    // Prepare collection data
                    const collectionData = {
                        organizationId,
                        clientId: client.id,
                        collectorId: collectorId || req.userId, // Default to current user if not specified
                        amount: parseFloat(rowData.amount),
                        description: rowData.description || `Imported transaction - ${rowData.transaction_type || 'Payment'}`,
                        paymentMethod: rowData.payment_method || 'cash',
                        collectedAt: collectionDate,
                        status: 'verified', // Imported transactions are considered verified
                        receiptNumber: `IMP-${Date.now()}-${uuidv4().substring(0, 6).toUpperCase()}`
                    };

                    if (dryRun) {
                        // For dry run, just validate
                        results.preview.push({
                            row: i + 2,
                            data: { ...collectionData, clientName: client.fullName },
                            valid: true
                        });
                        results.successful++;
                    } else {
                        // Create collection
                        await Collection.create(collectionData);
                        results.successful++;
                    }

                } catch (error) {
                    results.errors.push({
                        row: i + 2,
                        error: error.message
                    });
                    results.failed++;
                }
            }

            res.json({
                success: true,
                data: {
                    results,
                    dryRun
                }
            });

        } catch (error) {
            console.error('Collection CSV import error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to import collections from CSV.'
            });
        }
    }
);

// @route   POST /api/v1/csv-import/validate
// @desc    Validate CSV format and preview import
// @access  Private (Admin, Organization)
router.post('/validate',
    [
        body('csvData').notEmpty().withMessage('CSV data is required'),
        body('type').isIn(['clients', 'collections']).withMessage('Type must be clients or collections')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { csvData, type } = req.body;

            // Parse CSV
            const { headers, rows } = parseCSV(csvData);

            // Validate headers based on type
            let requiredHeaders = [];
            let optionalHeaders = [];

            if (type === 'clients') {
                requiredHeaders = ['full_name', 'phone'];
                optionalHeaders = ['email', 'address', 'balance', 'status', 'assigned_collector_id'];
            } else if (type === 'collections') {
                requiredHeaders = ['client_phone', 'amount', 'date'];
                optionalHeaders = ['collector_email', 'collector_name', 'description', 'payment_method', 'transaction_type'];
            }

            const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
            const validHeaders = [...requiredHeaders, ...optionalHeaders];
            const invalidHeaders = headers.filter(h => !validHeaders.includes(h));

            // Preview first 5 rows
            const preview = rows.slice(0, 5).map((row, index) => {
                const rowData = {};
                headers.forEach((header, headerIndex) => {
                    rowData[header] = row[headerIndex] || '';
                });
                return {
                    row: index + 2,
                    data: rowData
                };
            });

            res.json({
                success: true,
                data: {
                    valid: missingHeaders.length === 0 && invalidHeaders.length === 0,
                    headers: {
                        provided: headers,
                        required: requiredHeaders,
                        optional: optionalHeaders,
                        missing: missingHeaders,
                        invalid: invalidHeaders
                    },
                    preview,
                    totalRows: rows.length
                }
            });

        } catch (error) {
            console.error('CSV validation error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to validate CSV.'
            });
        }
    }
);

export default router;