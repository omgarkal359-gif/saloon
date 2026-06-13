import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Send, User, Mail, MessageSquare, Phone, CheckCircle2, ShieldAlert } from 'lucide-react';

const InquiryForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccess(false);

    if (!name.trim()) return setErrorMessage('Full Name is required.');
    if (!email.trim()) return setErrorMessage('Email address is required.');
    if (!phone) return setErrorMessage('A valid phone number is required.');
    if (!message.trim()) return setErrorMessage('Message content is required.');

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone,
        message: message.trim()
      };

      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMessage(data.message || 'Failed to submit your inquiry.');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setErrorMessage('Server connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-24 bg-charcoal-dark border-t border-gold/10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">Treatment Inquiry</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide">
            Have questions about our signature services? Submit an inquiry and our luxury beauty artisans will connect with you.
          </p>
        </div>

        {/* Form Card */}
        <div className="reveal glass-card p-8 md:p-12 rounded-2xl border border-gold/15 max-w-2xl mx-auto shadow-2xl">
          {success ? (
            <div className="text-center py-8 flex flex-col items-center gap-6 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-gold animate-bounce" />
              <div>
                <h3 className="font-serif text-2xl text-gold mb-2">Inquiry Sent Successfully</h3>
                <p className="text-cream-muted text-sm font-sans font-light max-w-md mx-auto">
                  Thank you for reaching out. We have logged your request and our representatives will get in touch on WhatsApp shortly!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 border border-gold hover:bg-gold/10 text-gold font-sans font-medium uppercase tracking-wider text-xs py-3 px-8 rounded-full transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {errorMessage && (
                <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-xl text-red-200 text-sm flex items-start gap-3 animate-fade-in">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                  className="bg-charcoal border border-gold/20 rounded-lg p-3 text-cream placeholder-cream-muted/30 focus:outline-none focus:border-gold font-sans font-light w-full"
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
                  className="bg-charcoal border border-gold/20 rounded-lg p-3 text-cream placeholder-cream-muted/30 focus:outline-none focus:border-gold font-sans font-light w-full"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2 relative custom-phone-wrapper">
                <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Number (with Country Code)</span>
                </label>
                <PhoneInput
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={setPhone}
                  required
                  className="bg-charcoal border border-gold/20 rounded-lg p-3 text-cream focus-within:border-gold font-sans font-light w-full"
                />
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
                `}</style>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gold uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Your Message</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what treatments you are interested in..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-charcoal border border-gold/20 rounded-lg p-3 text-cream placeholder-cream-muted/30 focus:outline-none focus:border-gold font-sans font-light w-full resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gold hover:bg-gold-light text-charcoal font-sans font-medium uppercase tracking-wider text-xs py-4 px-10 rounded-full shadow-lg hover:shadow-gold/15 transition-all mt-4 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-wait' : ''
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default InquiryForm;
