import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Crop from '../models/Crop.js';
import MandiPrice from '../models/MandiPrice.js';
import ProduceLot from '../models/ProduceLot.js';
import BuyerDemand from '../models/BuyerDemand.js';
import Order from '../models/Order.js';
import { 
  CROPS_CATALOG, 
  MANDI_PRICES, 
  INITIAL_PRODUCE_LOTS, 
  BUYER_DEMANDS, 
  ESCROW_ORDERS 
} from '../data/mockData.js';

dotenv.config();

const seedDatabase = async () => {
  console.log('[Seed] Starting MongoDB Atlas data seed process...');
  const connected = await connectDB();

  if (!connected) {
    console.error('[Seed] Unable to connect to MongoDB Atlas. Check your MONGODB_URI in backend/.env');
    process.exit(1);
  }

  try {
    // 1. Seed Crops
    await Crop.deleteMany({});
    const crops = await Crop.insertMany(CROPS_CATALOG);
    console.log(`[Seed] Inserted ${crops.length} crops into catalog.`);

    // 2. Seed Mandi Prices
    await MandiPrice.deleteMany({});
    const prices = await MandiPrice.insertMany(MANDI_PRICES);
    console.log(`[Seed] Inserted ${prices.length} mandi price records.`);

    // 3. Seed Produce Lots
    await ProduceLot.deleteMany({});
    const lots = await ProduceLot.insertMany(INITIAL_PRODUCE_LOTS);
    console.log(`[Seed] Inserted ${lots.length} active produce lots.`);

    // 4. Seed Buyer Demands
    await BuyerDemand.deleteMany({});
    const demands = await BuyerDemand.insertMany(BUYER_DEMANDS);
    console.log(`[Seed] Inserted ${demands.length} buyer procurement demands.`);

    // 5. Seed Orders
    await Order.deleteMany({});
    const orders = await Order.insertMany(ESCROW_ORDERS);
    console.log(`[Seed] Inserted ${orders.length} escrow trade orders.`);

    console.log('\n[Seed] Database seeded successfully on MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();

