-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'organization', 'manager', 'collector', 'client', 'auditor')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    assigned_collector_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    account_number VARCHAR(100),
    balance DECIMAL(15,2) DEFAULT 0,
    credit_limit DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    collector_id UUID REFERENCES users(id),
    client_id UUID REFERENCES clients(id),
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('cash', 'mobile_money', 'bank_transfer', 'card')),
    description TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    receipt_number VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'cancelled')),
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hostel_rooms table
CREATE TABLE IF NOT EXISTS hostel_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    capacity INTEGER NOT NULL,
    floor INTEGER,
    building VARCHAR(100),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'cleaning')),
    monthly_rate DECIMAL(10,2),
    amenities JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(organization_id, room_number)
);

-- Create hostel_residents table
CREATE TABLE IF NOT EXISTS hostel_residents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    room_id UUID REFERENCES hostel_rooms(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    emergency_contact JSONB,
    lease_start DATE,
    lease_end DATE,
    monthly_rent DECIMAL(10,2),
    security_deposit DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory_items table
CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    sku VARCHAR(100) UNIQUE,
    unit VARCHAR(50) DEFAULT 'pieces',
    current_stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    maximum_stock INTEGER,
    unit_cost DECIMAL(10,2),
    unit_price DECIMAL(10,2),
    supplier_info JSONB,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory_transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    item_id UUID REFERENCES inventory_items(id),
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('stock_in', 'stock_out', 'adjustment', 'transfer')),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    reference_number VARCHAR(100),
    notes TEXT,
    performed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transport_vehicles table
CREATE TABLE IF NOT EXISTS transport_vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    vehicle_number VARCHAR(50) UNIQUE NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    capacity INTEGER,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'out_of_service')),
    mileage INTEGER,
    fuel_type VARCHAR(50),
    insurance_expiry DATE,
    registration_expiry DATE,
    assigned_driver UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transport_routes table
CREATE TABLE IF NOT EXISTS transport_routes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    route_name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance_km DECIMAL(8,2),
    estimated_duration INTERVAL,
    fare_amount DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    schedule JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_clients_organization_id ON clients(organization_id);
CREATE INDEX IF NOT EXISTS idx_collections_organization_id ON collections(organization_id);
CREATE INDEX IF NOT EXISTS idx_collections_status ON collections(status);
CREATE INDEX IF NOT EXISTS idx_collections_created_at ON collections(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_organization_id ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (these will be customized based on your auth setup)
-- For now, we'll create basic policies that can be updated when auth is configured

-- Organizations: Users can only see their own organization
CREATE POLICY "Users can view own organization" ON organizations
    FOR SELECT USING (auth.uid() IN (
        SELECT id FROM users WHERE organization_id = organizations.id
    ));

-- Users: Users can only see users in their organization
CREATE POLICY "Users can view organization users" ON users
    FOR SELECT USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

-- Basic insert policy for users (will be customized)
CREATE POLICY "Allow user registration" ON users
    FOR INSERT WITH CHECK (true);

-- Collections: Users can only see collections from their organization
CREATE POLICY "Users can view organization collections" ON collections
    FOR SELECT USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();