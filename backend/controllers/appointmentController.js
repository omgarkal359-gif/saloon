import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import { sendConfirmationEmail } from '../utils/emailService.js';
import { sendWhatsAppConfirmation } from '../utils/whatsappService.js';
import { mockServices, getMockAppointments, saveMockAppointment } from '../utils/mockData.js';

// Regular expressions for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Supports international E.164 phone formats (optional plus, then 7-15 digits)
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, services, date, time } = req.body;

    // 1. Strict Server-Side Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full Name is required.' });
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    // Strip out non-digit characters except the leading '+' for validation
    const cleanedPhone = phone ? phone.trim().replace(/(?!^\+)\D/g, '') : '';
    if (!cleanedPhone || !PHONE_REGEX.test(cleanedPhone)) {
      return res.status(400).json({ success: false, message: 'A valid international phone number is required (e.g., +1234567890).' });
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

    // 2. Fetch/Verify service items
    let verifiedServices = [];
    if (global.isMockDB) {
      const serviceIds = services.map(s => (s.serviceId || s).toString());
      const matched = mockServices.filter(s => serviceIds.includes(s._id.toString()));
      if (matched.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid services selected.' });
      }
      verifiedServices = matched.map(s => ({
        serviceId: s._id,
        name: s.name,
        price: s.price,
        duration: s.duration
      }));
    } else {
      const serviceIds = services.map(s => s.serviceId || s);
      const dbServices = await Service.find({ _id: { $in: serviceIds } });
      if (dbServices.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid services selected.' });
      }
      verifiedServices = dbServices.map(s => ({
        serviceId: s._id,
        name: s.name,
        price: s.price,
        duration: s.duration
      }));
    }

    const totalPrice = verifiedServices.reduce((sum, s) => sum + s.price, 0);
    const totalDuration = verifiedServices.reduce((sum, s) => sum + s.duration, 0);

    // Check if slot is already booked
    if (global.isMockDB) {
      const appointments = getMockAppointments();
      const existing = appointments.find(app => app.date === date && app.time === time && app.status === 'confirmed');
      if (existing) {
        return res.status(400).json({ success: false, message: 'The selected date and time slot is already booked.' });
      }
    } else {
      const existingAppointment = await Appointment.findOne({ date, time, status: 'confirmed' });
      if (existingAppointment) {
        return res.status(400).json({ success: false, message: 'The selected date and time slot is already booked.' });
      }
    }

    // Create template appointment payload
    const appointmentPayload = {
      clientInfo: {
        name: name.trim(),
        email: email.trim(),
        phone: cleanedPhone
      },
      services: verifiedServices,
      date,
      time,
      totalPrice,
      totalDuration,
      status: 'confirmed',
      notifications: {
        emailSent: false,
        whatsappSent: false
      }
    };

    let savedAppointment;
    if (!global.isMockDB) {
      // Create Mongoose document
      const appointment = new Appointment(appointmentPayload);
      await appointment.save();
      savedAppointment = appointment;
    } else {
      savedAppointment = appointmentPayload;
    }

    // 4. Send Notifications in sequence
    const emailSent = await sendConfirmationEmail(savedAppointment);
    const whatsappSent = await sendWhatsAppConfirmation(savedAppointment);

    // 5. Update Status in Database based on outcomes
    if (!global.isMockDB) {
      savedAppointment.notifications.emailSent = emailSent;
      savedAppointment.notifications.whatsappSent = whatsappSent;
      await savedAppointment.save();
    } else {
      savedAppointment.notifications.emailSent = emailSent;
      savedAppointment.notifications.whatsappSent = whatsappSent;
      savedAppointment = saveMockAppointment(savedAppointment);
    }

    // 6. Return response
    return res.status(201).json({
      success: true,
      message: 'Appointment booked and confirmed successfully!',
      appointment: savedAppointment
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

    let busySlots = [];
    if (global.isMockDB) {
      const appointments = getMockAppointments();
      const booked = appointments.filter(app => app.date === date && app.status === 'confirmed');
      busySlots = booked.map(app => app.time);
    } else {
      // Find all confirmed appointments on this date
      const booked = await Appointment.find({ date, status: 'confirmed' }).select('time');
      busySlots = booked.map(app => app.time);
    }

    return res.status(200).json({
      success: true,
      busySlots
    });
  } catch (error) {
    console.error('Error fetching busy slots:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching busy slots.',
      error: error.message
    });
  }
};
