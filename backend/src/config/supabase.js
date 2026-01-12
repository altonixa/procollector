import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for server-side operations (migrations, etc.)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

// Database health check
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Supabase connection error:', error.message);
      return false;
    }

    console.log('✅ Supabase connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    return false;
  }
};

// Storage bucket for file uploads
export const STORAGE_BUCKETS = {
  PROOFS: 'proofs',
  RECEIPTS: 'receipts',
  DOCUMENTS: 'documents'
};

// Initialize storage buckets (call this once during setup)
export const initializeStorage = async () => {
  try {
    // Create buckets if they don't exist
    for (const bucketName of Object.values(STORAGE_BUCKETS)) {
      const { data, error } = await supabaseAdmin.storage.getBucket(bucketName);

      if (error && error.message.includes('not found')) {
        const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
          public: false,
          allowedMimeTypes: bucketName === STORAGE_BUCKETS.PROOFS
            ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            : ['application/pdf'],
          fileSizeLimit: 5242880 // 5MB
        });

        if (createError) {
          console.error(`❌ Failed to create bucket ${bucketName}:`, createError.message);
        } else {
          console.log(`✅ Created storage bucket: ${bucketName}`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Storage initialization failed:', error.message);
  }
};

export default supabase;