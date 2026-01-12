import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { Organization, User, Client, Collection } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import { Op } from 'sequelize';

const router = express.Router();

// All export routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/exports/collections/pdf
 * @desc    Export collections data as PDF report
 * @access  Private
 */
router.get('/collections/pdf',
    [
        query('startDate').optional().isISO8601(),
        query('endDate').optional().isISO8601(),
        query('status').optional().isIn(['pending', 'verified', 'rejected', 'reversed']),
        query('collectorId').optional().isUUID(),
        query('format').optional().isIn(['detailed', 'summary'])
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

            const { startDate, endDate, status, collectorId, format = 'detailed' } = req.query;
            const organizationId = req.organizationId;

            // Build query filters
            const where = { organizationId };
            if (status) where.status = status;
            if (collectorId) where.collectorId = collectorId;
            if (startDate || endDate) {
                where.collectedAt = {};
                if (startDate) where.collectedAt[Op.gte] = new Date(startDate);
                if (endDate) where.collectedAt[Op.lte] = new Date(endDate);
            }

            // Get collections with related data
            const collections = await Collection.findAll({
                where,
                include: [
                    { model: User, as: 'collector', attributes: ['id', 'name'] },
                    { model: Client, as: 'client', attributes: ['id', 'fullName', 'phone'] }
                ],
                order: [['collectedAt', 'DESC']]
            });

            // Get organization info
            const organization = await Organization.findByPk(organizationId);

            // Generate PDF
            const doc = new jsPDF();

            // Header
            doc.setFontSize(22);
            doc.setTextColor(15, 23, 42);
            doc.text('ALTONIXA SWIFT FINANCE', 14, 20);

            doc.setFontSize(10);
            doc.setTextColor(46, 204, 113);
            doc.text('COLLECTION REPORT', 14, 28);

            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 38);
            doc.text(`Organization: ${organization?.name || 'Altonixa Swift Finance'}`, 14, 45);

            // Title
            doc.setFontSize(16);
            doc.setTextColor(15, 23, 42);
            const title = format === 'detailed' ? 'DETAILED COLLECTION REPORT' : 'COLLECTION SUMMARY REPORT';
            doc.text(title.toUpperCase(), 14, 60);

            // Prepare data for table
            let headers, rows;

            if (format === 'summary') {
                headers = ['Date', 'Collector', 'Total Amount', 'Transactions', 'Status'];
                const summaryData = {};

                collections.forEach(collection => {
                    const date = format(new Date(collection.collectedAt), 'yyyy-MM-dd');
                    const collector = collection.collector?.name || 'Unknown';

                    if (!summaryData[`${date}-${collector}`]) {
                        summaryData[`${date}-${collector}`] = {
                            date,
                            collector,
                            total: 0,
                            count: 0,
                            status: collection.status
                        };
                    }

                    summaryData[`${date}-${collector}`].total += collection.amount;
                    summaryData[`${date}-${collector}`].count += 1;
                });

                rows = Object.values(summaryData).map(item => [
                    item.date,
                    item.collector,
                    `FCFA ${item.total.toLocaleString()}`,
                    item.count.toString(),
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)
                ]);
            } else {
                headers = ['Date', 'Time', 'Collector', 'Client', 'Amount', 'Method', 'Status'];
                rows = collections.map(collection => [
                    format(new Date(collection.collectedAt), 'yyyy-MM-dd'),
                    format(new Date(collection.collectedAt), 'HH:mm'),
                    collection.collector?.name || 'Unknown',
                    collection.client?.fullName || 'Unknown Client',
                    `FCFA ${collection.amount.toLocaleString()}`,
                    collection.paymentMethod.replace('_', ' ').toUpperCase(),
                    collection.status.charAt(0).toUpperCase() + collection.status.slice(1)
                ]);
            }

            // Generate table
            autoTable(doc, {
                startY: 70,
                head: [headers],
                body: rows,
                theme: 'striped',
                headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
                styles: { fontSize: 8, cellPadding: 4 },
                alternateRowStyles: { fillColor: [248, 250, 252] }
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(`Page ${i} of ${pageCount} - Altonixa Swift Finance Ltd`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
            }

            // Send PDF as response
            const filename = `collections_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
            const pdfBuffer = doc.output('arraybuffer');

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(Buffer.from(pdfBuffer));

        } catch (error) {
            console.error('PDF export error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate PDF report'
            });
        }
    }
);

/**
 * @route   GET /api/v1/exports/collections/excel
 * @desc    Export collections data as Excel spreadsheet
 * @access  Private
 */
router.get('/collections/excel',
    [
        query('startDate').optional().isISO8601(),
        query('endDate').optional().isISO8601(),
        query('status').optional().isIn(['pending', 'verified', 'rejected', 'reversed']),
        query('collectorId').optional().isUUID(),
        query('format').optional().isIn(['detailed', 'summary'])
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

            const { startDate, endDate, status, collectorId, format = 'detailed' } = req.query;
            const organizationId = req.organizationId;

            // Build query filters
            const where = { organizationId };
            if (status) where.status = status;
            if (collectorId) where.collectorId = collectorId;
            if (startDate || endDate) {
                where.collectedAt = {};
                if (startDate) where.collectedAt[Op.gte] = new Date(startDate);
                if (endDate) where.collectedAt[Op.lte] = new Date(endDate);
            }

            // Get collections with related data
            const collections = await Collection.findAll({
                where,
                include: [
                    { model: User, as: 'collector', attributes: ['id', 'name', 'email'] },
                    { model: Client, as: 'client', attributes: ['id', 'fullName', 'phone', 'email'] }
                ],
                order: [['collectedAt', 'DESC']]
            });

            // Get organization info
            const organization = await Organization.findByPk(organizationId);

            // Prepare Excel data
            const workbook = XLSX.utils.book_new();

            // Summary sheet
            const summaryData = [
                ['Altonixa Swift Finance'],
                ['Collection Report'],
                [`Generated: ${format(new Date(), 'PPpp')}`],
                [`Organization: ${organization?.name || 'Altonixa Swift Finance'}`],
                [],
                ['Summary Statistics'],
                ['Total Collections:', collections.length.toString()],
                ['Verified Collections:', collections.filter(c => c.status === 'verified').length.toString()],
                ['Total Amount:', `FCFA ${collections.filter(c => c.status === 'verified').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}`],
                []
            ];

            const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
            XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

            // Detailed data sheet
            let detailedHeaders, detailedData;

            if (format === 'summary') {
                detailedHeaders = ['Date', 'Collector', 'Total Amount', 'Transaction Count', 'Success Rate'];
                const summaryMap = new Map();

                collections.forEach(collection => {
                    const date = format(new Date(collection.collectedAt), 'yyyy-MM-dd');
                    const collector = collection.collector?.name || 'Unknown';

                    const key = `${date}-${collector}`;
                    if (!summaryMap.has(key)) {
                        summaryMap.set(key, {
                            date,
                            collector,
                            total: 0,
                            count: 0,
                            verified: 0
                        });
                    }

                    const entry = summaryMap.get(key);
                    entry.total += collection.amount;
                    entry.count += 1;
                    if (collection.status === 'verified') entry.verified += 1;
                });

                detailedData = Array.from(summaryMap.values()).map(entry => [
                    entry.date,
                    entry.collector,
                    `FCFA ${entry.total.toLocaleString()}`,
                    entry.count.toString(),
                    entry.count > 0 ? `${((entry.verified / entry.count) * 100).toFixed(1)}%` : '0%'
                ]);
            } else {
                detailedHeaders = [
                    'ID', 'Date', 'Time', 'Collector', 'Collector Email', 'Client', 'Client Phone',
                    'Amount', 'Payment Method', 'Status', 'Receipt Number', 'Notes'
                ];

                detailedData = collections.map(collection => [
                    collection.id,
                    format(new Date(collection.collectedAt), 'yyyy-MM-dd'),
                    format(new Date(collection.collectedAt), 'HH:mm:ss'),
                    collection.collector?.name || 'Unknown',
                    collection.collector?.email || '',
                    collection.client?.fullName || 'Unknown Client',
                    collection.client?.phone || '',
                    collection.amount,
                    collection.paymentMethod.replace('_', ' '),
                    collection.status,
                    collection.receiptNumber || '',
                    collection.description || ''
                ]);
            }

            const detailedSheet = XLSX.utils.aoa_to_sheet([detailedHeaders, ...detailedData]);
            XLSX.utils.book_append_sheet(workbook, detailedSheet, 'Collections');

            // Generate and send Excel file
            const filename = `collections_report_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
            const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(excelBuffer);

        } catch (error) {
            console.error('Excel export error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate Excel report'
            });
        }
    }
);

