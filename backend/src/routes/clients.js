import express from 'express';
import { body, query, validationResult } from 'express-validator'; // Added query
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize'; // Added Op

import Client from '../models/Client.js';

import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

/**
 * @route   GET /api/v1/clients
 * @desc    Get all clients (filtered by organization and role)
 * @access  Private
 */
router.get('/',
    authenticate,
    [
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('search').optional().trim(),
        query('collectorId').optional().isUUID()
    ],
    async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            const offset = (page - 1) * limit;

            const where = { organizationId: req.user.organizationId }; // Use req.user.organizationId

            // If collector, only show assigned clients? 
            // User said "Assigned Territory".
            // If I am a collector, I should see clients where assignedCollectorId = myId
            if (req.user.role === 'collector') {
                where.assignedCollectorId = req.user.id;
            } else if (req.query.collectorId) {
                where.assignedCollectorId = req.query.collectorId;
            }

            if (req.query.search) {
                where.fullName = { [Op.like]: `%${req.query.search}%` };
            }

            const { count, rows } = await Client.findAndCountAll({
                where,
                limit,
                offset,
                order: [['fullName', 'ASC']]
            });

            res.json({
                success: true,
                data: {
                    clients: rows,
                    pagination: {
                        total: count,
                        page,
                        limit,
                        totalPages: Math.ceil(count / limit)
                    }
                }
            });
        } catch (error) {
            console.error('Get clients error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch clients.'
            });
        }
    }
);

/**
 * @route   POST /api/v1/clients
 * @desc    Create a new client (Collector or Admin)
 * @access  Private (Collector, Admin, Organization)
 */
router.post(
    '/',
    authenticate,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').notEmpty().withMessage('Phone is required'),
        // body('roomNumber').notEmpty().withMessage('Room/Shop number is required'), // Made optional or replaced by Quarter
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, roomNumber, idCardNumber, quarter } = req.body;

        try {
            // Check if email already exists
            let existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Generate temporary password
            const tempPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(tempPassword, salt);

            // Create User account
            const user = await User.create({
                email,
                passwordHash,
                name,
                role: 'client',
                organizationId: req.user.organizationId,
                status: 'active'
            });

            // Create Client profile
            const client = await Client.create({
                userId: user.id,
                organizationId: req.user.organizationId,
                fullName: name, // Map 'name' to 'fullName' (Model field is fullName, Step 488)
                email,
                phone,
                address: roomNumber, // Map roomNumber to address
                quarter: quarter,
                idCardNumber: idCardNumber,
                balance: 0,
                status: 'active',
                assignedCollectorId: req.user.id // Associate with the creator (collector)
            });

            // Send welcome email
            // Use the correct login URL based on environment or default
            const loginUrl = process.env.CLIENT_URL || 'http://localhost:5173/login';

            await emailService.sendClientWelcomeEmail(
                email,
                name,
                tempPassword,
                loginUrl,
                phone,
                quarter || roomNumber
            );

            res.status(201).json({
                message: 'Client created successfully',
                client: {
                    id: client.id,
                    name: client.name,
                    email: client.email,
                    phone: client.phone,
                    roomNumber: client.location
                }
            });

        } catch (error) {
            console.error('Error creating client:', error);
            res.status(500).json({ message: 'Server error creating client' });
        }
    }
);

/**
 * @route   PUT /api/v1/clients/:id
 * @desc    Update a client
 * @access  Private (Admin, Organization, Collector)
 */
router.put('/:id',
    authenticate,
    [
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('email').optional().isEmail().withMessage('Valid email is required'),
        body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const client = await Client.findByPk(req.params.id);

            if (!client) {
                return res.status(404).json({ success: false, error: 'Client not found' });
            }

            // Check authorization
            if (req.user.role === 'collector' && client.assignedCollectorId !== req.user.id) {
                return res.status(403).json({ success: false, error: 'Not authorized to update this client' });
            }

            if (req.user.role === 'organization' && client.organizationId !== req.user.organizationId) {
                return res.status(403).json({ success: false, error: 'Not authorized for this organization' });
            }

            const { name, email, phone, status, quarter, address } = req.body;

            await client.update({
                fullName: name,
                email,
                phone,
                status,
                quarter,
                address
            });

            res.json({
                success: true,
                data: client,
                message: 'Client updated successfully'
            });
        } catch (error) {
            console.error('Update client error:', error);
            res.status(500).json({ success: false, error: 'Failed to update client' });
        }
    }
);

/**
 * @route   DELETE /api/v1/clients/:id
 * @desc    Delete a client
 * @access  Private (Admin, Organization, Collector)
 */
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(404).json({ success: false, error: 'Client not found' });
        }

        // Check authorization
        if (req.user.role === 'collector' && client.assignedCollectorId !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized to delete this client' });
        }

        if (req.user.role === 'organization' && client.organizationId !== req.user.organizationId) {
            return res.status(403).json({ success: false, error: 'Not authorized for this organization' });
        }

        await client.destroy();

        res.json({
            success: true,
            message: 'Client deleted successfully'
        });
    } catch (error) {
        console.error('Delete client error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete client' });
    }
});

export default router;
