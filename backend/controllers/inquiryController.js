import Inquiry from '../models/Inquiry.js';
import { getMockInquiries, saveMockInquiry, resolveMockInquiry } from '../utils/mockData.js';

// Regular expressions for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

// Submit a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
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

    const inquiryData = {
      name: name.trim(),
      email: email.trim(),
      phone: cleanedPhone,
      message: message.trim()
    };

    let inquiry;
    if (global.isMockDB) {
      inquiry = saveMockInquiry(inquiryData);
    } else {
      inquiry = new Inquiry(inquiryData);
      await inquiry.save();
    }

    // Trigger Mock Notifications to Salon Owners (Log to console)
    console.log('\n================================================================');
    console.log('[ALERT: NEW GUEST INQUIRY RECEIVED]');
    console.log(`From: ${inquiry.name} (${inquiry.email})`);
    console.log(`Phone: ${inquiry.phone}`);
    console.log(`Message: "${inquiry.message}"`);
    console.log('--- NOTIFICATION LOG ---');
    console.log(`WhatsApp Alert sent to Salon Admin: "New Forever Beauty inquiry from ${inquiry.name}. Msg: ${inquiry.message.substring(0, 50)}..."`);
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
    let inquiries;
    if (global.isMockDB) {
      inquiries = getMockInquiries();
    } else {
      inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      inquiries
    });
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

    let inquiry;
    if (global.isMockDB) {
      inquiry = resolveMockInquiry(id);
    } else {
      inquiry = await Inquiry.findByIdAndUpdate(
        id,
        { status: 'resolved' },
        { new: true }
      );
    }

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
