import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_PATH || './uploads';
const proofDir = path.join(uploadDir, 'proofs');
const receiptsDir = path.join(uploadDir, 'receipts');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(proofDir)) {
    fs.mkdirSync(proofDir, { recursive: true });
}
if (!fs.existsSync(receiptsDir)) {
    fs.mkdirSync(receiptsDir, { recursive: true });
}

// Storage configuration for proof images
const proofStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, proofDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// File filter for images
const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Upload middleware
export const uploadProof = multer({
    storage: proofStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
    }
});

// Storage configuration for receipts (PDFs)
const receiptStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, receiptsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}.pdf`;
        cb(null, uniqueName);
    }
});

// File filter for PDFs
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

export const uploadReceipt = multer({
    storage: receiptStorage,
    fileFilter: pdfFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
    }
});

// Error handling middleware
export const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size allowed is 5MB.'
            });
        }
    }

    if (error.message.includes('Only')) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

    next(error);
};

export { uploadDir, proofDir, receiptsDir };