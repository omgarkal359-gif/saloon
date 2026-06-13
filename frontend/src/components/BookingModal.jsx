import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, User, Mail, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

// Pre-defined available times for scheduling
const AVAILABLE_TIMES = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const BookingModal = ({ isOpen, onClose, services, selectedServices, onToggleService, onClearSelection }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  
  const [busySlots, setBusySlots] = useState([]);
  const [isLoadingBusy, setIsLoadingBusy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Format today's date for date picker limits (cannot book in the past)
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Calculate max date (30 days from now)
  const maxDateStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  })();

  // Fetch busy slots for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchBusySlots = async () => {
      setIsLoadingBusy(true);
      setErrorMessage('');
      try {
        const response = await fetch(`${API_BASE_URL}/appointments/busy-slots?date=${selectedDate}`);
        const data = await response.json();
        if (data.success) {
          setBusySlots(data.busySlots || []);
        } else {
          setErrorMessage(data.message || 'Failed to fetch slot availability.');
        }
      } catch (err) {
        console.error('Error fetching busy slots:', err);
        setErrorMessage('Network error fetching slot availability. Fallback active.');
        setBusySlots([]); // graceful empty array fallback
      } finally {
        setIsLoadingBusy(false);
      }
    };

    fetchBusySlots();
    // Reset time selection if changing date
    setSelectedTime('');
  }, [selectedDate]);

  // Handle modal closing and reset states
  const handleClose = () => {
    onClose();
    // Reset states after animation closes
    setTimeout(() => {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setName('');
      setEmail('');
      setPhone('');
      setConsent(false);
      setErrorMessage('');
      setSuccessData(null);
    }, 300);
  };

  const handleNextStep = () => {
    if (step === 1 && selectedServices.length === 0) {
      setErrorMessage('Please select at least one service to continue.');
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      setErrorMessage('Please select both a date and time slot.');
      return;
    }
    setErrorMessage('');
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) return setErrorMessage('Full Name is required.');
    if (!email.trim()) return setErrorMessage('Email address is required.');
    if (!phone) return setErrorMessage('A valid international phone number is required.');
    if (!consent) return setErrorMessage('You must consent to receive notifications.');

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone,
        services: selectedServices.map(s => s._id),
        date: selectedDate,
        time: selectedTime,
      };

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessData(data.appointment);
        setStep(4);
        onClearSelection(); // clear selected items in parent
        
        // Premium celebration visual
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FDFBF7', '#B89025']
        });
      } else {
        setErrorMessage(data.message || 'Failed to confirm booking.');
      }
    } catch (err) {
      console.error('Error confirming booking:', err);
      setErrorMessage('Server connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const totalCount = selectedServices.length;
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal-dark/90 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-charcoal border border-gold/30 rounded-2xl shadow-2xl overflow-hidden z-10 transition-transform duration-300 animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-charcoal-dark">
          <div className="flex items-center gap-2">
            <Sparkles className="text-gold w-5 h-5" />
            <h2 className="font-serif text-lg md:text-xl text-gold uppercase tracking-widest font-normal">
              {step === 4 ? 'Booking Confirmed' : 'Pamper Reservation'}
            </h2>
          </div>
          <button onClick={handleClose} className="text-cream-muted hover:text-cream transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1-3) */}
        {step < 4 && (
          <div className="flex border-b border-gold/10 bg-charcoal-dark/30 text-xs tracking-widest uppercase font-sans">
            <div className={`flex-1 py-3 text-center border-b-2 font-medium ${step >= 1 ? 'border-gold text-gold' : 'border-transparent text-cream-muted'}`}>
              1. Services
            </div>
            <div className={`flex-1 py-3 text-center border-b-2 font-medium ${step >= 2 ? 'border-gold text-gold' : 'border-transparent text-cream-muted'}`}>
              2. Schedule
            </div>
            <div className={`flex-1 py-3 text-center border-b-2 font-medium ${step >= 3 ? 'border-gold text-gold' : 'border-transparent text-cream-muted'}`}>
              3. Info
            </div>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {errorMessage && (
            <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-xl text-red-200 text-sm flex items-start gap-3 mb-6 animate-fade-in">
              <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: REVIEW & EDIT SELECTED SERVICES */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-cream font-serif text-xl mb-2">Review Your Treatments</h3>
                <p className="text-cream-muted text-sm font-sans font-light">
                  You can toggle selection or continue to scheduling.
                </p>
              </div>

              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {services.map(service => {
                  const isSelected = selectedServices.some(s => s._id === service._id);
                  return (
                    <div 
                      key={service._id}
                      onClick={() => onToggleService(service)}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
                        isSelected 
                          ? 'border-gold bg-gold/5 text-gold' 
                          : 'border-gold/10 hover:border-cream/20 bg-charcoal-card text-cream'
                      }`}
                    >
                      <div className="flex-1">
                        <span className="font-serif block tracking-wide text-sm">{service.name}</span>
                        <span className="text-xs text-cream-muted font-sans font-light">{service.category} &bull; {service.duration} mins</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif">${service.price}</span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold focus:ring-offset-charcoal bg-charcoal"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE & TIME (CALENDAR GRID) */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-cream font-serif text-xl mb-2">Select Date & Time</h3>
                <p className="text-cream-muted text-sm font-sans font-light">
                  Choose your preferred date. Already booked slots are dynamically grayed out to prevent double bookings.
                </p>
              </div>

              {/* Date Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Choose Date</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  max={maxDateStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-charcoal-dark border border-gold/30 rounded-lg p-3 text-cream focus:outline-none focus:border-gold font-sans font-light w-full"
                />
              </div>

              {/* Time Slots Selection */}
              {selectedDate && (
                <div className="flex flex-col gap-3 mt-2">
                  <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Select Time</span>
                  </label>
                  
                  {isLoadingBusy ? (
                    <div className="text-center py-6 text-cream-muted text-sm animate-pulse">
                      Checking availability...
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {AVAILABLE_TIMES.map(timeSlot => {
                        const isBusy = busySlots.includes(timeSlot);
                        const isSelected = selectedTime === timeSlot;
                        return (
                          <button
                            key={timeSlot}
                            disabled={isBusy}
                            type="button"
                            onClick={() => setSelectedTime(timeSlot)}
                            className={`py-3 rounded-lg text-center font-sans transition-all text-sm ${
                              isBusy 
                                ? 'bg-charcoal-dark/20 text-cream-muted/20 border border-charcoal-dark/30 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-gold text-charcoal font-medium border border-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                                : 'bg-charcoal-card border border-gold/10 hover:border-gold/40 text-cream'
                            }`}
                          >
                            {timeSlot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CLIENT INFORMATION FORM */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h3 className="text-cream font-serif text-xl mb-2">Guest Information</h3>
                <p className="text-cream-muted text-sm font-sans font-light">
                  Complete your details to receive instant automated reservation confirmations.
                </p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-charcoal-dark border border-gold/30 rounded-lg p-3 text-cream placeholder-cream-muted/30 focus:outline-none focus:border-gold font-sans font-light w-full"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-charcoal-dark border border-gold/30 rounded-lg p-3 text-cream placeholder-cream-muted/30 focus:outline-none focus:border-gold font-sans font-light w-full"
                />
              </div>

              {/* International Phone Picker */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>WhatsApp Phone Number (with Country Code)</span>
                </label>
                <div className="custom-phone-wrapper">
                  <PhoneInput
                    defaultCountry="US"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    required
                    className="bg-charcoal-dark border border-gold/30 rounded-lg p-3 text-cream focus-within:border-gold font-sans font-light w-full"
                  />
                </div>
                {/* CSS styles to beautify phone picker elements inside dark theme */}
                <style>{`
                  .custom-phone-wrapper .PhoneInputCountry {
                    margin-right: 0.75rem;
                  }
                  .custom-phone-wrapper .PhoneInputCountrySelect {
                    background-color: #1A1A1A;
                    color: #FDFBF7;
                    border: 0;
                  }
                  .custom-phone-wrapper .PhoneInputInput {
                    background: transparent;
                    border: 0;
                    outline: none;
                    color: #FDFBF7;
                    width: 100%;
                  }
                  .custom-phone-wrapper .PhoneInputInput::placeholder {
                    color: rgba(168, 162, 158, 0.3);
                  }
                `}</style>
              </div>

              {/* Consent Checkbox */}
              <div className="flex gap-3 items-start bg-gold/5 border border-gold/20 p-4 rounded-xl mt-2 cursor-pointer" onClick={() => setConsent(!consent)}>
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={() => {}}
                    required
                    className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold focus:ring-offset-charcoal bg-charcoal cursor-pointer"
                  />
                </div>
                <div className="text-xs font-sans text-cream-dark leading-normal">
                  I consent to receive automated booking confirmations and reminders via WhatsApp and Email from Forever Beauty Salon.
                  <span className="text-red-500 font-bold ml-1">*</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS VIEW */}
          {step === 4 && successData && (
            <div className="flex flex-col items-center text-center gap-6 py-4 animate-fade-in">
              <CheckCircle2 className="w-20 h-20 text-gold animate-bounce" />
              
              <div>
                <h3 className="text-2xl font-serif text-gold tracking-wide mb-2">Reservation Confirmed!</h3>
                <p className="text-cream-muted text-sm font-sans font-light max-w-md mx-auto">
                  Hello <strong className="text-cream">{successData.clientInfo.name}</strong>, your luxury appointment is booked. Confirmation messages are flying to your email and WhatsApp!
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="w-full bg-charcoal-dark border border-gold/20 p-5 rounded-xl text-left flex flex-col gap-3 mt-2 max-w-md">
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-xs text-gold uppercase tracking-wider font-sans">Date</span>
                  <span className="text-cream text-sm font-sans">{successData.date}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-xs text-gold uppercase tracking-wider font-sans">Time</span>
                  <span className="text-cream text-sm font-sans">{successData.time}</span>
                </div>
                <div>
                  <span className="text-xs text-gold uppercase tracking-wider font-sans block mb-1">Services</span>
                  <ul className="text-xs text-cream-dark font-sans font-light list-disc pl-4 flex flex-col gap-1">
                    {successData.services.map((s, idx) => (
                      <li key={idx}>{s.name} (${s.price})</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between border-t border-gold/10 pt-2.5 text-base">
                  <span className="text-gold font-medium font-sans">Total Confirmed</span>
                  <span className="text-gold font-serif font-bold">${successData.totalPrice}</span>
                </div>
              </div>

              <p className="text-[11px] text-gold/75 max-w-sm italic leading-normal border-t border-gold/10 pt-4 font-sans font-light">
                Important Privacy Notice: Please note that our salon environment is strictly reserved for ladies to ensure privacy and comfort.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions (Steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-gold/15 bg-charcoal-dark flex justify-between items-center">
            {/* Left Info Summary */}
            <div className="text-left">
              <span className="text-[10px] text-gold uppercase tracking-widest block font-sans">Total Selected</span>
              <span className="text-cream text-sm font-serif font-normal">
                ${totalPrice} &bull; {totalDuration} mins
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-charcoal border border-gold/30 hover:border-gold hover:text-gold text-cream font-medium uppercase tracking-wider text-xs py-3 px-6 rounded-full transition-colors font-sans"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={step === 1 && selectedServices.length === 0}
                  className={`font-sans font-medium uppercase tracking-wider text-xs py-3 px-8 rounded-full shadow-md transition-all ${
                    step === 1 && selectedServices.length === 0
                      ? 'bg-charcoal-dark/30 text-cream-muted/30 border border-charcoal-dark/45 cursor-not-allowed'
                      : 'bg-gold hover:bg-gold-light text-charcoal shadow-gold/10'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`bg-gold hover:bg-gold-light text-charcoal font-sans font-medium uppercase tracking-wider text-xs py-3 px-8 rounded-full shadow-md shadow-gold/10 transition-all ${
                    isSubmitting ? 'opacity-50 cursor-wait' : ''
                  }`}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions (Success View) */}
        {step === 4 && (
          <div className="px-6 py-4 border-t border-gold/15 bg-charcoal-dark text-center">
            <button
              onClick={handleClose}
              className="bg-gold hover:bg-gold-light text-charcoal font-sans font-medium uppercase tracking-wider text-xs py-3 px-10 rounded-full shadow-md transition-colors"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
