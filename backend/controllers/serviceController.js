import supabase from '../config/supabase.js';

// Get all services
export const getServices = async (req, res) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving services catalog.',
      error: error.message
    });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    const { name, category, price, duration, description } = req.body;

    if (!name || !category || price === undefined || duration === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required service fields.' });
    }

    const { data: service, error } = await supabase
      .from('services')
      .insert([{ name, category, price: Number(price), duration: Number(duration), description: description || '' }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: 'Service created successfully!',
      service
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error creating service.',
      error: error.message
    });
  }
};

// Update an existing service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, duration, description } = req.body;

    const { data: service, error } = await supabase
      .from('services')
      .update({ name, category, price: Number(price), duration: Number(duration), description: description || '' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully!',
      service
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating service.',
      error: error.message
    });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully!'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error deleting service.',
      error: error.message
    });
  }
};
