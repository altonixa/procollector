export interface User {
  id: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'AGENT';
  email: string;
  phone?: string;
  password?: string; // Only used for creation/updates
  createdAt: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
  status: 'active' | 'inactive' | 'pending';
  notifications: boolean;
  twoFactorEnabled: boolean;
  permissions?: string[]; // Specific permissions beyond role
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  admins: string[]; // User IDs
  agents: string[]; // User IDs
  clients: string[]; // Client IDs
  createdAt: Date;
  updatedAt?: Date;
  status: 'active' | 'inactive' | 'archived';
  totalDeposits: number;
  lastActivityAt?: Date;
  settings?: {
    minDeposit?: number;
    maxDeposit?: number;
    allowedPaymentMethods?: string[];
    customFees?: {
      fixed?: number;
      commission?: number;
    };
  };
  metadata?: Record<string, any>;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  roomId: string;
  agentId: string;
  deposits: Deposit[];
  totalDeposits: number;
  lastDepositDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
  status: 'active' | 'inactive' | 'blocked';
  notes?: string;
  preferredPaymentMethod?: string;
  kycVerified: boolean;
  metadata?: Record<string, any>;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface Deposit {
  id: string;
  clientId: string;
  amount: number;
  description: string;
  roomId: string;
  agentId: string;
  adminId: string;
  date: Date;
  createdAt: Date;
  updatedAt?: Date;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  paymentMethod: string;
  transactionId?: string;
  fees: {
    fixed: number;
    commission: number;
    total: number;
  };
  metadata?: {
    paymentProvider?: string;
    paymentReference?: string;
    reversalReason?: string;
    notes?: string;
    [key: string]: any;
  };
}

export interface SystemSettings {
  companyName: string;
  fees: {
    fixed: number; // 1000 FCFA
    commissionPercentage: number;
    minimumFee?: number;
    maximumFee?: number;
  };
  currency: string;
  paymentGateways: {
    stripe?: {
      enabled: boolean;
      apiKey?: string;
      webhookSecret?: string;
    };
    flutterwave?: {
      enabled: boolean;
      publicKey?: string;
      secretKey?: string;
    };
    paypal?: {
      enabled: boolean;
      clientId?: string;
      clientSecret?: string;
    };
  };
  notifications: {
    email: {
      enabled: boolean;
      provider: string;
      fromEmail: string;
      fromName: string;
      templates: {
        [key: string]: {
          subject: string;
          body: string;
        };
      };
    };
    sms?: {
      enabled: boolean;
      provider: string;
      credentials?: Record<string, string>;
    };
    push?: {
      enabled: boolean;
      provider: string;
      credentials?: Record<string, string>;
    };
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays?: number;
    };
    twoFactorAuth: {
      required: boolean;
      allowedMethods: ('email' | 'sms' | 'authenticator')[];
    };
    sessionTimeout: number; // in minutes
    maxLoginAttempts: number;
  };
  audit: {
    enabled: boolean;
    retentionDays: number;
    events: string[]; // List of events to audit
  };
}
