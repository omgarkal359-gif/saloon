import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, LogOut, Plus, Edit2, Trash2, Mail, Phone, Calendar, Check, HelpCircle, ArrowLeft } from 'lucide-react';

const AdminPanel = ({ onBack }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  // CRUD Forms State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Hair & Styling');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
  const ADMIN_PASSWORD = '123456789';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      fetchAdminData();
    } else {
      setLoginError('Invalid Administrator Password.');
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch Services
      const resServices = await fetch(`${API_BASE_URL}/services`);
      const dataServices = await resServices.json();
      if (dataServices.success) setServices(dataServices.services);

      // Fetch Inquiries
      const resInquiries = await fetch(`${API_BASE_URL}/inquiries`);
      const dataInquiries = await resInquiries.json();
      if (dataInquiries.success) setInquiries(dataInquiries.inquiries);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showActionMsg('error', 'Connection error loading panel database.');
    } finally {
      setLoading(false);
    }
  };

  const showActionMsg = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: '', text: '' }), 4000);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId('');
    setName('');
    setCategory('Hair & Styling');
    setPrice('');
    setDuration('');
    setDescription('');
  };

  // Add or Update Service
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!name || !price || !duration) {
      return showActionMsg('error', 'Please fill all required service fields.');
    }

    setLoading(true);
    const payload = {
      name,
      category,
      price: Number(price),
      duration: Number(duration),
      description
    };

    try {
      let response;
      if (isEditing) {
        // PUT request
        response = await fetch(`${API_BASE_URL}/services/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // POST request
        response = await fetch(`${API_BASE_URL}/services`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();
      if (data.success) {
        showActionMsg('success', isEditing ? 'Service updated successfully!' : 'Service created successfully!');
        resetForm();
        fetchAdminData();
      } else {
        showActionMsg('error', data.message || 'Action failed.');
      }
    } catch (err) {
      console.error('Error saving service:', err);
      showActionMsg('error', 'Network error saving service details.');
    } finally {
      setLoading(false);
    }
  };

  // Set Service details to form for editing
  const handleEditClick = (service) => {
    setIsEditing(true);
    setEditingId(service._id);
    setName(service.name);
    setCategory(service.category);
    setPrice(service.price);
    setDuration(service.duration);
    setDescription(service.description || '');
  };

  // Delete Service
  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this treatment?')) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Service deleted successfully.');
        fetchAdminData();
        if (editingId === id) resetForm();
      } else {
        showActionMsg('error', data.message || 'Delete failed.');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      showActionMsg('error', 'Network error deleting service.');
    } finally {
      setLoading(false);
    }
  };

  // Resolve client Inquiry
  const handleResolveInquiry = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Inquiry marked as resolved.');
        fetchAdminData();
      } else {
        showActionMsg('error', data.message || 'Resolve action failed.');
      }
    } catch (err) {
      console.error('Error resolving inquiry:', err);
      showActionMsg('error', 'Network error resolving inquiry.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6">
        <button 
          onClick={onBack} 
          className="absolute top-6 left-6 flex items-center gap-2 text-cream-muted hover:text-gold transition-colors text-sm uppercase tracking-wider font-sans font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>

        <div className="w-full max-w-md bg-charcoal-dark border border-gold/30 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-gold">
            <Shield className="w-8 h-8" />
          </div>

          <div className="text-center">
            <h1 className="font-serif text-2xl text-cream mb-1">Administrative Gateway</h1>
            <p className="text-cream-muted text-xs font-sans tracking-wide uppercase">Forever Beauty Salon Control</p>
          </div>

          {loginError && (
            <div className="w-full bg-red-950/30 border border-red-500/50 p-3 rounded-lg text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-charcoal border border-gold/20 rounded-lg p-3 text-center text-cream placeholder-cream-muted/20 focus:outline-none focus:border-gold font-sans font-light w-full"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-light text-charcoal font-sans font-medium uppercase tracking-wider text-xs py-3.5 px-8 rounded-full shadow-lg transition-colors w-full"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-cream font-sans p-6 md:p-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gold/20 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-gold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-gold tracking-widest uppercase">Admin Workspace</h1>
            <span className="text-xs text-cream-muted uppercase tracking-widest font-light block mt-0.5">Forever Beauty Salon Management</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
            }}
            className="flex items-center gap-2 border border-gold/30 hover:border-gold px-5 py-2.5 rounded-full text-xs text-cream uppercase tracking-wider transition-colors font-medium"
          >
            <LogOut className="w-4 h-4 text-gold" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Action Notification Message */}
      {actionMessage.text && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl border text-sm max-w-sm flex items-center gap-3 animate-slide-up ${
          actionMessage.type === 'success' 
            ? 'bg-green-950/80 border-green-500/50 text-green-200' 
            : 'bg-red-950/80 border-red-500/50 text-red-200'
        }`}>
          <Check className="w-5 h-5 shrink-0" />
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex gap-4 border-b border-gold/10 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-6 py-2.5 text-xs tracking-widest uppercase border-b-2 transition-all ${
            activeTab === 'services'
              ? 'border-gold text-gold font-medium bg-gold/5'
              : 'border-transparent text-cream-muted hover:text-cream'
          }`}
        >
          Manage Services
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-6 py-2.5 text-xs tracking-widest uppercase border-b-2 transition-all ${
            activeTab === 'inquiries'
              ? 'border-gold text-gold font-medium bg-gold/5'
              : 'border-transparent text-cream-muted hover:text-cream'
          }`}
        >
          View Inquiries ({inquiries.filter(i => i.status === 'unread').length} Unread)
        </button>
      </div>

      {/* TAB CONTENT: MANAGE SERVICES */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Service Add/Edit Form */}
          <div className="glass-card p-6 rounded-2xl border border-gold/15 flex flex-col gap-5">
            <h3 className="font-serif text-lg text-gold border-b border-gold/10 pb-2 flex items-center justify-between">
              <span>{isEditing ? 'Modify Treatment' : 'Add New Treatment'}</span>
              {isEditing && (
                <button onClick={resetForm} className="text-xs text-cream-muted hover:text-gold uppercase tracking-wider font-sans font-light">
                  Cancel
                </button>
              )}
            </h3>

            <form onSubmit={handleSaveService} className="flex flex-col gap-4 text-sm font-sans font-light">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aromatherapy Facial"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold"
                >
                  <option value="Hair & Styling">Hair & Styling</option>
                  <option value="Skin & Body Care">Skin & Body Care</option>
                  <option value="Nails & Hands">Nails & Hands</option>
                  <option value="Bridal & Artistry">Bridal & Artistry</option>
                </select>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gold uppercase tracking-wider font-medium">Price (INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gold uppercase tracking-wider font-medium">Mins</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Description</label>
                <textarea
                  rows={3}
                  placeholder="Service description details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-gold hover:bg-gold-light text-charcoal font-sans font-medium uppercase tracking-wider text-xs py-3 rounded-lg shadow transition-colors mt-2"
              >
                {isEditing ? 'Update Service' : 'Create Service'}
              </button>
            </form>
          </div>

          {/* Service Catalog List */}
          <div className="lg:col-span-2 glass-card rounded-2xl border border-gold/15 overflow-hidden flex flex-col max-h-[500px]">
            <div className="bg-charcoal-dark px-6 py-4 border-b border-gold/10 flex justify-between items-center">
              <h3 className="font-serif text-lg text-cream">Service Catalogue</h3>
              <span className="text-xs text-cream-muted font-sans font-light">{services.length} items registered</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {loading && services.length === 0 ? (
                <div className="text-center py-12 text-cream-muted">Loading catalog...</div>
              ) : services.length === 0 ? (
                <div className="text-center py-12 text-cream-muted">No treatments registered in system.</div>
              ) : (
                <div className="flex flex-col divide-y divide-gold/10">
                  {services.map(service => (
                    <div key={service._id} className="p-4 flex items-center justify-between gap-6 hover:bg-gold/5 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif text-base text-cream">{service.name}</span>
                          <span className="text-[10px] bg-gold/10 border border-gold/20 px-2 py-0.5 rounded text-gold font-sans uppercase">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-cream-muted text-xs max-w-md truncate font-sans font-light">
                          {service.description || 'No description provided.'}
                        </p>
                        <span className="text-xs text-cream-muted font-sans font-light block mt-1">
                          Duration: <strong className="text-cream">{service.duration} mins</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="font-serif text-lg text-gold font-semibold block">₹{service.price}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(service)}
                            className="p-2 border border-gold/20 hover:border-gold rounded-lg text-cream-muted hover:text-gold transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service._id)}
                            className="p-2 border border-red-500/20 hover:border-red-500 rounded-lg text-cream-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: VIEW INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="glass-card rounded-2xl border border-gold/15 overflow-hidden flex flex-col max-h-[600px]">
          <div className="bg-charcoal-dark px-6 py-4 border-b border-gold/10 flex justify-between items-center">
            <h3 className="font-serif text-lg text-cream">Client Inquiries</h3>
            <span className="text-xs text-cream-muted font-sans font-light">{inquiries.length} total messages</span>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {loading && inquiries.length === 0 ? (
              <div className="text-center py-12 text-cream-muted animate-pulse">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-12 text-cream-muted">No messages received yet.</div>
            ) : (
              <div className="flex flex-col divide-y divide-gold/10">
                {inquiries.map(inq => (
                  <div key={inq._id} className={`p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gold/5 transition-colors ${
                    inq.status === 'unread' ? 'bg-gold/5' : 'opacity-70'
                  }`}>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-serif text-lg text-cream font-medium">{inq.name}</span>
                        {inq.status === 'unread' ? (
                          <span className="text-[10px] bg-gold text-charcoal px-2 py-0.5 rounded font-sans uppercase font-medium">
                            New
                          </span>
                        ) : (
                          <span className="text-[10px] bg-cream-muted/10 border border-cream-muted/30 px-2 py-0.5 rounded text-cream-muted font-sans uppercase">
                            Resolved
                          </span>
                        )}
                        <span className="text-xs text-cream-muted font-sans font-light flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex gap-4 text-xs text-cream-muted font-sans font-light flex-wrap">
                        <span className="flex items-center gap-1 hover:text-gold transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                          {inq.email}
                        </span>
                        <span className="flex items-center gap-1 hover:text-gold transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                          {inq.phone}
                        </span>
                      </div>

                      <p className="bg-charcoal-dark border border-gold/10 p-3 rounded-lg text-sm text-cream-dark leading-relaxed font-sans font-light mt-1 max-w-2xl">
                        "{inq.message}"
                      </p>
                    </div>

                    <div>
                      {inq.status === 'unread' ? (
                        <button
                          onClick={() => handleResolveInquiry(inq._id)}
                          className="flex items-center gap-1 bg-gold hover:bg-gold-light text-charcoal font-sans font-medium uppercase tracking-wider text-xs py-2 px-5 rounded-full shadow transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      ) : (
                        <span className="text-xs text-green-400 font-sans font-light flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
