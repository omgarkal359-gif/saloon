import supabase from '../config/supabase.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

// Submit a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full Name is required.' });
    }
    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    const cleanedPhone = phone ? phone.trim().replace(/(?!^\+)\D/g, '') : '';
    if (!cleanedPhone || !PHONE_REGEX.test(cleanedPhone)) {
      return res.status(400).json({ success: false, message: 'A valid phone number is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert([{
        name: name.trim(),
        email: email.trim(),
        phone: cleanedPhone,
        message: message.trim(),
        status: 'unread'
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('\n================================================================');
    console.log('[ALERT: NEW GUEST INQUIRY RECEIVED]');
    console.log(`From: ${inquiry.name} (${inquiry.email})`);
    console.log(`Phone: ${inquiry.phone}`);
    console.log(`Message: "${inquiry.message}"`);
    console.log('================================================================\n');

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted. Our team will contact you shortly.',
      inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error submitting inquiry.',
      error: error.message
    });
  }
};

// Get all inquiries (Admin only)
export const getInquiries = async (req, res) => {
  try {
    const { data: inquiries, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving inquiries.',
      error: error.message
    });
  }
};

// Mark inquiry as resolved (Admin only)
export const resolveInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .update({ status: 'resolved' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry resolved successfully!',
      inquiry
    });
  } catch (error) {
    console.error('Error resolving inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating inquiry.',
      error: error.message
    });
  }
};