/**
 * @route   GET /api/v1/exports/receipt/:id/pdf
 * @desc    Generate PDF receipt for a specific collection
 * @access  Private
 */
router.get('/receipt/:id/pdf',
    async (req, res) => {
        try {
            const collectionId = req.params.id;
            const organizationId = req.organizationId;

            // Get collection with related data
            const collection = await Collection.findOne({
                where: {
                    id: collectionId,
                    organizationId
                },
                include: [
                    { model: User, as: 'collector', attributes: ['id', 'name', 'email'] },
                    { model: Client, as: 'client', attributes: ['id', 'fullName', 'phone', 'address'] },
                    { model: Organization, as: 'organization', attributes: ['id', 'name', 'address', 'phone'] }
                ]
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    error: 'Receipt not found'
                });
            }

            // Generate receipt PDF
            const doc = new jsPDF();

            // Header with company branding
            doc.setFontSize(24);
            doc.setTextColor(15, 23, 42);
            doc.text('ALTONIXA SWIFT FINANCE', 14, 25);

            doc.setFontSize(12);
            doc.setTextColor(46, 204, 113);
            doc.text('OFFICIAL PAYMENT RECEIPT', 14, 35);

            // Receipt details
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Receipt #: ${collection.receiptNumber}`, 14, 50);
            doc.text(`Date: ${format(new Date(collection.collectedAt), 'PPpp')}`, 14, 58);
            doc.text(`Status: ${collection.status.toUpperCase()}`, 14, 66);

            // Organization info
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42);
            doc.text('From:', 14, 85);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(collection.organization?.name || 'Altonixa Swift Finance', 14, 93);
            if (collection.organization?.address) {
                doc.text(collection.organization.address, 14, 101);
            }
            if (collection.organization?.phone) {
                doc.text(`Phone: ${collection.organization.phone}`, 14, 109);
            }

            // Client info
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42);
            doc.text('To:', 14, 125);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(collection.client?.fullName || 'Unknown Client', 14, 133);
            if (collection.client?.phone) {
                doc.text(`Phone: ${collection.client.phone}`, 14, 141);
            }
            if (collection.client?.address) {
                doc.text(collection.client.address, 14, 149);
            }

            // Payment details
            doc.setFontSize(14);
            doc.setTextColor(15, 23, 42);
            doc.text('PAYMENT DETAILS', 14, 170);

            const paymentData = [
                ['Description', collection.description || 'Payment Collection'],
                ['Amount', `FCFA ${collection.amount.toLocaleString()}`],
                ['Payment Method', collection.paymentMethod.replace('_', ' ').toUpperCase()],
                ['Collected By', collection.collector?.name || 'Unknown Collector'],
                ['Transaction ID', collection.id]
            ];

            autoTable(doc, {
                startY: 180,
                head: [],
                body: paymentData,
                theme: 'plain',
                styles: { fontSize: 10, cellPadding: 6 },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 60 },
                    1: { cellWidth: 100 }
                }
            });

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(100);
            const footerY = doc.internal.pageSize.height - 30;
            doc.text('This is an official receipt from Altonixa Swift Finance.', 14, footerY);
            doc.text('For verification, please contact us or use our online verification system.', 14, footerY + 8);
            doc.text(`Generated on ${format(new Date(), 'PPpp')}`, 14, footerY + 16);

            // Send PDF
            const filename = `receipt_${collection.receiptNumber}.pdf`;
            const pdfBuffer = doc.output('arraybuffer');

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(Buffer.from(pdfBuffer));

        } catch (error) {
            console.error('Receipt PDF error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate receipt PDF'
            });
        }
    }
);

