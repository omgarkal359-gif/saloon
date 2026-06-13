import supabase from '../config/supabase.js';
import { sendConfirmationEmail } from '../utils/emailService.js';
import { sendWhatsAppConfirmation } from '../utils/whatsappService.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, services, date, time } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full Name is required.' });
    }
    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    const cleanedPhone = phone ? phone.trim().replace(/(?!^\+)\D/g, '') : '';
    if (!cleanedPhone || !PHONE_REGEX.test(cleanedPhone)) {
      return res.status(400).json({ success: false, message: 'A valid international phone number is required.' });
    }
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one service must be selected.' });
    }
    if (!date || !date.trim()) {
      return res.status(400).json({ success: false, message: 'An appointment date is required.' });
    }
    if (!time || !time.trim()) {
      return res.status(400).json({ success: false, message: 'An appointment time is required.' });
    }

    // Verify services exist in Supabase
    const serviceIds = services.map(s => s.serviceId || s);
    const { data: dbServices, error: svcErr } = await supabase
      .from('services')
      .select('*')
      .in('id', serviceIds);

    if (svcErr) throw svcErr;
    if (!dbServices || dbServices.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid services selected.' });
    }

    const totalPrice = dbServices.reduce((sum, s) => sum + Number(s.price), 0);
    const totalDuration = dbServices.reduce((sum, s) => sum + Number(s.duration), 0);
    const serviceNames = dbServices.map(s => s.name).join(', ');

    // Check if slot is already booked
    const { data: existing } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', date)
      .eq('appointment_time', time)
      .eq('status', 'confirmed')
      .limit(1)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ success: false, message: 'The selected date and time slot is already booked.' });
    }

    // Insert appointment
    const { data: appointment, error: insertErr } = await supabase
      .from('appointments')
      .insert([{
        client_name: name.trim(),
        phone: cleanedPhone,
        email: email.trim(),
        service_name: serviceNames,
        appointment_date: date,
        appointment_time: time,
        status: 'confirmed',
        notes: `Total: ₹${totalPrice} | Duration: ${totalDuration} min`
      }])
      .select()
      .single();

    if (insertErr) throw insertErr;

    // Build object shape for notification helpers
    const savedAppointment = {
      clientInfo: { name: name.trim(), email: email.trim(), phone: cleanedPhone },
      services: dbServices.map(s => ({ name: s.name, price: s.price, duration: s.duration })),
      date,
      time,
      totalPrice,
      totalDuration
    };

    // Send notifications
    await sendConfirmationEmail(savedAppointment);
    await sendWhatsAppConfirmation(savedAppointment);

    return res.status(201).json({
      success: true,
      message: 'Appointment booked and confirmed successfully!',
      appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Fetch unavailable/busy slots for a given date
export const getBusySlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date query parameter is required.' });
    }

    const { data: booked, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date)
      .eq('status', 'confirmed');

    if (error) throw error;

    const busySlots = booked.map(a => a.appointment_time);

    return res.status(200).json({ success: true, busySlots });
  } catch (error) {
    console.error('Error fetching busy slots:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching busy slots.',
      error: error.message
    });
  }
};
