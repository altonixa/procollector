// Action Types for Admin Operations
export type AdminAction =
  | 'CREATE_USER'
  | 'UPDATE_USER'
  | 'DELETE_USER'
  | 'CREATE_ROOM'
  | 'UPDATE_ROOM'
  | 'DELETE_ROOM'
  | 'MANAGE_DEPOSITS'
  | 'VIEW_REPORTS'
  | 'MANAGE_SETTINGS'
  | 'MANAGE_PERMISSIONS'
  | 'VIEW_AUDIT_LOGS'
  | 'MANAGE_KYC';

// Permission structure
export interface Permission {
  action: AdminAction;
  scope: 'all' | 'own' | 'room';
  conditions?: Record<string, any>;
}

// Role Definitions with associated permissions
export const RolePermissions: Record<string, Permission[]> = {
  SUPER_ADMIN: [
    { action: 'CREATE_USER', scope: 'all' },
    { action: 'UPDATE_USER', scope: 'all' },
    { action: 'DELETE_USER', scope: 'all' },
    { action: 'CREATE_ROOM', scope: 'all' },
    { action: 'UPDATE_ROOM', scope: 'all' },
    { action: 'DELETE_ROOM', scope: 'all' },
    { action: 'MANAGE_DEPOSITS', scope: 'all' },
    { action: 'VIEW_REPORTS', scope: 'all' },
    { action: 'MANAGE_SETTINGS', scope: 'all' },
    { action: 'MANAGE_PERMISSIONS', scope: 'all' },
    { action: 'VIEW_AUDIT_LOGS', scope: 'all' },
    { action: 'MANAGE_KYC', scope: 'all' },
  ],
  ADMIN: [
    { action: 'UPDATE_USER', scope: 'room' },
    { action: 'CREATE_ROOM', scope: 'own' },
    { action: 'UPDATE_ROOM', scope: 'own' },
    { action: 'MANAGE_DEPOSITS', scope: 'room' },
    { action: 'VIEW_REPORTS', scope: 'room' },
    { action: 'VIEW_AUDIT_LOGS', scope: 'room' },
    { action: 'MANAGE_KYC', scope: 'room' },
  ],
  AGENT: [
    { action: 'MANAGE_DEPOSITS', scope: 'own' },
    { action: 'VIEW_REPORTS', scope: 'own' },
  ],
};

// Activity Log Types
export interface ActivityLog {
  id: string;
  userId: string;
  action: AdminAction;
  targetId?: string;
  targetType?: 'user' | 'room' | 'deposit' | 'client' | 'setting';
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
  metadata?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// Audit Event Types
export type AuditEventType =
  | 'login'
  | 'logout'
  | 'password_change'
  | 'permission_change'
  | 'settings_change'
  | 'deposit_create'
  | 'deposit_update'
  | 'deposit_delete'
  | 'client_create'
  | 'client_update'
  | 'client_delete'
  | 'room_create'
  | 'room_update'
  | 'room_delete'
  | 'user_create'
  | 'user_update'
  | 'user_delete'
  | 'kyc_verify'
  | 'kyc_reject';

export interface AuditEvent {
  id: string;
  type: AuditEventType;
  userId: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  success: boolean;
  failureReason?: string;
}

// Error and Exception Types
export interface SystemError {
  id: string;
  code: string;
  message: string;
  stack?: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'resolved';
  resolution?: {
    resolvedBy: string;
    resolvedAt: Date;
    notes: string;
  };
}

// Notification Types
export interface SystemNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  recipients: string[];
  channels: ('email' | 'sms' | 'in_app')[];
  metadata?: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
  read: boolean;
  readAt?: Date;
}
