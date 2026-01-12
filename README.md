# Altonixa Swift Finance - Digital Collection Platform

> **Senior Developer**: Aloah Milton | **Company**: Altonixa Group Ltd

A comprehensive, multi-tenant SaaS platform for digital financial collections, accountability, and revenue management. Built for governments, financial institutions, and organizations that collect payments through field agents.

![Altonixa Swift Finance](https://img.shields.io/badge/Altonixa-Swift%20Finance-2563eb?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjE4QzE0IDIwLjIgMTIuMiAyMiAxMCAyMkg0QzEuOCAyMiAwIDIwLjIgMCAxOFYwQzAgMS44IDEuOCAwIDQgMFYxNkM0IDE3LjEgNC45IDE4IDYgMThIMTZDNS44IDE4IDUgMTYuMSA1IDE0VjJDNSAwLjkgNS45IDAgNyAwVjE0QzcgMTUuMSAxNy45IDE2IDkgMTZIMTJDMTMuMSAxNiAxNCAxNS4xIDE0IDE0VjRDMTQgMi45IDEzLjEgMiAxMiAyWk0xMCAxOFY2QzEwIDQuOSAxMC45IDQgMTIgNFYxNkMxMCAxNy4xIDkuMSAxOCA4IDE4SDEwWk04IDZIMTZWMTZIMTZWNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479a1?style=flat-square&logo=mysql)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Support](#support)

## 🎯 Overview

**Altonixa Swift Finance** is an enterprise-grade digital collection platform that eliminates revenue leakages, fraud, and manual errors in field-based financial operations. Designed specifically for African markets, it provides real-time collection tracking, automated reporting, and transparent accountability for organizations that collect payments through field agents.

### Target Markets
- **Government Agencies**: Municipal councils, tax authorities, regulatory bodies
- **Financial Institutions**: Banks, microfinance, cooperatives
- **Commercial Organizations**: Transport unions, property managers, utilities
- **Educational Institutions**: Schools, universities, training centers

### Subscription Models
**Altonixa Swift Finance** supports flexible subscription models:

#### **🏢 Parent Domain Subscriptions**
- **Enterprise-wide access** for large organizations
- **Unified administration** across multiple departments
- **Centralized billing** and management
- **Cross-departmental analytics** and reporting

#### **🌐 Subdomain Subscriptions**
- **Department-specific portals** for specialized units
- **Isolated data environments** for regulatory compliance
- **Customized workflows** per department needs
- **Independent scaling** and resource allocation

*Users can subscribe to either parent domain (organization-wide) or subdomain (department-specific) access based on their operational requirements.*

## 🚀 Key Features

### Multi-Role Portal System
- **🏢 Admin Portal**: System administration and organization management
- **🏛️ Organization Portal**: Institution-level operations and analytics
- **👔 Manager Portal**: Field operations oversight and agent management
- **🏃 Collector Portal**: Mobile-first collection interface
- **👥 Client Portal**: Payment tracking and receipt verification
- **🔍 Auditor Portal**: Compliance monitoring and audit trails

### Core Capabilities
- ✅ **Real-time GPS Tracking** - Location-aware collections
- ✅ **Digital Receipts** - QR-coded, tamper-proof receipts
- ✅ **Automated Reporting** - PDF/Excel exports with professional branding
- ✅ **File Upload System** - Proof images and receipt management
- ✅ **Offline Support** - Collections work without internet
- ✅ **Multi-tenant Architecture** - Isolated data per organization
- ✅ **Role-based Security** - Granular permissions and access control
- ✅ **Audit Compliance** - Complete transaction trails and verification
- ✅ **Mobile-First Design** - Optimized for field operations

### Business Intelligence
- 📊 **Real-time Dashboards** - Live KPIs and performance metrics
- 📈 **Advanced Analytics** - Revenue trends and collection patterns
- 🔄 **Automated Reconciliation** - Daily balancing and verification
- 📋 **Custom Reports** - Tailored reporting for different stakeholders
- 📱 **Mobile Monitoring** - Field operations visibility

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │   REST API      │    │   MySQL Database│
│   (TypeScript)  │◄──►│   (Node.js)     │◄──►│   (Sequelize)   │
│                 │    │                 │    │                 │
│ • Admin Portal  │    │ • JWT Auth      │    │ • Organizations │
│ • Manager Portal│    │ • Role-based    │    │ • Users         │
│ • Collector Portal│   │ • Validation    │    │ • Collections  │
│ • Client Portal │    │ • File Upload   │    │ • Clients       │
│ • Auditor Portal│    │ • PDF Generation│    │ • Audit Logs    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### System Components
- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + JWT Authentication
- **Database**: MySQL with Sequelize ORM
- **File Storage**: Local file system (configurable for AWS S3)
- **Real-time**: WebSocket support for live updates
- **Security**: Helmet, CORS, rate limiting, input validation

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.11.0
- **State Management**: React Context + useState
- **Charts**: Recharts 3.6.0
- **Maps**: Leaflet 1.9.4 + React-Leaflet
- **PDF Generation**: jsPDF 4.0.0 + jsPDF-AutoTable
- **Excel Export**: xlsx 0.18.5

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js 4.18.2
- **Database**: MySQL 8.0+ with Sequelize 6.35.2
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **File Upload**: Multer 1.4.5-lts.1
- **Validation**: Express-Validator 7.3.1
- **Security**: Helmet 7.1.0, CORS, Rate Limiting
- **File Upload**: Multer (configurable)
- **Email**: Nodemailer (service-based)

### Development Tools
- **Linting**: ESLint 9.39.1
- **Formatting**: Prettier (via ESLint)
- **Testing**: Jest (backend) + React Testing Library (frontend)
- **Version Control**: Git
- **CI/CD**: GitHub Actions (recommended)

## 📦 Installation

### Prerequisites
- **Node.js**: 20.0.0 or higher
- **MySQL**: 8.0 or higher
- **npm** or **yarn**: Latest stable version
- **Git**: For version control

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/altonixa/swift-finance.git
cd swift-finance

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npm run migrate
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Install frontend dependencies (in project root)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Configuration

Create `.env` file in backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=altonixa_swift_finance
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=24h

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Storage (optional)
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## ⚙️ Configuration

### Database Schema
The system uses the following main entities:
- **Organizations**: Multi-tenant isolation
- **Users**: Admin, Organization, Manager, Collector, Client, Auditor roles
- **Collections**: Payment transactions with GPS tracking
- **Clients**: Payers with payment history
- **AuditLogs**: Compliance and transaction trails

### User Roles & Permissions
- **Admin**: Full system access, organization management
- **Organization**: Institution-level operations
- **Manager**: Field operations oversight
- **Collector**: Field data collection
- **Client**: Payment tracking and verification
- **Auditor**: Read-only compliance monitoring

## 🎮 Usage

### Portal Access

1. **Visit**: `http://localhost:5173`
2. **Select Portal**: Choose your role (Admin/Organization/Manager/Collector/Client/Auditor)
3. **Login**: Use demo credentials or create accounts

### Demo Credentials

| Portal | Email | Password |
|--------|-------|----------|
| Admin | admin@demo.com | demodemo |
| Organization | organization@demo.com | demodemo |
| Manager | manager@demo.com | demodemo |
| Collector | collector@demo.com | demodemo |
| Client | client@demo.com | demodemo |
| Auditor | auditor@demo.com | demodemo |

### Key Workflows

#### For Collectors
1. Login to mobile-optimized interface
2. View assigned clients and routes
3. Record collections with GPS tracking
4. Generate digital receipts instantly
5. Sync data when back online

#### For Managers
1. Monitor collector locations in real-time
2. Review and approve collections
3. Generate performance reports
4. Manage agent assignments

#### For Organizations
1. View institution-wide analytics
2. Manage collectors and clients
3. Generate financial reports
4. Configure collection rules

#### For Clients
1. Track payment history
2. Verify receipts with QR codes
3. Submit disputes if needed
4. Download statements

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
All API endpoints require JWT authentication except login:

```bash
# Get token
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "subdomain": "organization"
}

# Use token in requests
Authorization: Bearer <your_jwt_token>
```

### Key Endpoints

#### Organizations
- `GET /organizations` - List all organizations (Admin only)
- `POST /organizations` - Create organization (Admin only)
- `PATCH /organizations/:id` - Update organization

#### Collections
- `GET /collections` - List collections (filtered by role)
- `POST /collections` - Create collection (Collector)
- `PATCH /collections/:id/verify` - Verify collection (Manager+)
- `GET /collections/stats` - Collection statistics

#### Users
- `GET /users/collectors` - List collectors (Organization+)
- `POST /users/collectors` - Create collector (Organization+)
- `PATCH /users/collectors/:id` - Update collector

#### Clients
- `GET /clients` - List clients (filtered by role)
- `POST /clients` - Create client (Organization+)
- `PATCH /clients/:id` - Update client

#### Exports
- `GET /exports/collections/pdf` - PDF report
- `GET /exports/collections/excel` - Excel spreadsheet
- `GET /exports/receipt/:id/pdf` - Individual receipt
- `GET /exports/analytics/pdf` - Analytics report

#### Dashboard
- `GET /dashboard/overview` - Organization overview
- `GET /dashboard/admin` - System admin dashboard
- `GET /dashboard/collector` - Collector dashboard

#### Files
- `GET /files/proof/:filename` - Download proof image (Authenticated users)
- `GET /files/receipt/:filename` - Download receipt PDF (Authenticated users)

## 💻 Development

### Project Structure
```
altonixa-swift-finance/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── config/         # Database, environment config
│   │   ├── middleware/     # Auth, validation, rate limiting
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic, email, etc.
│   │   └── server.js       # Express app entry point
│   ├── package.json
│   └── .env.example
├── src/                     # React frontend
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, helpers
│   ├── pages/              # Route components by portal
│   └── styles/             # Global styles
├── public/                 # Static assets
├── package.json
└── README.md
```

### Development Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
npm run dev          # Start dev server with nodemon
npm run start        # Production start
npm run migrate      # Run database migrations
npm run seed         # Seed database with test data
npm run test         # Run tests
```

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb config with React rules
- **Prettier**: Code formatting via ESLint
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Grouped by external libraries, then internal modules

### Database Migrations
```bash
# Create new migration
npx sequelize migration:generate --name create_new_table

# Run migrations
npm run migrate

# Undo last migration
npx sequelize db:migrate:undo

# Seed database
npm run seed
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

### Frontend Testing
```bash
npm run test              # Run React tests
npm run test:coverage     # With coverage
```

### Manual Testing
1. **Demo Accounts**: Test all portal functionalities
2. **Cross-browser**: Chrome, Firefox, Safari, Edge
3. **Mobile**: iOS Safari, Android Chrome
4. **Offline**: Test collector app without internet

## 🚀 Deployment

### Production Build
```bash
# Frontend
npm run build

# Backend
npm run build  # If using TypeScript compilation
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure production database
- Set up SSL certificates
- Configure reverse proxy (nginx recommended)

### Docker Deployment (Recommended)
```dockerfile
# Dockerfile for backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Server Requirements
- **RAM**: 2GB minimum, 4GB recommended
- **CPU**: 1 core minimum, 2 cores recommended
- **Storage**: 10GB minimum for database and uploads
- **Network**: Stable internet for real-time features

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m 'Add your feature'`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Create** Pull Request

### Code Standards
- Follow existing code style and patterns
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Pull Request Process
1. Ensure code builds successfully
2. All tests pass
3. Code is properly typed (TypeScript)
4. Documentation updated if needed
5. PR description explains the changes

## 🔒 Security

### Authentication & Authorization
- JWT tokens with expiration
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting on API endpoints

### Data Protection
- Input validation and sanitization
- SQL injection prevention (Sequelize ORM)
- XSS protection (React automatic)
- CSRF protection (SameSite cookies)

### Best Practices
- Never commit sensitive data
- Use environment variables for secrets
- Regular security audits
- Keep dependencies updated
- Implement proper logging

## 📄 License

**Proprietary Software** - Altonixa Group Ltd

This software is proprietary and confidential. All rights reserved.
Unauthorized use, reproduction, or distribution is strictly prohibited.

For licensing inquiries, contact: licensing@altonixa.com

## 📞 Support

### Technical Support
- **Email**: support@altonixa.com
- **Documentation**: [docs.altonixa.com](https://docs.altonixa.com)
- **Issue Tracker**: GitHub Issues (for developers)

### Business Inquiries
- **Sales**: sales@altonixa.com
- **Partnerships**: partners@altonixa.com
- **General**: info@altonixa.com

### Response Times
- **Critical Issues**: < 4 hours
- **General Support**: < 24 hours
- **Feature Requests**: Within 48 hours

---

## 👨‍💻 Developer Information

**Lead Developer**: Aloah Milton
**Company**: Altonixa Group Ltd
**Location**: [Company Location]
**Contact**: aloah.milton@altonixa.com

### Development Philosophy
- **Clean Architecture**: Separation of concerns, SOLID principles
- **Type Safety**: Full TypeScript implementation
- **User Experience**: Mobile-first, accessible design
- **Performance**: Optimized for African network conditions
- **Security**: Enterprise-grade security measures
- **Scalability**: Multi-tenant architecture for growth

### Architecture Decisions
- **React + TypeScript**: Modern, maintainable frontend
- **Node.js + Express**: Fast, scalable backend
- **MySQL + Sequelize**: Relational data with ORM
- **JWT Authentication**: Stateless, secure auth
- **Tailwind CSS**: Utility-first, consistent styling
- **Mobile-First**: Progressive enhancement approach

---

**Powered by Altonixa Group Ltd** © 2025. All rights reserved.

*Building the future of digital collections in Africa.* 🇨🇲🇬🇦🇨🇬🇹🇩🇨🇫
