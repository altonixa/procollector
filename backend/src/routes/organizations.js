import express from 'express';
import { body, validationResult } from 'express-validator';
import { Organization, User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All organization routes require authentication
router.use(authenticate);

// @route   GET /api/v1/organizations
// @desc    Get all organizations (Admin only)
// @access  Private (Admin)
router.get('/',
    authorize('admin'),
    async (req, res) => {
        try {
            const organizations = await Organization.findAll({
                include: [{
                    model: User,
                    as: 'users',
                    attributes: ['id', 'name', 'email', 'role']
                }],
                order: [['createdAt', 'DESC']]
            });

            res.json({
                success: true,
                data: {
                    organizations: organizations.map(org => ({
                        id: org.id,
                        name: org.name,
                        subdomain: org.subdomain,
                        type: org.type,
                        status: org.status,
                        plan: org.plan,
                        userCount: org.users?.length || 0,
                        activeAgents: org.users?.filter(u => u.role === 'collector' && u.status === 'active').length || 0,
                        createdAt: org.createdAt
                    }))
                }
            });
        } catch (error) {
            console.error('Get organizations error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch organizations.'
            });
        }
    }
);

// @route   POST /api/v1/organizations
// @desc    Create a new organization (Admin only)
// @access  Private (Admin)
router.post('/',
    authorize('admin'),
    [
        body('name').notEmpty().withMessage('Organization name is required'),
        body('subdomain').notEmpty().withMessage('Subdomain is required'),
        body('type').isIn(['COUNCIL', 'BANK', 'UNION', 'COMPANY']).withMessage('Invalid organization type'),
        body('plan').isIn(['Standard', 'Enterprise', 'Gold']).withMessage('Invalid plan')
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

            const { name, subdomain, type, plan } = req.body;

            // Check if organization with this subdomain already exists
            const existingOrg = await Organization.findOne({
                where: { subdomain }
            });

            if (existingOrg) {
                return res.status(400).json({
                    success: false,
                    error: 'Organization with this subdomain already exists.'
                });
            }

            // Create organization
            const organization = await Organization.create({
                name,
                subdomain,
                type,
                plan,
                status: 'active'
            });

            res.status(201).json({
                success: true,
                data: { organization }
            });
        } catch (error) {
            console.error('Create organization error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create organization.'
            });
        }
    }
);

// @route   PATCH /api/v1/organizations/:id
// @desc    Update organization (Admin only)
// @access  Private (Admin)
router.patch('/:id',
    authorize('admin'),
    [
        body('name').optional().notEmpty(),
        body('type').optional().isIn(['COUNCIL', 'BANK', 'UNION', 'COMPANY']),
        body('plan').optional().isIn(['Standard', 'Enterprise', 'Gold']),
        body('status').optional().isIn(['active', 'inactive', 'suspended'])
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

            const organization = await Organization.findByPk(req.params.id);

            if (!organization) {
                return res.status(404).json({
                    success: false,
                    error: 'Organization not found.'
                });
            }

            await organization.update(req.body);

            res.json({
                success: true,
                data: { organization }
            });
        } catch (error) {
            console.error('Update organization error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update organization.'
            });
        }
    }
);

// @route   DELETE /api/v1/organizations/:id
// @desc    Delete organization (Admin only)
// @access  Private (Admin)
router.delete('/:id',
    authorize('admin'),
    async (req, res) => {
        try {
            const organization = await Organization.findByPk(req.params.id);

            if (!organization) {
                return res.status(404).json({
                    success: false,
                    error: 'Organization not found.'
                });
            }

            // Check if organization has users
            const userCount = await User.count({
                where: { organizationId: organization.id }
            });

            if (userCount > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Cannot delete organization with active users.'
                });
            }

            await organization.destroy();

            res.json({
                success: true,
                message: 'Organization deleted successfully.'
            });
        } catch (error) {
            console.error('Delete organization error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete organization.'
            });
        }
    }
);

export default router;