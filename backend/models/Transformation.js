import mongoose from 'mongoose';

const transformationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    beforeImage: {
      type: String, // Base64 data URL
      required: true,
    },
    afterImage: {
      type: String, // Base64 data URL
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transformation = mongoose.model('Transformation', transformationSchema);
export default Transformation;
