import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { Client, Collection, User, Organization } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { uploadProof, handleUploadError } from '../middleware/upload.js';
import { Op } from 'sequelize';

const router = express.Router();

// All collector dashboard routes require authentication and collector role
router.use(authenticate);

// @route   GET /api/v1/collector/dashboard
// @desc    Get collector dashboard overview
// @access  Private (Collector only)
router.get('/dashboard',
    async (req, res) => {
        try {
            const collectorId = req.user.id;
            const organizationId = req.organizationId;
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            // Today's collections
            const todayCollections = await Collection.sum('amount', {
                where: {
                    collectorId,
                    organizationId,
                    status: 'verified',
                    collectedAt: { [Op.gte]: startOfDay }
                }
            });

            // Monthly collections
            const monthlyCollections = await Collection.sum('amount', {
                where: {
                    collectorId,
                    organizationId,
                    status: 'verified',
                    collectedAt: { [Op.gte]: startOfMonth }
                }
            });

            // Active clients count
            const activeClients = await Client.count({
                where: {
                    organizationId,
                    assignedCollectorId: collectorId,
                    status: 'active'
                }
            });

            // Success rate (last 30 days)
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const [totalRecent, verifiedRecent] = await Promise.all([
                Collection.count({
                    where: {
                        collectorId,
                        organizationId,
                        collectedAt: { [Op.gte]: thirtyDaysAgo }
                    }
                }),
                Collection.count({
                    where: {
                        collectorId,
                        organizationId,
                        collectedAt: { [Op.gte]: thirtyDaysAgo },
                        status: 'verified'
                    }
                })
            ]);

            const successRate = totalRecent > 0 ? `${((verifiedRecent / totalRecent) * 100).toFixed(1)}%` : '0%';

            // Today's schedule (pending collections)
            const todaySchedule = await Collection.findAll({
                where: {
                    collectorId,
                    organizationId,
                    status: 'pending',
                    collectedAt: { [Op.gte]: startOfDay }
                },
                limit: 5,
                order: [['collectedAt', 'ASC']],
                include: [
                    { model: Client, as: 'client', attributes: ['fullName', 'phone', 'address'] }
                ]
            });

            res.json({
                success: true,
                data: {
                    stats: {
                        todayCollections: todayCollections || 0,
                        monthlyCollections: monthlyCollections || 0,
                        activeClients,
                        successRate
                    },
                    schedule: todaySchedule.map(item => ({
                        id: item.id,
                        client: item.client?.fullName || 'Unknown Client',
                        amount: item.amount,
                        address: item.client?.address || 'No address',
                        phone: item.client?.phone,
                        time: item.collectedAt.toTimeString().slice(0, 5),
                        description: item.description
                    }))
                }
            });
        } catch (error) {
            console.error('Collector dashboard error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to load dashboard data'
            });
        }
    }
);

// @route   GET /api/v1/collector/clients
// @desc    Get collector's assigned clients
// @access  Private (Collector only)
router.get('/clients',
    [
        query('search').optional().trim(),
        query('status').optional().isIn(['active', 'inactive'])
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

            const collectorId = req.user.id;
            const organizationId = req.organizationId;

            const where = {
                organizationId,
                assignedCollectorId: collectorId
            };

            if (req.query.status) {
                where.status = req.query.status;
            }

            if (req.query.search) {
                where.fullName = { [Op.like]: `%${req.query.search}%` };
            }

            const clients = await Client.findAll({
                where,
                order: [['fullName', 'ASC']],
                attributes: ['id', 'fullName', 'phone', 'address', 'status', 'balance']
            });

            res.json({
                success: true,
                data: {
                    clients: clients.map(client => ({
                        id: client.id,
                        name: client.fullName,
                        phone: client.phone,
                        address: client.address,
                        status: client.status,
                        balance: client.balance
                    }))
                }
            });
        } catch (error) {
            console.error('Collector clients error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to load clients'
            });
        }
    }
);

