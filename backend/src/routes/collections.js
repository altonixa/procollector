import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { Collection, Client, User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import { collectionLimiter } from '../middleware/rateLimiter.js';
import { uploadProof, handleUploadError } from '../middleware/upload.js';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/emailService.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/v1/collections
// @desc    Get all collections (filtered by organization and role)
// @access  Private
router.get('/',
    [
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('status').optional().isIn(['pending', 'verified', 'rejected', 'reversed']),
        query('collectorId').optional().isUUID(),
        query('clientId').optional().isUUID(),
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

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const offset = (page - 1) * limit;

            // Build query filters
            const where = { organizationId: req.organizationId };

            if (req.query.status) {
                where.status = req.query.status;
            }

            if (req.query.collectorId) {
                where.collectorId = req.query.collectorId;
            } else if (req.user.role === 'collector') {
                // Collectors can only see their own collections
                where.collectorId = req.userId;
            }

            if (req.query.clientId) {
                where.clientId = req.query.clientId;
            }

            if (req.query.startDate || req.query.endDate) {
                where.collectedAt = {};
                if (req.query.startDate) {
                    where.collectedAt.$gte = new Date(req.query.startDate);
                }
                if (req.query.endDate) {
                    where.collectedAt.$lte = new Date(req.query.endDate);
                }
            }

            const { count, rows } = await Collection.findAndCountAll({
                where,
                include: [
                    {
                        model: Client,
                        as: 'client',
                        attributes: ['id', 'fullName', 'phone']
                    },
                    {
                        model: User,
                        as: 'collector',
                        attributes: ['id', 'name', 'email']
                    }
                ],
                limit,
                offset,
                order: [['collectedAt', 'DESC']]
            });

            res.json({
                success: true,
                data: {
                    collections: rows,
                    pagination: {
                        total: count,
                        page,
                        limit,
                        totalPages: Math.ceil(count / limit)
                    }
                }
            });
        } catch (error) {
            console.error('Get collections error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch collections.'
            });
        }
    }
);

