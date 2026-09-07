import mongoose from 'mongoose';

const mandiPriceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  mandi: { type: String, required: true, index: true },
  state: { type: String, required: true, index: true },
  crop: { type: String, required: true, index: true },
  modalPrice: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  trend: { type: String, default: '0%' },
  arrivalTons: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const MandiPrice = mongoose.model('MandiPrice', mandiPriceSchema);
export default MandiPrice;

