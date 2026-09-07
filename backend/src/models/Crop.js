import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  msp: { type: Number, required: true },
  shelfLifeDays: { type: Number },
  idealTemp: { type: String }
}, {
  timestamps: true
});

export const Crop = mongoose.model('Crop', cropSchema);
export default Crop;