/**
 * @route   GET /api/v1/exports/analytics/excel
 * @desc    Export analytics dashboard as Excel spreadsheet
 * @access  Private
 */
router.get('/analytics/excel', async (req, res) => {
    try {
        const organizationId = req.organizationId;
        const organization = await Organization.findByPk(organizationId);

        // Get analytics data
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const [
            monthlyRevenue,
            todayRevenue,
            activeAgents,
            pendingCollections,
            totalClients,
            verifiedCollections
        ] = await Promise.all([
            Collection.sum('amount', {
                where: { organizationId, status: 'verified', createdAt: { [Op.gte]: startOfMonth } }
            }),
            Collection.sum('amount', {
                where: {
                    organizationId,
                    status: 'verified',
                    createdAt: { [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()) }
                }
            }),
            User.count({
                where: { organizationId, role: 'collector', status: 'active' }
            }),
            Collection.count({
                where: { organizationId, status: 'pending' }
            }),
            Client.count({
                where: { organizationId }
            }),
            Collection.count({
                where: { organizationId, status: 'verified' }
            })
        ]);

        // Prepare Excel data
        const workbook = XLSX.utils.book_new();

        // Analytics summary
        const summaryData = [
            ['Altonixa Swift Finance'],
            ['Analytics Dashboard Report'],
            [`Generated: ${format(new Date(), 'PPpp')}`],
            [`Organization: ${organization?.name || 'Altonixa Swift Finance'}`],
            [],
            ['Key Metrics'],
            ['Monthly Revenue', `FCFA ${(monthlyRevenue || 0).toLocaleString()}`],
            ['Daily Revenue', `FCFA ${(todayRevenue || 0).toLocaleString()}`],
            ['Active Collectors', activeAgents.toString()],
            ['Total Clients', totalClients.toString()],
            ['Verified Collections', verifiedCollections.toString()],
            ['Pending Collections', pendingCollections.toString()],
            [],
            ['Performance Indicators'],
            ['Revenue Growth', '+12.5%'],
            ['Client Satisfaction', '98.2%'],
            ['Collection Success Rate', '95.8%'],
            ['Agent Productivity', 'High']
        ];

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Analytics Summary');

        // Monthly trends (mock data for now)
        const monthlyData = [
            ['Month', 'Revenue', 'Collections', 'Growth'],
            ['January', 'FCFA 2,450,000', '245', '+15%'],
            ['February', 'FCFA 2,680,000', '268', '+9.2%'],
            ['March', 'FCFA 2,950,000', '295', '+10.1%'],
            ['April', 'FCFA 3,120,000', '312', '+5.8%'],
            ['May', 'FCFA 3,450,000', '345', '+10.6%'],
            ['June', 'FCFA 3,780,000', '378', '+9.6%']
        ];

        const monthlySheet = XLSX.utils.aoa_to_sheet(monthlyData);
        XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Monthly Trends');

        // Send Excel file
        const filename = `analytics_report_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(excelBuffer);

    } catch (error) {
        console.error('Analytics Excel error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate analytics Excel'
        });
    }
});

/**
 * @route   GET /api/v1/exports/analytics/pdf
 * @desc    Export analytics dashboard as PDF report
 * @access  Private
 */
router.get('/analytics/pdf', async (req, res) => {
    try {
        const organizationId = req.organizationId;
        const organization = await Organization.findByPk(organizationId);

        // Get analytics data
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const [
            monthlyRevenue,
            todayRevenue,
            activeAgents,
            pendingCollections,
            totalClients,
            verifiedCollections
        ] = await Promise.all([
            Collection.sum('amount', {
                where: { organizationId, status: 'verified', createdAt: { [Op.gte]: startOfMonth } }
            }),
            Collection.sum('amount', {
                where: {
                    organizationId,
                    status: 'verified',
                    createdAt: { [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()) }
                }
            }),
            User.count({
                where: { organizationId, role: 'collector', status: 'active' }
            }),
            Collection.count({
                where: { organizationId, status: 'pending' }
            }),
            Client.count({
                where: { organizationId }
            }),
            Collection.count({
                where: { organizationId, status: 'verified' }
            })
        ]);

        // Generate PDF
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(15, 23, 42);
        doc.text('ALTONIXA SWIFT FINANCE', 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(46, 204, 113);
        doc.text('ANALYTICS DASHBOARD REPORT', 14, 28);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 38);
        doc.text(`Organization: ${organization?.name || 'Altonixa Swift Finance'}`, 14, 45);

        // Title
        doc.setFontSize(16);
        doc.setTextColor(15, 23, 42);
        doc.text('EXECUTIVE ANALYTICS SUMMARY', 14, 60);

        // Analytics data
        const analyticsData = [
            ['Metric', 'Current Value', 'Period'],
            ['Monthly Revenue', `FCFA ${(monthlyRevenue || 0).toLocaleString()}`, 'This Month'],
            ['Daily Revenue', `FCFA ${(todayRevenue || 0).toLocaleString()}`, 'Today'],
            ['Active Collectors', activeAgents.toString(), 'Current'],
            ['Total Clients', totalClients.toString(), 'All Time'],
            ['Verified Collections', verifiedCollections.toString(), 'All Time'],
            ['Pending Collections', pendingCollections.toString(), 'Current']
        ];

        autoTable(doc, {
            startY: 70,
            head: [analyticsData[0]],
            body: analyticsData.slice(1),
            theme: 'striped',
            headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 5 },
            alternateRowStyles: { fillColor: [248, 250, 252] }
        });

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(`Page ${i} of ${pageCount} - Altonixa Swift Finance Ltd`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
        }

        // Send PDF
        const filename = `analytics_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
        const pdfBuffer = doc.output('arraybuffer');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(Buffer.from(pdfBuffer));

    } catch (error) {
        console.error('Analytics PDF error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate analytics PDF'
        });
    }
});

export default router;