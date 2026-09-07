import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB, { isDBConnected } from './config/db.js';
import mandiRoutes from './routes/mandiRoutes.js';
import produceRoutes from './routes/produceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow any origin during development or from Vercel deployment domains
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Welcome & API Index
app.get('/', (req, res) => {
  res.json({
    message: 'Farmer Market Intelligence API Server is running',
    version: '1.0.0',
    status: 'online',
    database: isDBConnected() ? 'connected (MongoDB Atlas)' : 'in-memory mode',
    endpoints: {
      health: '/api/health',
      crops: '/api/mandi/crops',
      mandiPrices: '/api/mandi/prices',
      priceForecast: '/api/mandi/forecast',
      produceLots: '/api/produce/lots',
      buyerDemands: '/api/produce/demands',
      orders: '/api/orders',
      transporters: '/api/transporters',
      coldStorages: '/api/storages'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Farmer Market Intelligence Backend',
    database: isDBConnected() ? 'connected (MongoDB Atlas)' : 'in-memory mode (MongoDB URI pending in backend/.env)'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api', orderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Farmer Market Intelligence Backend listening on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
