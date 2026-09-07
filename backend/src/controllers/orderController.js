import { ESCROW_ORDERS, TRANSPORTERS, COLD_STORAGE_FACILITIES } from '../data/mockData.js';
import Order from '../models/Order.js';
import { isDBConnected } from '../config/db.js';

let memOrders = [...ESCROW_ORDERS];
let storages = [...COLD_STORAGE_FACILITIES];
let transporters = [...TRANSPORTERS];
let bookings = [];

export const getOrders = async (req, res) => {
  if (isDBConnected()) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, source: 'mongodb', data: orders });
    } catch (err) {
      console.error('Error reading orders from MongoDB, using fallback:', err.message);
    }
  }
  return res.json({ success: true, count: memOrders.length, source: 'memory', data: memOrders });
};

export const createOrder = async (req, res) => {
  const orderData = req.body;
  const newOrderData = {
    ...orderData,
    id: orderData.id || `ORD-${Math.floor(900 + Math.random() * 99)}`,
    escrowStatus: 'FUNDS_LOCKED_IN_ESCROW',
    dispatchStatus: 'CONFIRMED'
  };

  if (isDBConnected()) {
    try {
      const created = await Order.create(newOrderData);
      return res.status(201).json({ success: true, source: 'mongodb', data: created });
    } catch (err) {
      console.error('Error creating order in MongoDB, using fallback:', err.message);
    }
  }

  memOrders.unshift(newOrderData);
  return res.status(201).json({ success: true, source: 'memory', data: newOrderData });
};

export const getTransporters = (req, res) => {
  return res.json({ success: true, count: transporters.length, data: transporters });
};

export const getStorages = (req, res) => {
  return res.json({ success: true, count: storages.length, data: storages });
};

export const bookStorage = (req, res) => {
  const { storageId, farmerName, crop, quintals, durationWeeks } = req.body;
  if (!storageId || !quintals) {
    return res.status(400).json({ success: false, message: 'storageId and quintals are required' });
  }

  const newBooking = {
    id: `BKG-${Math.floor(100 + Math.random() * 900)}`,
    storageId,
    farmerName: farmerName || 'Verified Farmer',
    crop: crop || 'Produce Lot',
    quintals: Number(quintals),
    durationWeeks: Number(durationWeeks) || 4,
    status: 'CONFIRMED',
    bookingDate: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  return res.status(201).json({ success: true, data: newBooking });
};
