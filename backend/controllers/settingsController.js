import supabase from '../config/supabase.js';

// GET settings (single row)
export const getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code === 'PGRST116') {
      // No row exists yet — insert defaults
      const { data: created, error: insertErr } = await supabase
        .from('settings')
        .insert([{
          phone_number: '+91 9326899376',
          location: 'Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206',
          instagram_url: 'https://instagram.com/foreverbeautysalon'
        }])
        .select()
        .single();
      if (insertErr) throw insertErr;
      return res.json({ success: true, settings: mapSettings(created) });
    }

    if (error) throw error;

    return res.json({ success: true, settings: mapSettings(data) });
  } catch (err) {
    console.error('Error fetching settings:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch settings.', error: err.message });
  }
};

// PUT update settings
export const updateSettings = async (req, res) => {
  const { phoneNumber, location, instagramUrl } = req.body;
  try {
    // Get existing row id
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existing) {
      const { data, error } = await supabase
        .from('settings')
        .update({
          ...(phoneNumber !== undefined && { phone_number: phoneNumber }),
          ...(location !== undefined && { location }),
          ...(instagramUrl !== undefined && { instagram_url: instagramUrl }),
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from('settings')
        .insert([{
          phone_number: phoneNumber,
          location,
          instagram_url: instagramUrl
        }])
        .select()
        .single();
      if (error) throw error;
      result = data;
    }

    return res.json({ success: true, settings: mapSettings(result) });
  } catch (err) {
    console.error('Error updating settings:', err);
    return res.status(500).json({ success: false, message: 'Failed to update settings.', error: err.message });
  }
};

// Map snake_case DB columns → camelCase for the frontend
function mapSettings(row) {
  if (!row) return null;
  return {
    id: row.id,
    phoneNumber: row.phone_number,
    location: row.location,
    instagramUrl: row.instagram_url,
    updatedAt: row.updated_at
  };
}
