// Browser-compatible CSV generation without external dependencies

export interface TemplateField {
  id: string;
  title: string;
  required?: boolean;
  example: string;
  description?: string;
  type?: string;
}

export interface TemplateConfig {
  filename: string;
  fields: TemplateField[];
  sampleData?: any[];
}

class CSVTemplateGenerator {
  private templates: Record<string, TemplateConfig> = {
    clients: {
      filename: 'clients_import_template.csv',
      fields: [
        { id: 'client_name', title: 'Client Name', required: true, example: 'Jean Dupont', description: 'Full name of the client' },
        { id: 'client_phone', title: 'Phone Number', required: true, example: '+237 677 123 456', description: 'Client phone number with country code' },
        { id: 'client_email', title: 'Email Address', required: false, example: 'jean.dupont@email.com', description: 'Client email address (optional)' },
        { id: 'client_address', title: 'Address', required: false, example: '123 Main St, Douala', description: 'Client residential address' },
        { id: 'account_balance', title: 'Account Balance', required: false, example: '15000', description: 'Current account balance in FCFA' },
        { id: 'registration_date', title: 'Registration Date', required: false, example: '2024-01-15', description: 'Client registration date (YYYY-MM-DD)' },
        { id: 'client_type', title: 'Client Type', required: false, example: 'Regular', description: 'Regular, Premium, or Corporate' },
        { id: 'status', title: 'Status', required: false, example: 'Active', description: 'Active or Inactive' }
      ],
      sampleData: [
        {
          client_name: 'Jean Dupont',
          client_phone: '+237 677 123 456',
          client_email: 'jean.dupont@email.com',
          client_address: '123 Main St, Douala',
          account_balance: '15000',
          registration_date: '2024-01-15',
          client_type: 'Regular',
          status: 'Active'
        },
        {
          client_name: 'Marie Smith',
          client_phone: '+237 699 234 567',
          client_email: 'marie.smith@email.com',
          client_address: '456 Oak Ave, Yaoundé',
          account_balance: '25000',
          registration_date: '2024-01-20',
          client_type: 'Premium',
          status: 'Active'
        },
        {
          client_name: 'Paul Biya',
          client_phone: '+237 670 345 678',
          client_email: 'paul.biya@email.com',
          client_address: '789 Pine Rd, Douala',
          account_balance: '8000',
          registration_date: '2024-02-01',
          client_type: 'Regular',
          status: 'Active'
        }
      ]
    },

    collectors: {
      filename: 'collectors_import_template.csv',
      fields: [
        { id: 'collector_name', title: 'Collector Name', required: true, example: 'Jean Dupont', description: 'Full name of the collector' },
        { id: 'collector_phone', title: 'Phone Number', required: true, example: '+237 677 123 456', description: 'Collector phone number with country code' },
        { id: 'collector_email', title: 'Email Address', required: false, example: 'jean.dupont@procollector.com', description: 'Collector email address' },
        { id: 'assigned_zone', title: 'Assigned Zone', required: true, example: 'Centre Douala', description: 'Geographic zone assigned to collector' },
        { id: 'supervisor_name', title: 'Supervisor Name', required: false, example: 'Marie Supervisor', description: 'Name of the collector\'s supervisor' },
        { id: 'start_date', title: 'Start Date', required: false, example: '2024-01-15', description: 'Employment start date (YYYY-MM-DD)' },
        { id: 'status', title: 'Status', required: false, example: 'Active', description: 'Active or Inactive' },
        { id: 'target_amount', title: 'Target Amount', required: false, example: '50000', description: 'Monthly collection target in FCFA' },
        { id: 'daily_limit', title: 'Daily Limit', required: false, example: '25000', description: 'Maximum daily collection limit in FCFA' }
      ],
      sampleData: [
        {
          collector_name: 'Jean Dupont',
          collector_phone: '+237 677 123 456',
          collector_email: 'jean.dupont@procollector.com',
          assigned_zone: 'Centre Douala',
          supervisor_name: 'Marie Supervisor',
          start_date: '2024-01-15',
          status: 'Active',
          target_amount: '50000',
          daily_limit: '25000'
        },
        {
          collector_name: 'Marie Smith',
          collector_phone: '+237 699 234 567',
          collector_email: 'marie.smith@procollector.com',
          assigned_zone: 'Bonanjo, Douala',
          supervisor_name: 'Paul Manager',
          start_date: '2024-01-20',
          status: 'Active',
          target_amount: '45000',
          daily_limit: '22500'
        }
      ]
    },

    agents: {
      filename: 'agents_import_template.csv',
      fields: [
        { id: 'agent_name', title: 'Agent Name', required: true, example: 'Jean Dupont', description: 'Full name of the agent' },
        { id: 'agent_phone', title: 'Phone Number', required: true, example: '+237 677 123 456', description: 'Agent phone number with country code' },
        { id: 'agent_email', title: 'Email Address', required: false, example: 'jean.dupont@procollector.com', description: 'Agent email address' },
        { id: 'assigned_zone', title: 'Assigned Zone', required: true, example: 'Centre Douala', description: 'Geographic zone assigned to agent' },
        { id: 'manager_name', title: 'Manager Name', required: false, example: 'Marie Manager', description: 'Name of the agent\'s manager' },
        { id: 'start_date', title: 'Start Date', required: false, example: '2024-01-15', description: 'Employment start date (YYYY-MM-DD)' },
        { id: 'status', title: 'Status', required: false, example: 'Active', description: 'Active or Inactive' },
        { id: 'monthly_target', title: 'Monthly Target', required: false, example: '2000000', description: 'Monthly revenue target in FCFA' },
        { id: 'commission_rate', title: 'Commission Rate', required: false, example: '0.05', description: 'Commission rate as decimal (e.g., 0.05 for 5%)' }
      ],
      sampleData: [
        {
          agent_name: 'Jean Dupont',
          agent_phone: '+237 677 123 456',
          agent_email: 'jean.dupont@procollector.com',
          assigned_zone: 'Centre Douala',
          manager_name: 'Marie Manager',
          start_date: '2024-01-15',
          status: 'Active',
          monthly_target: '2000000',
          commission_rate: '0.05'
        },
        {
          agent_name: 'Marie Smith',
          agent_phone: '+237 699 234 567',
          agent_email: 'marie.smith@procollector.com',
          assigned_zone: 'Bonanjo, Douala',
          manager_name: 'Paul Director',
          start_date: '2024-01-20',
          status: 'Active',
          monthly_target: '1800000',
          commission_rate: '0.04'
        }
      ]
    },

    transactions: {
      filename: 'transactions_import_template.csv',
      fields: [
        { id: 'transaction_id', title: 'Transaction ID', required: true, example: 'TXN001', description: 'Unique transaction identifier' },
        { id: 'client_name', title: 'Client Name', required: true, example: 'Jean Dupont', description: 'Name of the client' },
        { id: 'client_phone', title: 'Client Phone', required: true, example: '+237 677 123 456', description: 'Client phone number' },
        { id: 'collector_name', title: 'Collector Name', required: false, example: 'Marie Smith', description: 'Name of the collector who made the transaction' },
        { id: 'amount', title: 'Amount', required: true, example: '5000', description: 'Transaction amount in FCFA' },
        { id: 'transaction_date', title: 'Transaction Date', required: true, example: '2024-01-15', description: 'Date of transaction (YYYY-MM-DD)' },
        { id: 'transaction_type', title: 'Transaction Type', required: false, example: 'Collection', description: 'Collection, Payment, or Refund' },
        { id: 'payment_method', title: 'Payment Method', required: false, example: 'Cash', description: 'Cash, Mobile Money, Bank Transfer, etc.' },
        { id: 'status', title: 'Status', required: false, example: 'Completed', description: 'Completed, Pending, Failed, or Cancelled' },
        { id: 'notes', title: 'Notes', required: false, example: 'Regular monthly payment', description: 'Additional transaction notes' }
      ],
      sampleData: [
        {
          transaction_id: 'TXN001',
          client_name: 'Jean Dupont',
          client_phone: '+237 677 123 456',
          collector_name: 'Marie Smith',
          amount: '5000',
          transaction_date: '2024-01-15',
          transaction_type: 'Collection',
          payment_method: 'Cash',
          status: 'Completed',
          notes: 'Regular monthly payment'
        },
        {
          transaction_id: 'TXN002',
          client_name: 'Marie Smith',
          client_phone: '+237 699 234 567',
          collector_name: 'Jean Dupont',
          amount: '7500',
          transaction_date: '2024-01-16',
          transaction_type: 'Collection',
          payment_method: 'Mobile Money',
          status: 'Completed',
          notes: 'Premium client payment'
        }
      ]
    },

    collector_clients: {
      filename: 'collector_clients_import_template.csv',
      fields: [
        { id: 'client_name', title: 'Client Name', required: true, example: 'Jean Dupont', description: 'Full name of the client' },
        { id: 'client_phone', title: 'Phone Number', required: true, example: '+237 677 123 456', description: 'Client phone number with country code' },
        { id: 'client_email', title: 'Email Address', required: false, example: 'jean.dupont@email.com', description: 'Client email address (optional)' },
        { id: 'client_address', title: 'Address', required: false, example: '123 Main St, Douala', description: 'Client residential address' },
        { id: 'account_balance', title: 'Account Balance', required: false, example: '15000', description: 'Current account balance in FCFA' },
        { id: 'registration_date', title: 'Registration Date', required: false, example: '2024-01-15', description: 'Client registration date (YYYY-MM-DD)' },
        { id: 'client_type', title: 'Client Type', required: false, example: 'Regular', description: 'Regular, Premium, or Corporate' },
        { id: 'collection_frequency', title: 'Collection Frequency', required: false, example: 'Weekly', description: 'How often to collect: Daily, Weekly, Monthly' },
        { id: 'preferred_payment_method', title: 'Preferred Payment Method', required: false, example: 'Cash', description: 'Preferred payment method: Cash, Mobile Money, etc.' },
        { id: 'notes', title: 'Notes', required: false, example: 'Lives in apartment 2B', description: 'Additional notes about the client' }
      ],
      sampleData: [
        {
          client_name: 'Jean Dupont',
          client_phone: '+237 677 123 456',
          client_email: 'jean.dupont@email.com',
          client_address: '123 Main St, Douala',
          account_balance: '15000',
          registration_date: '2024-01-15',
          client_type: 'Regular',
          collection_frequency: 'Weekly',
          preferred_payment_method: 'Cash',
          notes: 'Regular customer, pays on time'
        },
        {
          client_name: 'Marie Smith',
          client_phone: '+237 699 234 567',
          client_email: 'marie.smith@email.com',
          client_address: '456 Oak Ave, Yaoundé',
          account_balance: '25000',
          registration_date: '2024-01-20',
          client_type: 'Premium',
          collection_frequency: 'Monthly',
          preferred_payment_method: 'Mobile Money',
          notes: 'Premium client, high value customer'
        }
      ]
    }
  };

  async generateTemplate(templateName: string): Promise<string | null> {
    return this.generateTemplateContent(templateName);
  }

  getTemplateInfo(templateName: string): TemplateConfig | null {
    return this.templates[templateName] || null;
  }

  getAvailableTemplates(): string[] {
    return Object.keys(this.templates);
  }

  // Generate CSV content as string (for browser environments)
  generateTemplateContent(templateName: string): string | null {
    const template = this.templates[templateName];
    if (!template) return null;

    // Create headers
    const headers = template.fields.map(field => `"${field.title}"`);

    // Create sample data rows
    const rows = template.sampleData?.map(row =>
      template.fields.map(field => `"${row[field.id] || ''}"`)
    ) || [template.fields.map(() => '""')];

    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  }
}

export const csvTemplateGenerator = new CSVTemplateGenerator();

// Helper function to download CSV content as file
export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}