import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, LogOut, Plus, Edit2, Trash2, Mail, Phone, Calendar, Check, ArrowLeft, Upload, Image, Settings, RefreshCw, Instagram, MapPin } from 'lucide-react';

const AdminPanel = ({ onBack }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [transformations, setTransformations] = useState([]);
  const [salonSettings, setSalonSettings] = useState({ phoneNumber: '', location: '', instagramUrl: '' });
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  // Service form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Hair & Styling');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  // Transformation form state
  const [transTitle, setTransTitle] = useState('');
  const [transDesc, setTransDesc] = useState('');
  const [beforeImage, setBeforeImage] = useState(null); // base64
  const [afterImage, setAfterImage] = useState(null);   // base64
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
  const ADMIN_PASSWORD = '123456789';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASSWORD) {
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
      const [resServices, resInquiries, resTransformations, resSettings] = await Promise.all([
        fetch(`${API_BASE_URL}/services`),
        fetch(`${API_BASE_URL}/inquiries`),
        fetch(`${API_BASE_URL}/transformations`),
        fetch(`${API_BASE_URL}/settings`)
      ]);
      const [dataServices, dataInquiries, dataTransformations, dataSettings] = await Promise.all([
        resServices.json(),
        resInquiries.json(),
        resTransformations.json(),
        resSettings.json()
      ]);
      if (dataServices.success) setServices(dataServices.services);
      if (dataInquiries.success) setInquiries(dataInquiries.inquiries);
      if (dataTransformations.success) setTransformations(dataTransformations.transformations);
      if (dataSettings.success) setSalonSettings(dataSettings.settings);
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

  // Service CRUD
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!name || !price || !duration) {
      return showActionMsg('error', 'Please fill all required service fields.');
    }
    setLoading(true);
    const payload = { name, category, price: Number(price), duration: Number(duration), description };
    try {
      let response;
      if (isEditing) {
        response = await fetch(`${API_BASE_URL}/services/${editingId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${API_BASE_URL}/services`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
      }
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', isEditing ? 'Service updated!' : 'Service created!');
        resetForm();
        fetchAdminData();
      } else {
        showActionMsg('error', data.message || 'Action failed.');
      }
    } catch (err) {
      showActionMsg('error', 'Network error saving service.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (service) => {
    setIsEditing(true);
    setEditingId(service._id);
    setName(service.name);
    setCategory(service.category);
    setPrice(service.price);
    setDuration(service.duration);
    setDescription(service.description || '');
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this treatment?')) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Service deleted.');
        fetchAdminData();
        if (editingId === id) resetForm();
      } else {
        showActionMsg('error', data.message || 'Delete failed.');
      }
    } catch (err) {
      showActionMsg('error', 'Network error deleting service.');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveInquiry = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Inquiry resolved.');
        fetchAdminData();
      } else {
        showActionMsg('error', data.message || 'Resolve failed.');
      }
    } catch (err) {
      showActionMsg('error', 'Network error resolving inquiry.');
    } finally {
      setLoading(false);
    }
  };

  // Image File → Base64
  const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('Image must be under 10MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });

  const handleBeforeImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await readFileAsBase64(file);
      setBeforeImage(base64);
      setBeforePreview(base64);
    } catch (err) {
      showActionMsg('error', err.message);
    }
  };

  const handleAfterImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await readFileAsBase64(file);
      setAfterImage(base64);
      setAfterPreview(base64);
    } catch (err) {
      showActionMsg('error', err.message);
    }
  };

  const handleSaveTransformation = async (e) => {
    e.preventDefault();
    if (!transTitle || !beforeImage || !afterImage) {
      return showActionMsg('error', 'Please provide a title and both Before & After images.');
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/transformations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: transTitle, description: transDesc, beforeImage, afterImage })
      });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Transformation added to the gallery!');
        setTransTitle(''); setTransDesc('');
        setBeforeImage(null); setAfterImage(null);
        setBeforePreview(null); setAfterPreview(null);
        fetchAdminData();
      } else {
        showActionMsg('error', data.message || 'Failed to save transformation.');
      }
    } catch (err) {
      showActionMsg('error', 'Network error saving transformation.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransformation = async (id) => {
    if (!window.confirm('Delete this transformation?')) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/transformations/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Transformation deleted.');
        fetchAdminData();
      } else {
        showActionMsg('error', data.message || 'Delete failed.');
      }
    } catch (err) {
      showActionMsg('error', 'Network error deleting transformation.');
    } finally {
      setLoading(false);
    }
  };

  // Salon Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salonSettings)
      });
      const data = await response.json();
      if (data.success) {
        showActionMsg('success', 'Salon settings updated successfully!');
        setSalonSettings(data.settings);
      } else {
        showActionMsg('error', data.message || 'Failed to save settings.');
      }
    } catch (err) {
      showActionMsg('error', 'Network error saving settings.');
    } finally {
      setLoading(false);
    }
  };

  // LOGIN SCREEN
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
              autoComplete="current-password"
              className="bg-charcoal border border-gold/20 rounded-lg p-3 text-center text-cream placeholder-cream-muted/40 focus:outline-none focus:border-gold font-sans font-light w-full text-base"
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

  // ADMIN WORKSPACE
  return (
    <div className="min-h-screen bg-charcoal text-cream font-sans p-4 md:p-8 lg:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gold/20 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-gold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-gold tracking-widest uppercase">Admin Workspace</h1>
            <span className="text-xs text-cream-muted uppercase tracking-widest font-light block mt-0.5">Forever Beauty Salon Management</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchAdminData} className="flex items-center gap-2 border border-gold/30 hover:border-gold px-4 py-2 rounded-full text-xs text-cream uppercase tracking-wider transition-colors">
            <RefreshCw className="w-4 h-4 text-gold" /> Refresh
          </button>
          <button onClick={() => { setIsAuthenticated(false); setPassword(''); }} className="flex items-center gap-2 border border-gold/30 hover:border-gold px-4 py-2 rounded-full text-xs text-cream uppercase tracking-wider transition-colors">
            <LogOut className="w-4 h-4 text-gold" /> Sign Out
          </button>
        </div>
      </div>

      {/* Toast */}
      {actionMessage.text && (
        <div className={`fixed top-6 right-4 z-50 p-4 rounded-xl shadow-2xl border text-sm max-w-xs flex items-center gap-3 ${
          actionMessage.type === 'success' ? 'bg-green-950/90 border-green-500/50 text-green-200' : 'bg-red-950/90 border-red-500/50 text-red-200'
        }`}>
          <Check className="w-5 h-5 shrink-0" />
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gold/10 pb-4 mb-8">
        {[
          { key: 'services', label: 'Services' },
          { key: 'transformations', label: 'Transformations' },
          { key: 'settings', label: 'Salon Settings' },
          { key: 'inquiries', label: `Inquiries (${inquiries.filter(i => i.status === 'unread').length})` }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 text-xs tracking-widest uppercase border-b-2 transition-all ${
              activeTab === tab.key ? 'border-gold text-gold font-medium bg-gold/5' : 'border-transparent text-cream-muted hover:text-cream'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: SERVICES ── */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="glass-card p-6 rounded-2xl border border-gold/15 flex flex-col gap-5">
            <h3 className="font-serif text-lg text-gold border-b border-gold/10 pb-2 flex items-center justify-between">
              <span>{isEditing ? 'Modify Treatment' : 'Add New Treatment'}</span>
              {isEditing && <button onClick={resetForm} className="text-xs text-cream-muted hover:text-gold uppercase tracking-wider font-sans">Cancel</button>}
            </h3>
            <form onSubmit={handleSaveService} className="flex flex-col gap-4 text-sm font-sans font-light">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Service Name</label>
                <input type="text" required placeholder="e.g. Aromatherapy Facial" value={name} onChange={(e) => setName(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold">
                  <option value="Hair & Styling">Hair & Styling</option>
                  <option value="Skin & Body Care">Skin & Body Care</option>
                  <option value="Nails & Hands">Nails & Hands</option>
                  <option value="Bridal & Artistry">Bridal & Artistry</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gold uppercase tracking-wider font-medium">Price (₹)</label>
                  <input type="number" required placeholder="1500" value={price} onChange={(e) => setPrice(e.target.value)}
                    className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gold uppercase tracking-wider font-medium">Mins</label>
                  <input type="number" required placeholder="45" value={duration} onChange={(e) => setDuration(e.target.value)}
                    className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Description</label>
                <textarea rows={3} placeholder="Short description..." value={description} onChange={(e) => setDescription(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="bg-gold text-charcoal rounded-full py-3 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Saving...' : isEditing ? 'Update Service' : 'Add Service'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-serif text-lg text-gold">Current Services ({services.length})</h3>
            {services.length === 0 ? (
              <div className="glass-card p-8 rounded-xl border border-gold/10 text-center text-cream-muted text-sm">No services yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">
                {services.map(service => (
                  <div key={service._id} className="glass-card p-5 rounded-xl border border-gold/10 flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-base text-cream">{service.name}</h4>
                        <span className="text-[10px] text-gold uppercase tracking-widest">{service.category}</span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleEditClick(service)} className="p-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 text-gold transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteService(service._id)} className="p-1.5 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-cream-muted font-light leading-relaxed line-clamp-2">{service.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: TRANSFORMATIONS ── */}
      {activeTab === 'transformations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Upload Form */}
          <div className="glass-card p-6 rounded-2xl border border-gold/15 flex flex-col gap-5">
            <h3 className="font-serif text-lg text-gold border-b border-gold/10 pb-2">Upload Before & After</h3>
            <form onSubmit={handleSaveTransformation} className="flex flex-col gap-5 text-sm font-sans font-light">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Title *</label>
                <input type="text" required placeholder="e.g. Hair Colour Transformation" value={transTitle} onChange={(e) => setTransTitle(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Description (optional)</label>
                <input type="text" placeholder="e.g. Balayage colour treatment" value={transDesc} onChange={(e) => setTransDesc(e.target.value)}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
              </div>

              {/* Before Image */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">Before Image * <span className="text-cream-muted normal-case tracking-normal">(max 10MB)</span></label>
                <input ref={beforeInputRef} type="file" accept="image/*" onChange={handleBeforeImageChange} className="hidden" />
                <button type="button" onClick={() => beforeInputRef.current?.click()}
                  className="flex items-center gap-3 border-2 border-dashed border-gold/20 hover:border-gold/50 rounded-xl p-4 text-cream-muted hover:text-gold transition-all">
                  <Upload className="w-5 h-5 text-gold" />
                  <span className="text-xs">{beforeImage ? 'Before image selected ✓' : 'Tap to upload Before photo'}</span>
                </button>
                {beforePreview && (
                  <img src={beforePreview} alt="Before preview" className="w-full h-32 object-cover rounded-lg border border-gold/20" />
                )}
              </div>

              {/* After Image */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gold uppercase tracking-wider font-medium">After Image * <span className="text-cream-muted normal-case tracking-normal">(max 10MB)</span></label>
                <input ref={afterInputRef} type="file" accept="image/*" onChange={handleAfterImageChange} className="hidden" />
                <button type="button" onClick={() => afterInputRef.current?.click()}
                  className="flex items-center gap-3 border-2 border-dashed border-gold/20 hover:border-gold/50 rounded-xl p-4 text-cream-muted hover:text-gold transition-all">
                  <Image className="w-5 h-5 text-gold" />
                  <span className="text-xs">{afterImage ? 'After image selected ✓' : 'Tap to upload After photo'}</span>
                </button>
                {afterPreview && (
                  <img src={afterPreview} alt="After preview" className="w-full h-32 object-cover rounded-lg border border-gold/20" />
                )}
              </div>

              <button type="submit" disabled={loading}
                className="bg-gold text-charcoal rounded-full py-3 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Uploading...' : 'Add to Gallery'}
              </button>
            </form>
          </div>

          {/* Gallery List */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg text-gold">Gallery ({transformations.length})</h3>
            {transformations.length === 0 ? (
              <div className="glass-card p-8 rounded-xl border border-gold/10 text-center text-cream-muted text-sm">
                No transformations yet. Upload your first before & after result!
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
                {transformations.map(t => (
                  <div key={t._id} className="glass-card p-4 rounded-xl border border-gold/10 flex gap-3 items-start">
                    <div className="grid grid-cols-2 gap-1 shrink-0 w-28">
                      <img src={t.beforeImage} alt="before" className="w-full h-14 object-cover rounded" />
                      <img src={t.afterImage} alt="after" className="w-full h-14 object-cover rounded" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-cream truncate">{t.title}</h4>
                      {t.description && <p className="text-xs text-cream-muted mt-0.5 truncate">{t.description}</p>}
                    </div>
                    <button onClick={() => handleDeleteTransformation(t._id)} className="p-1.5 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 transition-colors shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: SALON SETTINGS ── */}
      {activeTab === 'settings' && (
        <div className="max-w-xl">
          <div className="glass-card p-6 rounded-2xl border border-gold/15 flex flex-col gap-5">
            <h3 className="font-serif text-lg text-gold border-b border-gold/10 pb-2 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Salon Information
            </h3>
            <form onSubmit={handleSaveSettings} className="flex flex-col gap-5 text-sm font-sans font-light">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone / WhatsApp Number
                </label>
                <input type="tel" placeholder="+91 9326899376" value={salonSettings.phoneNumber || ''}
                  onChange={(e) => setSalonSettings(s => ({ ...s, phoneNumber: e.target.value }))}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
                <p className="text-[10px] text-cream-muted">Format: +91XXXXXXXXXX. Used on the Book via WhatsApp button.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Salon Address
                </label>
                <textarea rows={3} placeholder="Shop No., Street, City..." value={salonSettings.location || ''}
                  onChange={(e) => setSalonSettings(s => ({ ...s, location: e.target.value }))}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold resize-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gold uppercase tracking-wider font-medium flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" /> Instagram Page URL
                </label>
                <input type="url" placeholder="https://instagram.com/yoursalon" value={salonSettings.instagramUrl || ''}
                  onChange={(e) => setSalonSettings(s => ({ ...s, instagramUrl: e.target.value }))}
                  className="bg-charcoal-dark border border-gold/10 rounded-lg p-2.5 text-cream focus:outline-none focus:border-gold" />
                <p className="text-[10px] text-cream-muted">Full URL e.g. https://instagram.com/foreverbeautysalon</p>
              </div>

              <button type="submit" disabled={loading}
                className="bg-gold text-charcoal rounded-full py-3 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── TAB: INQUIRIES ── */}
      {activeTab === 'inquiries' && (
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg text-gold">Client Inquiries ({inquiries.length})</h3>
          {inquiries.length === 0 ? (
            <div className="glass-card p-8 rounded-xl border border-gold/10 text-center text-cream-muted text-sm">No inquiries yet.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {inquiries.map(inq => (
                <div key={inq._id} className={`glass-card p-5 rounded-xl border flex flex-col gap-3 ${inq.status === 'unread' ? 'border-gold/30' : 'border-gold/10 opacity-60'}`}>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="font-serif text-base text-cream">{inq.name}</h4>
                      <div className="flex gap-4 mt-1 text-xs text-cream-muted">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{inq.phone}</span>
                        {inq.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{inq.email}</span>}
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-widest ${inq.status === 'unread' ? 'bg-gold/20 text-gold' : 'bg-green-900/30 text-green-400'}`}>
                      {inq.status}
                    </span>
                  </div>
                  {inq.message && <p className="text-xs text-cream-dark font-light leading-relaxed">{inq.message}</p>}
                  {inq.status === 'unread' && (
                    <button onClick={() => handleResolveInquiry(inq._id)}
                      className="self-start flex items-center gap-2 bg-green-900/20 border border-green-500/30 text-green-300 text-xs px-4 py-1.5 rounded-full hover:bg-green-900/40 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Mark Resolved
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
