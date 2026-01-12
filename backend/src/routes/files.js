import express from 'express';
import path from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/auth.js';
import { Collection } from '../models/index.js';

const router = express.Router();

// All file routes require authentication
router.use(authenticate);

// @route   GET /api/v1/files/proof/:filename
// @desc    Download proof image for a collection
// @access  Private (Collector, Manager, Organization, Admin)
router.get('/proof/:filename', async (req, res) => {
    try {
        const filename = req.file.filename;
        const userId = req.user.id;
        const organizationId = req.organizationId;
        const userRole = req.user.role;

        // Find collection with this proof image
        const collection = await Collection.findOne({
            where: {
                organizationId,
                metadata: {
                    proofImage: filename
                }
            }
        });

        if (!collection) {
            return res.status(404).json({
                success: false,
                error: 'File not found'
            });
        }

        // Check permissions: collectors can only see their own, others can see all in their org
        if (userRole === 'collector' && collection.collectorId !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Access denied'
            });
        }

        const filePath = path.join(process.env.UPLOAD_PATH || './uploads', 'proofs', filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: 'File not found on disk'
            });
        }

        // Set appropriate headers and send file
        res.setHeader('Content-Type', 'image/jpeg'); // Default to JPEG, browser will handle
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        res.sendFile(filePath);

    } catch (error) {
        console.error('File download error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to download file'
        });
    }
});

// @route   GET /api/v1/files/receipt/:filename
// @desc    Download receipt PDF
// @access  Private (All authenticated users)
router.get('/receipt/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const organizationId = req.organizationId;

        // Find collection with this receipt
        const collection = await Collection.findOne({
            where: {
                organizationId,
                receiptNumber: filename.replace('.pdf', '').replace('REC-', '').split('-').slice(0, 3).join('-')
            }
        });

        if (!collection) {
            return res.status(404).json({
                success: false,
                error: 'Receipt not found'
            });
        }

        const filePath = path.join(process.env.UPLOAD_PATH || './uploads', 'receipts', filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: 'Receipt file not found'
            });
        }

        // Set headers and send file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        res.sendFile(filePath);

    } catch (error) {
        console.error('Receipt download error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to download receipt'
        });
    }
});

export default router;