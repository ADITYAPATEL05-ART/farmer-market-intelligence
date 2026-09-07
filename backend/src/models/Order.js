import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  lotId: { type: String },
  farmerName: { type: String, required: true },
  buyerName: { type: String, required: true },
  crop: { type: String, required: true },
  quantityQuintals: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  escrowStatus: {
    type: String,
    enum: ['INITIATED', 'FUNDS_LOCKED_IN_ESCROW', 'FUNDS_RELEASED', 'REFUNDED'],
    default: 'FUNDS_LOCKED_IN_ESCROW'
  },
  dispatchStatus: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
    default: 'CONFIRMED'
  },
  expectedDelivery: { type: String }
}, {
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);
export default Order;