// @route   POST /api/v1/collections
// @desc    Create a new collection
// @access  Private (Collector)
router.post('/',
    authorize('collector', 'Manager', 'organization', 'admin'),
    collectionLimiter,
    uploadProof.single('proofImage'),
    [
        body('clientId').isUUID().withMessage('Valid client ID is required'),
        body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
        body('description').optional().trim(),
        body('paymentMethod').isIn(['cash', 'mobile_money', 'bank_transfer', 'card']),
        body('latitude').optional().isFloat({ min: -90, max: 90 }),
        body('longitude').optional().isFloat({ min: -180, max: 180 }),
        body('collectedAt').optional().isISO8601()
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

            const { clientId, amount, description, paymentMethod, latitude, longitude, collectedAt } = req.body;

            // Verify client belongs to same organization
            const client = await Client.findOne({
                where: {
                    id: clientId,
                    organizationId: req.organizationId
                }
            });

            if (!client) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found or does not belong to your organization.'
                });
            }

            // Generate unique receipt number
            const receiptNumber = `REC-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;

            // Handle proof image
            let proofImagePath = null;
            if (req.file) {
                proofImagePath = req.file.filename;
            }

            // Create collection
            const collection = await Collection.create({
                organizationId: req.organizationId,
                collectorId: req.userId,
                clientId,
                amount,
                description,
                paymentMethod,
                latitude,
                longitude,
                receiptNumber,
                collectedAt: collectedAt || new Date(),
                status: 'pending',
                metadata: proofImagePath ? { proofImage: proofImagePath } : undefined
            });

            // Fetch full collection with associations
            const fullCollection = await Collection.findByPk(collection.id, {
                include: [
                    {
                        model: Client,
                        as: 'client',
                        attributes: ['id', 'fullName', 'phone']
                    },
                    {
                        model: User,
                        as: 'collector',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });

            // Send receipt email
            if (client.email) {
                const newBalance = Number(client.balance) + Number(amount);
                await emailService.sendCollectionReceiptEmail(
                    client.email,
                    client.fullName,
                    `FCFA ${Number(amount).toLocaleString()}`,
                    new Date().toLocaleDateString(),
                    `FCFA ${newBalance.toLocaleString()}`,
                    paymentMethod.replace('_', ' ')
                );
            }

            res.status(201).json({
                success: true,
                data: { collection: fullCollection }
            });
        } catch (error) {
            console.error('Create collection error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create collection.'
            });
        }
    }
);

// @route   PATCH /api/v1/collections/:id/verify
// @desc    Verify a collection
// @access  Private (Manager, Organization, Admin)
router.patch('/:id/verify',
    authorize('Manager', 'organization', 'admin'),
    async (req, res) => {
        try {
            const collection = await Collection.findOne({
                where: {
                    id: req.params.id,
                    organizationId: req.organizationId
                }
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    error: 'Collection not found.'
                });
            }

            if (collection.status !== 'pending') {
                return res.status(400).json({
                    success: false,
                    error: `Collection is already ${collection.status}.`
                });
            }

            await collection.update({
                status: 'verified',
                verifiedAt: new Date()
            });

            res.json({
                success: true,
                data: { collection }
            });
        } catch (error) {
            console.error('Verify collection error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to verify collection.'
            });
        }
    }
);

// @route   PATCH /api/v1/collections/:id/reject
// @desc    Reject a collection
// @access  Private (Manager, Organization, Admin)
router.patch('/:id/reject',
    authorize('Manager', 'organization', 'admin'),
    [body('reason').notEmpty().withMessage('Rejection reason is required')],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const collection = await Collection.findOne({
                where: {
                    id: req.params.id,
                    organizationId: req.organizationId
                }
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    error: 'Collection not found.'
                });
            }

            if (collection.status !== 'pending') {
                return res.status(400).json({
                    success: false,
                    error: `Collection is already ${collection.status}.`
                });
            }

            await collection.update({
                status: 'rejected',
                metadata: {
                    ...collection.metadata,
                    rejectionReason: req.body.reason,
                    rejectedBy: req.userId,
                    rejectedAt: new Date()
                }
            });

            res.json({
                success: true,
                data: { collection }
            });
        } catch (error) {
            console.error('Reject collection error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to reject collection.'
            });
        }
    }
);

/**
 * @route   GET /api/v1/collections/stats
 * @desc    Get collection statistics for dashboards
 * @access  Private
 */
router.get('/stats', async (req, res) => {
    try {
        const organizationId = req.organizationId;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        // Today's collections
        const todayCollections = await Collection.sum('amount', {
            where: {
                organizationId,
                createdAt: { [Op.gte]: startOfDay },
                status: 'verified'
            }
        });

        // Monthly collections
        const monthlyCollections = await Collection.sum('amount', {
            where: {
                organizationId,
                createdAt: { [Op.gte]: startOfMonth },
                status: 'verified'
            }
        });

        // Total collections (year)
        const yearlyCollections = await Collection.sum('amount', {
            where: {
                organizationId,
                createdAt: { [Op.gte]: startOfYear },
                status: 'verified'
            }
        });

        // Active collectors count
        const activeCollectors = await User.count({
            where: {
                organizationId,
                role: 'collector',
                status: 'active'
            }
        });

        // Pending collections
        const pendingCollections = await Collection.count({
            where: {
                organizationId,
                status: 'pending'
            }
        });

        // Success rate (verified/total for last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const [totalRecent, verifiedRecent] = await Promise.all([
            Collection.count({
                where: {
                    organizationId,
                    createdAt: { [Op.gte]: thirtyDaysAgo }
                }
            }),
            Collection.count({
                where: {
                    organizationId,
                    createdAt: { [Op.gte]: thirtyDaysAgo },
                    status: 'verified'
                }
            })
        ]);

        const successRate = totalRecent > 0 ? ((verifiedRecent / totalRecent) * 100).toFixed(1) : '0';

        res.json({
            success: true,
            data: {
                todayCollections: todayCollections || 0,
                monthlyCollections: monthlyCollections || 0,
                yearlyCollections: yearlyCollections || 0,
                activeCollectors,
                pendingCollections,
                successRate: `${successRate}%`
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics'
        });
    }
});

export default router;