// @route   POST /api/v1/collector/collections
// @desc    Submit a new collection
// @access  Private (Collector only)
router.post('/collections',
    uploadProof.single('proofImage'),
    [
        body('clientId').isUUID().withMessage('Valid client ID is required'),
        body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
        body('paymentMethod').isIn(['cash', 'mobile_money', 'bank_transfer', 'card']),
        body('description').optional().trim(),
        body('latitude').optional().isFloat({ min: -90, max: 90 }),
        body('longitude').optional().isFloat({ min: -180, max: 180 })
    ],
    handleUploadError,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const collectorId = req.user.id;
            const organizationId = req.organizationId;
            const { clientId, amount, paymentMethod, description, latitude, longitude } = req.body;

            // Verify client belongs to collector and organization
            const client = await Client.findOne({
                where: {
                    id: clientId,
                    organizationId,
                    assignedCollectorId: collectorId
                }
            });

            if (!client) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found or not assigned to you.'
                });
            }

            // Generate unique receipt number
            const receiptNumber = `COL-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

            // Handle proof image
            let proofImagePath = null;
            if (req.file) {
                proofImagePath = req.file.filename;
            }

            // Create collection
            const collection = await Collection.create({
                organizationId,
                collectorId,
                clientId,
                amount,
                description: description || 'Field collection',
                paymentMethod,
                latitude,
                longitude,
                receiptNumber,
                collectedAt: new Date(),
                status: 'pending', // Collections start as pending for verification
                metadata: proofImagePath ? { proofImage: proofImagePath } : undefined
            });

            // Update client balance
            await client.update({
                balance: Number(client.balance) + Number(amount)
            });

            res.status(201).json({
                success: true,
                data: {
                    collection: {
                        id: collection.id,
                        receiptNumber,
                        amount: collection.amount,
                        status: collection.status,
                        collectedAt: collection.collectedAt
                    },
                    message: 'Collection submitted successfully and pending verification.'
                }
            });
        } catch (error) {
            console.error('Submit collection error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to submit collection.'
            });
        }
    }
);

// @route   GET /api/v1/collector/collections
// @desc    Get collector's collection history
// @access  Private (Collector only)
router.get('/collections',
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

            const collectorId = req.user.id;
            const organizationId = req.organizationId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const offset = (page - 1) * limit;

            const where = { collectorId, organizationId };

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
                    { model: Client, as: 'client', attributes: ['fullName', 'phone'] }
                ]
            });

            res.json({
                success: true,
                data: {
                    collections: rows.map(collection => ({
                        id: collection.id,
                        clientName: collection.client?.fullName || 'Unknown Client',
                        amount: collection.amount,
                        paymentMethod: collection.paymentMethod,
                        status: collection.status,
                        collectedAt: collection.collectedAt,
                        receiptNumber: collection.receiptNumber,
                        description: collection.description
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
            console.error('Collector collections error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to load collections'
            });
        }
    }
);

// @route   POST /api/v1/collector/deposits
// @desc    Submit a deposit/withdrawal request
// @access  Private (Collector only)
router.post('/deposits',
    [
        body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
        body('type').isIn(['deposit', 'withdrawal']).withMessage('Type must be deposit or withdrawal'),
        body('description').optional().trim(),
        body('proofImage').optional().isURL() // Could be file upload in future
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

            const collectorId = req.user.id;
            const organizationId = req.organizationId;
            const { amount, type, description, proofImage } = req.body;

            // For now, we'll store this as metadata in a collection record
            // In production, this would be a separate deposits table
            const depositRecord = await Collection.create({
                organizationId,
                collectorId,
                clientId: null, // No client for deposits
                amount: type === 'deposit' ? amount : -amount,
                description: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${description || 'Bank transaction'}`,
                paymentMethod: 'bank_transfer',
                receiptNumber: `${type.toUpperCase()}-${Date.now()}`,
                collectedAt: new Date(),
                status: 'pending',
                metadata: {
                    transactionType: type,
                    proofImage,
                    submittedBy: collectorId
                }
            });

            res.status(201).json({
                success: true,
                data: {
                    deposit: {
                        id: depositRecord.id,
                        amount,
                        type,
                        status: 'pending',
                        submittedAt: depositRecord.collectedAt
                    },
                    message: `${type.charAt(0).toUpperCase() + type.slice(1)} request submitted successfully and pending approval.`
                }
            });
        } catch (error) {
            console.error('Submit deposit error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to submit deposit request.'
            });
        }
    }
);

export default router;