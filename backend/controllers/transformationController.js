import supabase from '../config/supabase.js';

// GET all transformations
export const getTransformations = async (req, res) => {
  try {
    const { data: transformations, error } = await supabase
      .from('transformations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map snake_case → camelCase for frontend
    const mapped = transformations.map(mapTransformation);
    return res.json({ success: true, transformations: mapped });
  } catch (err) {
    console.error('Error fetching transformations:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch transformations.', error: err.message });
  }
};

// POST create a new transformation
export const createTransformation = async (req, res) => {
  const { title, description, beforeImage, afterImage } = req.body;

  if (!title || !beforeImage || !afterImage) {
    return res.status(400).json({ success: false, message: 'Title, Before Image, and After Image are required.' });
  }

  try {
    const { data: transformation, error } = await supabase
      .from('transformations')
      .insert([{
        title,
        description: description || '',
        before_image: beforeImage,
        after_image: afterImage
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, transformation: mapTransformation(transformation) });
  } catch (err) {
    console.error('Error creating transformation:', err);
    return res.status(500).json({ success: false, message: 'Failed to save transformation.', error: err.message });
  }
};

// DELETE a transformation
export const deleteTransformation = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('transformations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.json({ success: true, message: 'Transformation deleted.' });
  } catch (err) {
    console.error('Error deleting transformation:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete transformation.', error: err.message });
  }
};

// Map snake_case DB columns → camelCase for the frontend
function mapTransformation(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    description: row.description,
    beforeImage: row.before_image,
    afterImage: row.after_image,
    createdAt: row.created_at
  };
}
