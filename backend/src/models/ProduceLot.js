import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  buyerName: { type: String, required: true },
  amountPerQuintal: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COUNTERED'], default: 'PENDING' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { _id: false });

const produceLotSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  farmerName: { type: String, required: true },
  phone: { type: String },
  location: { type: String, required: true },
  crop: { type: String, required: true },
  variety: { type: String },
  quantityQuintals: { type: Number, required: true },
  expectedPricePerQuintal: { type: Number, required: true },
  harvestDate: { type: String },
  qualityScore: { type: Number, min: 0, max: 100 },
  aiGradingNotes: { type: String },
  distanceKm: { type: Number, default: 15 },
  verifiedFPO: { type: Boolean, default: true },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'NEGOTIATING', 'SOLD', 'CANCELLED'], 
    default: 'ACTIVE' 
  },
  offers: [offerSchema]
}, { 
  timestamps: true 
});

export const ProduceLot = mongoose.model('ProduceLot', produceLotSchema);
export default ProduceLot;

