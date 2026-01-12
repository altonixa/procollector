import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize, { testConnection } from './config/database.js';
import { Organization, User, Client, Collection } from './models/index.js';

// Import routes
import authRoutes from './routes/auth.js';
import collectionsRoutes from './routes/collections.js';
import transportRoutes from './routes/transport.js';
import hostelRoutes from './routes/hostel.js';
import inventoryRoutes from './routes/inventory.js';
import usersRoutes from './routes/users.js';
import clientsRoutes from './routes/clients.js';
import dashboardRoutes from './routes/dashboard.js';
import exportsRoutes from './routes/exports.js';
import organizationsRoutes from './routes/organizations.js';
import csvImportRoutes from './routes/csv-import.js';
import clientDashboardRoutes from './routes/client-dashboard.js';
import collectorDashboardRoutes from './routes/collector-dashboard.js';
import filesRoutes from './routes/files.js';

// Import middleware
import { apiLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'ProCollector API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/collections', collectionsRoutes);
app.use('/api/v1/transport', transportRoutes);
app.use('/api/v1/hostel', hostelRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/clients', clientsRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/exports', exportsRoutes);
app.use('/api/v1/organizations', organizationsRoutes);
app.use('/api/v1/csv-import', csvImportRoutes);
app.use('/api/v1/client', clientDashboardRoutes);
app.use('/api/v1/collector', collectorDashboardRoutes);
app.use('/api/v1/files', filesRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);

    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'development'
            ? err.message
            : 'Internal server error'
    });
});

// Database connection and server startup
const startServer = async () => {
    try {
        // Test database connection
        const isConnected = await testConnection();

        if (!isConnected) {
            console.error('❌ Failed to connect to database. Exiting...');
            process.exit(1);
        }

        // Sync database models (use { force: true } to drop and recreate tables)
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('✅ Database models synchronized');

        // Start server
        app.listen(PORT, () => {
            console.log(`\n🚀 ProCollector API Server`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Server running on: http://localhost:${PORT}`);
            console.log(`💚 Health check: http://localhost:${PORT}/health`);
            console.log(`📚 API Base: http://localhost:${PORT}/api/v1\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Closing server gracefully...');
    await sequelize.close();
    process.exit(0);
});

// Start the server
startServer();

export default app;
