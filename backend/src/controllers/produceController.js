import { INITIAL_PRODUCE_LOTS, BUYER_DEMANDS } from '../data/mockData.js';
import ProduceLot from '../models/ProduceLot.js';
import BuyerDemand from '../models/BuyerDemand.js';
import { isDBConnected } from '../config/db.js';

let memLots = [...INITIAL_PRODUCE_LOTS];
let memDemands = [...BUYER_DEMANDS];

export const getLots = async (req, res) => {
  const { crop, status } = req.query;

  if (isDBConnected()) {
    try {
      const filter = {};
      if (crop) filter.crop = { $regex: crop, $options: 'i' };
      if (status) filter.status = status.toUpperCase();

      const lots = await ProduceLot.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, count: lots.length, source: 'mongodb', data: lots });
    } catch (err) {
      console.error('Error reading lots from MongoDB, using fallback:', err.message);
    }
  }

  // Fallback to in-memory
  let results = [...memLots];
  if (crop) {
    results = results.filter(l => l.crop.toLowerCase().includes(crop.toLowerCase()));
  }
  if (status) {
    results = results.filter(l => l.status.toLowerCase() === status.toLowerCase());
  }
  return res.json({ success: true, count: results.length, source: 'memory', data: results });
};

export const createLot = async (req, res) => {
  const lotData = req.body;
  if (!lotData.crop || !lotData.farmerName || !lotData.expectedPricePerQuintal) {
    return res.status(400).json({ success: false, message: 'crop, farmerName, and expectedPricePerQuintal are required' });
  }

  const newLotData = {
    ...lotData,
    id: lotData.id || `LOT-${Math.floor(100 + Math.random() * 900)}`,
    status: lotData.status || 'ACTIVE',
    offers: lotData.offers || [],
    distanceKm: lotData.distanceKm || Math.floor(8 + Math.random() * 25),
    verifiedFPO: lotData.verifiedFPO !== undefined ? lotData.verifiedFPO : true
  };

  if (isDBConnected()) {
    try {
      const createdLot = await ProduceLot.create(newLotData);
      return res.status(201).json({ success: true, source: 'mongodb', data: createdLot });
    } catch (err) {
      console.error('Error creating lot in MongoDB, using fallback:', err.message);
    }
  }

  // Fallback
  memLots.unshift(newLotData);
  return res.status(201).json({ success: true, source: 'memory', data: newLotData });
};

export const submitOffer = async (req, res) => {
  const { id } = req.params;
  const { buyerName, amountPerQuintal } = req.body;

  const newOffer = {
    id: `OFF-${Math.floor(300 + Math.random() * 700)}`,
    buyerName: buyerName || 'Verified Corporate Buyer',
    amountPerQuintal: Number(amountPerQuintal),
    status: 'PENDING',
    date: new Date().toISOString().split('T')[0]
  };

  if (isDBConnected()) {
    try {
      const lot = await ProduceLot.findOne({ id });
      if (!lot) {
        return res.status(404).json({ success: false, message: 'Produce lot not found' });
      }
      lot.offers.push(newOffer);
      await lot.save();
      return res.json({ success: true, source: 'mongodb', data: newOffer, lot });
    } catch (err) {
      console.error('Error adding offer in MongoDB, using fallback:', err.message);
    }
  }

  // Fallback
  const lotIndex = memLots.findIndex(l => l.id === id);
  if (lotIndex === -1) {
    return res.status(404).json({ success: false, message: 'Produce lot not found' });
  }
  memLots[lotIndex].offers.push(newOffer);
  return res.json({ success: true, source: 'memory', data: newOffer, lot: memLots[lotIndex] });
};

export const getDemands = async (req, res) => {
  if (isDBConnected()) {
    try {
      const demands = await BuyerDemand.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: demands.length, source: 'mongodb', data: demands });
    } catch (err) {
      console.error('Error reading demands from MongoDB, using fallback:', err.message);
    }
  }
  return res.json({ success: true, count: memDemands.length, source: 'memory', data: memDemands });
};

export const createDemand = async (req, res) => {
  const demandData = req.body;
  if (!demandData.crop || !demandData.buyerName) {
    return res.status(400).json({ success: false, message: 'crop and buyerName are required' });
  }

  const newDemandData = {
    ...demandData,
    id: demandData.id || `DEM-${Math.floor(400 + Math.random() * 600)}`,
    status: 'OPEN'
  };

  if (isDBConnected()) {
    try {
      const createdDemand = await BuyerDemand.create(newDemandData);
      return res.status(201).json({ success: true, source: 'mongodb', data: createdDemand });
    } catch (err) {
      console.error('Error creating demand in MongoDB, using fallback:', err.message);
    }
  }

  memDemands.unshift(newDemandData);
  return res.status(201).json({ success: true, source: 'memory', data: newDemandData });
};
