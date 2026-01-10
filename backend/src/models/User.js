import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'organization_id',
        references: {
            model: 'organizations',
            key: 'id'
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'organization', 'Manager', 'collector', 'client', 'auditor'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending', 'blocked'),
        defaultValue: 'pending'
    },
    twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'two_factor_enabled'
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login_at'
    },
    baseSalary: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00,
        field: 'base_salary'
    },
    commissionRate: {
        type: DataTypes.DECIMAL(5, 2), // Percentage, e.g., 5.00 for 5%
        defaultValue: 0.00,
        field: 'commission_rate'
    }
}, {
    tableName: 'users',
    indexes: [
        { fields: ['organization_id', 'role'] },
        { fields: ['email'] }
    ],
    hooks: {
        beforeCreate: async (user) => {
            if (user.passwordHash) {
                user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('passwordHash')) {
                user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
            }
        }
    }
});

// Instance method to verify password
User.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};

// Instance method to generate JWT payload
User.prototype.toAuthJSON = function () {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        role: this.role,
        organizationId: this.organizationId
    };
};

export default User;
