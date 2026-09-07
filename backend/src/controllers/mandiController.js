import { CROPS_CATALOG, MANDI_PRICES } from '../data/mockData.js';
import Crop from '../models/Crop.js';
import MandiPrice from '../models/MandiPrice.js';
import { isDBConnected } from '../config/db.js';

export const getCrops = async (req, res) => {
  const { category } = req.query;

  if (isDBConnected()) {
    try {
      const query = category ? { category: { $regex: `^${category}$`, $options: 'i' } } : {};
      const crops = await Crop.find(query);
      return res.json({ success: true, count: crops.length, source: 'mongodb', data: crops });
    } catch (err) {
      console.error('Error reading crops from MongoDB, using fallback:', err.message);
    }
  }

  // Fallback
  if (category) {
    const filtered = CROPS_CATALOG.filter(
      c => c.category.toLowerCase() === category.toLowerCase()
    );
    return res.json({ success: true, count: filtered.length, source: 'memory', data: filtered });
  }
  return res.json({ success: true, count: CROPS_CATALOG.length, source: 'memory', data: CROPS_CATALOG });
};

export const getPrices = async (req, res) => {
  const { crop, state } = req.query;

  if (isDBConnected()) {
    try {
      const filter = {};
      if (crop) filter.crop = { $regex: crop, $options: 'i' };
      if (state) filter.state = { $regex: state, $options: 'i' };

      const prices = await MandiPrice.find(filter).sort({ modalPrice: -1 });
      return res.json({ success: true, count: prices.length, source: 'mongodb', data: prices });
    } catch (err) {
      console.error('Error reading prices from MongoDB, using fallback:', err.message);
    }
  }

  // Fallback
  let results = [...MANDI_PRICES];
  if (crop) {
    results = results.filter(p => p.crop.toLowerCase().includes(crop.toLowerCase()));
  }
  if (state) {
    results = results.filter(p => p.state.toLowerCase() === state.toLowerCase());
  }
  return res.json({ success: true, count: results.length, source: 'memory', data: results });
};

export const getForecast = (req, res) => {
  const { crop = 'Tomato (Hybrid)' } = req.query;
  const forecast = [
    { day: 'Today', predictedPrice: 2850, confidence: '96%', advice: 'Hold 2 days for higher arrivals at Azadpur' },
    { day: 'Tomorrow', predictedPrice: 2920, confidence: '94%', advice: 'Demand peak expected from NCR retail chains' },
    { day: '+2 Days', predictedPrice: 3010, confidence: '91%', advice: 'Optimal selling window' },
    { day: '+3 Days', predictedPrice: 2950, confidence: '87%', advice: 'Supply normalization begins' }
  ];

  return res.json({
    success: true,
    crop,
    recommendation: 'SELL_WITHIN_48_HOURS',
    forecast
  });
};
