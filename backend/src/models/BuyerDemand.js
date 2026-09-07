import mongoose from 'mongoose';

const buyerDemandSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  buyerName: { type: String, required: true },
  crop: { type: String, required: true },
  requiredQuintals: { type: Number, required: true },
  offeredPriceMax: { type: Number, required: true },
  deliveryLocation: { type: String, required: true },
  requiredByDate: { type: String },
  minQualityScore: { type: Number, default: 85 },
  status: { type: String, enum: ['OPEN', 'MATCHED', 'FULFILLED', 'CLOSED'], default: 'OPEN' }
}, {
  timestamps: true
});

export const BuyerDemand = mongoose.model('BuyerDemand', buyerDemandSchema);
export default BuyerDemand;

