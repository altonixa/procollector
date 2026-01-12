import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { Client, Collection, User, Organization } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = express.Router();

// All client dashboard routes require authentication and client role
router.use(authenticate);

// @route   GET /api/v1/client/dashboard
// @desc    Get client dashboard overview
// @access  Private (Client only)
router.get('/dashboard',
    async (req, res) => {
        try {
            const clientId = req.user.id; // Client user ID
            const organizationId = req.organizationId;

            // Get client basic info
            const client = await Client.findOne({
                where: { id: clientId, organizationId },
                include: [{ model: Organization, as: 'organization' }]
            });

            if (!client) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found.'
                });
            }

            // Get recent transactions
            const recentTransactions = await Collection.findAll({
                where: { clientId, organizationId },
                limit: 5,
                order: [['collectedAt', 'DESC']],
                include: [
                    { model: User, as: 'collector', attributes: ['name'] }
                ]
            });

            // Get payment statistics
            const totalPaid = await Collection.sum('amount', {
                where: { clientId, organizationId, status: 'verified' }
            });

            const pendingPayments = await Collection.count({
                where: { clientId, organizationId, status: 'pending' }
            });

            const lastPayment = await Collection.findOne({
                where: { clientId, organizationId, status: 'verified' },
                order: [['collectedAt', 'DESC']],
                include: [{ model: User, as: 'collector', attributes: ['name'] }]
            });

            res.json({
                success: true,
                data: {
                    client: {
                        id: client.id,
                        fullName: client.fullName,
                        phone: client.phone,
                        email: client.email,
                        balance: client.balance,
                        status: client.status
                    },
                    stats: {
                        totalPaid: totalPaid || 0,
                        pendingPayments,
                        lastPayment: lastPayment ? {
                            amount: lastPayment.amount,
                            date: lastPayment.collectedAt,
                            collector: lastPayment.collector?.name
                        } : null
                    },
                    recentTransactions: recentTransactions.map(tx => ({
                        id: tx.id,
                        amount: tx.amount,
                        date: tx.collectedAt,
                        collector: tx.collector?.name || 'Unknown',
                        status: tx.status,
                        method: tx.paymentMethod
                    }))
                }
            });
        } catch (error) {
            console.error('Client dashboard error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to load dashboard data'
            });
        }
    }
);

// @route   GET /api/v1/client/transactions
// @desc    Get client's transaction history
// @access  Private (Client only)
router.get('/transactions',
    [
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 50 }),
        query('status').optional().isIn(['pending', 'verified', 'rejected']),
        query('startDate').optional().isISO8601(),
        query('endDate').optional().isISO8601()
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

            const clientId = req.user.id;
            const organizationId = req.organizationId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const offset = (page - 1) * limit;

            // Build query filters
            const where = { clientId, organizationId };

            if (req.query.status) {
                where.status = req.query.status;
            }

            if (req.query.startDate || req.query.endDate) {
                where.collectedAt = {};
                if (req.query.startDate) where.collectedAt[Op.gte] = new Date(req.query.startDate);
                if (req.query.endDate) where.collectedAt[Op.lte] = new Date(req.query.endDate);
            }

            const { count, rows } = await Collection.findAndCountAll({
                where,
                limit,
                offset,
                order: [['collectedAt', 'DESC']],
                include: [
                    { model: User, as: 'collector', attributes: ['name', 'email'] },
                    { model: Organization, as: 'organization', attributes: ['name'] }
                ]
            });

            res.json({
                success: true,
                data: {
                    transactions: rows.map(tx => ({
                        id: tx.id,
                        amount: tx.amount,
                        description: tx.description,
                        paymentMethod: tx.paymentMethod,
                        status: tx.status,
                        collectedAt: tx.collectedAt,
                        collector: tx.collector?.name || 'Unknown',
                        collectorEmail: tx.collector?.email,
                        receiptNumber: tx.receiptNumber
                    })),
                    pagination: {
                        total: count,
                        page,
                        limit,
                        totalPages: Math.ceil(count / limit)
                    }
                }
            });
        } catch (error) {
            console.error('Client transactions error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to load transaction history'
            });
        }
    }
);

// @route   GET /api/v1/client/statements
// @desc    Get client's monthly statements
// @access  Private (Client only)
router.get('/statements',
    [
        query('year').optional().isInt({ min: 2020, max: 2030 }),
        query('month').optional().isInt({ min: 1, max: 12 })
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

            const clientId = req.user.id;
            const organizationId = req.organizationId;
            const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
            const month = req.query.month ? parseInt(req.query.month) - 1 : new Date().getMonth();

            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59);

            // Get all transactions for the month
            const transactions = await Collection.findAll({
                where: {
                    clientId,
                    organizationId,
                    collectedAt: { [Op.between]: [startDate, endDate] },
                    status: 'verified'
                },
                order: [['collectedAt', 'ASC']],
                include: [
                    { model: User, as: 'collector', attributes: ['name'] }
                ]
            });

            // Calculate statement summary
            const totalPaid = transactions.reduce((sum, tx) => sum + tx.amount, 0);
            const transactionCount = transactions.length;

            // Get opening balance (balance before this month)
            const openingBalanceQuery = await Collection.sum('amount', {
                where: {
                    clientId,
                    organizationId,
                    collectedAt: { [Op.lt]: startDate },
                    status: 'verified'
                }
            });

            const openingBalance = openingBalanceQuery || 0;
            const closingBalance = openingBalance + totalPaid;

            res.json({
                success: true,
                data: {
                    statement: {
                        clientId,
                        period: {
                            year,
                            month: month + 1,
                            monthName: new Date(year, month).toLocaleString('default', { month: 'long' })
                        },
                        openingBalance,
                        totalPaid,
                        transactionCount,
                        closingBalance,
                        generatedAt: new Date()
                    },
                    transactions: transactions.map(tx => ({
                        id: tx.id,
                        date: tx.collectedAt,
                        amount: tx.amount,
                        description: tx.description || 'Payment Collection',
                        collector: tx.collector?.name || 'Unknown',
                        receiptNumber: tx.receiptNumber
                    }))
                }
            });
        } catch (error) {
            console.error('Client statements error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate statement'
            });
        }
    }
);

