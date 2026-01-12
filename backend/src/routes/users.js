import express from 'express';
import { body, validationResult } from 'express-validator';
import { User, Organization } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import emailService from '../services/emailService.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Middleware
router.use(authenticate);
router.use(authorize(['admin', 'organization'])); // Managers can also create collectors

// @route   POST /api/v1/users/collectors
// @desc    Create a new collector (with email notification)
router.post('/collectors',
    [
        body('email').isEmail().normalizeEmail(),
        body('name').notEmpty(),
        body('phone').optional(),
        body('baseSalary').isFloat({ min: 0 }),
        body('commissionRate').isFloat({ min: 0, max: 100 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { email, name, phone, baseSalary, commissionRate } = req.body;
            const organizationId = req.user.organizationId;

            // Check if user exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ success: false, error: 'User with this email already exists.' });
            }

            // Generate a secure random password
            const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();

            // Create user
            const newUser = await User.create({
                email,
                name,
                phone,
                passwordHash: tempPassword, // Will be hashed by hook
                role: 'collector',
                status: 'active',
                organizationId,
                baseSalary,
                commissionRate,
                twoFactorEnabled: false
            });

            // Send welcome email
            // Note: In production, use a queue for email sending to prevent blocking response
            try {
                const loginUrl = process.env.CLIENT_URL || 'http://localhost:5173/login';
                await emailService.sendCollectorWelcomeEmail(
                    email,
                    name,
                    tempPassword,
                    loginUrl,
                    baseSalary,
                    commissionRate
                );
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
                // We don't rollback user creation, but we warn the client
                return res.status(201).json({
                    success: true,
                    data: newUser,
                    warning: 'User created but failed to send email. Please reset password manually.'
                });
            }

            // Remove password hash from response
            const userResponse = newUser.toJSON();
            delete userResponse.passwordHash;

            res.status(201).json({
                success: true,
                message: 'Collector created and email sent successfully.',
                data: userResponse
            });

        } catch (error) {
            console.error('Create collector error:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
);

// @route   GET /api/v1/users/collectors
// @desc    Get all collectors for organization
router.get('/collectors', async (req, res) => {
    try {
        const collectors = await User.findAll({
            where: {
                organizationId: req.user.organizationId,
                role: 'collector'
            },
            attributes: { exclude: ['passwordHash'] },
            order: [['createdAt', 'DESC']]
        });

        res.json({ success: true, count: collectors.length, data: collectors });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   PATCH /api/v1/users/:id/profile
// @desc    Update user profile (self or admin)
router.patch('/:id/profile', async (req, res) => {
    try {
        // Validation: Users can update own profile, Admins can update any
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        const { name, phone } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Check organization boundary for admins
        if (req.user.role === 'admin' && user.organizationId !== req.user.organizationId) {
            return res.status(403).json({ success: false, error: 'Not authorized for this organization' });
        }

        await user.update({ name, phone });

        res.json({ success: true, data: user.toAuthJSON() });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   PUT /api/v1/users/collectors/:id
// @desc    Update a collector
router.put('/collectors/:id',
    [
        body('email').optional().isEmail().normalizeEmail(),
        body('name').optional().notEmpty(),
        body('phone').optional(),
        body('baseSalary').optional().isFloat({ min: 0 }),
        body('commissionRate').optional().isFloat({ min: 0, max: 100 }),
        body('status').optional().isIn(['active', 'inactive', 'pending', 'blocked'])
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const collector = await User.findOne({
                where: {
                    id: req.params.id,
                    role: 'collector',
                    organizationId: req.user.organizationId
                }
            });

            if (!collector) {
                return res.status(404).json({ success: false, error: 'Collector not found' });
            }

            const { email, name, phone, baseSalary, commissionRate, status } = req.body;

            await collector.update({
                email,
                name,
                phone,
                baseSalary,
                commissionRate,
                status
            });

            // Remove password hash from response
            const collectorResponse = collector.toJSON();
            delete collectorResponse.passwordHash;

            res.json({
                success: true,
                message: 'Collector updated successfully',
                data: collectorResponse
            });
        } catch (error) {
            console.error('Update collector error:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
);

// @route   DELETE /api/v1/users/collectors/:id
// @desc    Delete a collector
router.delete('/collectors/:id', async (req, res) => {
    try {
        const collector = await User.findOne({
            where: {
                id: req.params.id,
                role: 'collector',
                organizationId: req.user.organizationId
            }
        });

        if (!collector) {
            return res.status(404).json({ success: false, error: 'Collector not found' });
        }

        await collector.destroy();

        res.json({
            success: true,
            message: 'Collector deleted successfully'
        });
    } catch (error) {
        console.error('Delete collector error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default router;
