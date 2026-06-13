// One-time setup script: creates all Supabase tables for Forever Beauty Salon
// Run with: node setup-supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qmixxahnrbyjvcfhusxm.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh4YWhucmJ5anZjZmh1c3htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTMzOTAxNCwiZXhwIjoyMDk2OTE1MDE0fQ.5EPS3vGV9ayvUnfsmLmtw-yYB0tncednhz6mHzLFEGg';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
});

async function setup() {
  console.log('🔧 Setting up Supabase tables...\n');

  // We'll use the pg REST API by calling RPC or running raw SQL via the management API
  // Since we can't run DDL via the JS client directly, we'll create tables by inserting and catching errors,
  // then use the management API for DDL.

  const PROJECT_REF = 'qmixxahnrbyjvcfhusxm';
  const MGMT_KEY = SUPABASE_SERVICE_KEY;

  const sql = `
    create table if not exists services (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      category text not null,
      price numeric not null,
      duration integer not null,
      description text default '',
      created_at timestamptz default now()
    );

    create table if not exists inquiries (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      email text not null,
      phone text not null,
      message text not null,
      status text default 'unread',
      created_at timestamptz default now()
    );

    create table if not exists transformations (
      id uuid primary key default gen_random_uuid(),
      title text not null,
      description text default '',
      before_image text not null,
      after_image text not null,
      created_at timestamptz default now()
    );

    create table if not exists settings (
      id uuid primary key default gen_random_uuid(),
      phone_number text default '+91 9326899376',
      location text default 'Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206',
      instagram_url text default 'https://instagram.com/foreverbeautysalon',
      updated_at timestamptz default now()
    );

    create table if not exists appointments (
      id uuid primary key default gen_random_uuid(),
      client_name text not null,
      phone text not null,
      email text,
      service_name text not null,
      appointment_date date not null,
      appointment_time text not null,
      status text default 'pending',
      notes text default '',
      created_at timestamptz default now()
    );
  `;

  const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MGMT_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Error running SQL:', JSON.stringify(result, null, 2));
    
    // Try alternative approach via pg-rest
    console.log('\n⚠️  Direct SQL failed. Trying table verification...');
    
    const { data, error } = await supabase.from('services').select('count').limit(1);
    if (error) {
      console.log('\n📋 Tables need to be created manually in Supabase SQL Editor.');
      console.log('Please go to: https://supabase.com/dashboard/project/qmixxahnrbyjvcfhusxm/sql/new');
      console.log('And run the SQL from the implementation_plan.md\n');
    } else {
      console.log('✅ Tables already exist!');
    }
    return;
  }

  console.log('✅ All tables created successfully!\n');
  console.log('🌱 Seeding default settings row...');

  // Insert default settings if not exist
  const { data: existingSettings } = await supabase.from('settings').select('id').limit(1).maybeSingle();
  if (!existingSettings) {
    const { error: settingsErr } = await supabase.from('settings').insert([{
      phone_number: '+91 9326899376',
      location: 'Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206',
      instagram_url: 'https://instagram.com/foreverbeautysalon'
    }]);
    if (settingsErr) console.error('Settings seed error:', settingsErr.message);
    else console.log('✅ Default settings seeded.');
  } else {
    console.log('ℹ️  Settings row already exists — skipping seed.');
  }

  console.log('\n🚀 Supabase setup complete! Your database is ready.');
}

setup().catch(console.error);