// @route   POST /api/v1/client/disputes
// @desc    Create a new dispute
// @access  Private (Client only)
router.post('/disputes',
    [
        body('transactionId').isUUID().withMessage('Valid transaction ID is required'),
        body('reason').notEmpty().withMessage('Dispute reason is required'),
        body('description').optional().trim()
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

            const clientId = req.user.id;
            const organizationId = req.organizationId;
            const { transactionId, reason, description } = req.body;

            // Verify the transaction belongs to this client
            const transaction = await Collection.findOne({
                where: {
                    id: transactionId,
                    clientId,
                    organizationId
                },
                include: [
                    { model: User, as: 'collector', attributes: ['name', 'email'] }
                ]
            });

            if (!transaction) {
                return res.status(404).json({
                    success: false,
                    error: 'Transaction not found or does not belong to you.'
                });
            }

            // Check if dispute already exists for this transaction
            const existingDispute = await Collection.findOne({
                where: {
                    id: transactionId,
                    metadata: {
                        [Op.contains]: { disputeStatus: 'pending' }
                    }
                }
            });

            if (existingDispute) {
                return res.status(400).json({
                    success: false,
                    error: 'A dispute is already pending for this transaction.'
                });
            }

            // Update transaction with dispute information
            await transaction.update({
                status: 'disputed',
                metadata: {
                    ...transaction.metadata,
                    disputeStatus: 'pending',
                    disputeReason: reason,
                    disputeDescription: description,
                    disputeCreatedAt: new Date(),
                    disputeCreatedBy: clientId
                }
            });

            res.status(201).json({
                success: true,
                data: {
                    dispute: {
                        id: `DISPUTE-${transactionId}`,
                        transactionId,
                        reason,
                        description,
                        status: 'pending',
                        createdAt: new Date(),
                        transaction: {
                            id: transaction.id,
                            amount: transaction.amount,
                            date: transaction.collectedAt,
                            collector: transaction.collector?.name
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Create dispute error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create dispute'
            });
        }
    }
);

// @route   GET /api/v1/client/disputes
// @desc    Get client's disputes
// @access  Private (Client only)
router.get('/disputes',
    async (req, res) => {
        try {
            const clientId = req.user.id;
            const organizationId = req.organizationId;

            // Get all disputed transactions for this client
            const disputes = await Collection.findAll({
                where: {
                    clientId,
                    organizationId,
                    status: 'disputed'
                },
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: User, as: 'collector', attributes: ['name', 'email'] }
                ]
            });

            res.json({
                success: true,
                data: {
                    disputes: disputes.map(dispute => ({
                        id: `DISPUTE-${dispute.id}`,
                        transactionId: dispute.id,
                        reason: dispute.metadata?.disputeReason,
                        description: dispute.metadata?.disputeDescription,
                        status: dispute.metadata?.disputeStatus || 'pending',
                        createdAt: dispute.metadata?.disputeCreatedAt,
                        resolvedAt: dispute.metadata?.disputeResolvedAt,
                        resolution: dispute.metadata?.disputeResolution,
                        transaction: {
                            id: dispute.id,
                            amount: dispute.amount,
                            date: dispute.collectedAt,
                            collector: dispute.collector?.name,
                            receiptNumber: dispute.receiptNumber
                        }
                    }))
                }
            });
        } catch (error) {
            console.error('Get disputes error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to load disputes'
            });
        }
    }
);

// @route   PATCH /api/v1/client/profile
// @desc    Update client profile
// @access  Private (Client only)
router.patch('/profile',
    [
        body('fullName').optional().trim().isLength({ min: 2 }),
        body('phone').optional().isMobilePhone('any'),
        body('email').optional().isEmail().normalizeEmail()
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

            const clientId = req.user.id;
            const organizationId = req.organizationId;
            const updates = req.body;

            const client = await Client.findOne({
                where: { id: clientId, organizationId }
            });

            if (!client) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found.'
                });
            }

            await client.update(updates);

            res.json({
                success: true,
                data: {
                    client: {
                        id: client.id,
                        fullName: client.fullName,
                        phone: client.phone,
                        email: client.email,
                        balance: client.balance,
                        status: client.status
                    }
                }
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update profile'
            });
        }
    }
);

export default router;