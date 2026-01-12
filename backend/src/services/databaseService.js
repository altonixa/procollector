import { supabase, supabaseAdmin } from '../config/supabase.js';

// Database service using Supabase
export class DatabaseService {
    constructor() {
        this.client = supabaseAdmin || supabase;
    }

    // Organizations
    async getOrganizations() {
        const { data, error } = await this.client
            .from('organizations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async getOrganizationById(id) {
        const { data, error } = await this.client
            .from('organizations')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async getOrganizationBySubdomain(subdomain) {
        const { data, error } = await this.client
            .from('organizations')
            .select('*')
            .eq('subdomain', subdomain)
            .single();

        if (error) throw error;
        return data;
    }

    // Users
    async getUsersByOrganization(organizationId) {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('organization_id', organizationId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async getUserById(id) {
        const { data, error } = await this.client
            .from('users')
            .select('*, organizations(*)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async getUserByEmail(email) {
        const { data, error } = await this.client
            .from('users')
            .select('*, organizations(*)')
            .eq('email', email)
            .single();

        if (error) throw error;
        return data;
    }

    async createUser(userData) {
        const { data, error } = await this.client
            .from('users')
            .insert(userData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateUser(id, updateData) {
        const { data, error } = await this.client
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Clients
    async getClientsByOrganization(organizationId) {
        const { data, error } = await this.client
            .from('clients')
            .select('*')
            .eq('organization_id', organizationId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async getClientById(id) {
        const { data, error } = await this.client
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async createClient(clientData) {
        const { data, error } = await this.client
            .from('clients')
            .insert(clientData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateClient(id, updateData) {
        const { data, error } = await this.client
            .from('clients')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Collections
    async getCollectionsByOrganization(organizationId, filters = {}) {
        let query = this.client
            .from('collections')
            .select(`
                *,
                clients(name, phone),
                users!collector_id(first_name, last_name)
            `)
            .eq('organization_id', organizationId);

        if (filters.status) query = query.eq('status', filters.status);
        if (filters.dateFrom) query = query.gte('collected_at', filters.dateFrom);
        if (filters.dateTo) query = query.lte('collected_at', filters.dateTo);

        query = query.order('collected_at', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async getCollectionById(id) {
        const { data, error } = await this.client
            .from('collections')
            .select(`
                *,
                clients(name, phone, address),
                users!collector_id(first_name, last_name),
                users!verified_by(first_name, last_name)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async createCollection(collectionData) {
        const { data, error } = await this.client
            .from('collections')
            .insert(collectionData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateCollection(id, updateData) {
        const { data, error } = await this.client
            .from('collections')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Dashboard statistics
    async getDashboardStats(organizationId) {
        // Get total collections
        const { data: collections, error: collectionsError } = await this.client
            .from('collections')
            .select('amount, status, collected_at')
            .eq('organization_id', organizationId);

        if (collectionsError) throw collectionsError;

        const totalRevenue = collections.reduce((sum, col) => sum + parseFloat(col.amount || 0), 0);
        const verifiedCollections = collections.filter(col => col.status === 'verified').length;
        const pendingCollections = collections.filter(col => col.status === 'pending').length;

        // Get active agents (users with role 'collector')
        const { data: agents, error: agentsError } = await this.client
            .from('users')
            .select('id')
            .eq('organization_id', organizationId)
            .eq('role', 'collector')
            .eq('is_active', true);

        if (agentsError) throw agentsError;

        return {
            totalRevenue: totalRevenue.toFixed(2),
            activeAgents: agents.length,
            totalCollections: collections.length,
            verifiedCollections,
            pendingCollections,
            dailyCollections: collections.filter(col => {
                const today = new Date();
                const collectionDate = new Date(col.collected_at);
                return collectionDate.toDateString() === today.toDateString();
            }).length
        };
    }

    // File operations
    async saveFileMetadata(fileData) {
        const { data, error } = await this.client
            .from('file_uploads')
            .insert(fileData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Hostel operations
    async getHostelRooms(organizationId) {
        const { data, error } = await this.client
            .from('hostel_rooms')
            .select(`
                *,
                hostel_residents(count)
            `)
            .eq('organization_id', organizationId)
            .order('room_number');

        if (error) throw error;
        return data;
    }

    // Inventory operations
    async getInventoryItems(organizationId) {
        const { data, error } = await this.client
            .from('inventory_items')
            .select('*')
            .eq('organization_id', organizationId)
            .order('name');

        if (error) throw error;
        return data;
    }

    // Transport operations
    async getTransportVehicles(organizationId) {
        const { data, error } = await this.client
            .from('transport_vehicles')
            .select('*')
            .eq('organization_id', organizationId)
            .order('vehicle_number');

        if (error) throw error;
        return data;
    }

    // Audit operations
    async createAuditLog(logData) {
        const { data, error } = await this.client
            .from('audit_logs')
            .insert(logData);

        if (error) throw error;
        return data;
    }

    async getAuditLogs(organizationId, limit = 100) {
        const { data, error } = await this.client
            .from('audit_logs')
            .select(`
                *,
                users(first_name, last_name)
            `)
            .eq('organization_id', organizationId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    }
}

export const dbService = new DatabaseService();
export default dbService;