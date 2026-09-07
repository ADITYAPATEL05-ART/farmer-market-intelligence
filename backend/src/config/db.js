import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn('⚠️  [MongoDB] MONGODB_URI is not configured with actual credentials in backend/.env.');
    console.warn('⚠️  [MongoDB] Running in fallback mode using in-memory dataset until Atlas credentials are provided.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`✅ [MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);
    console.log(`📦 [MongoDB Atlas] Database: ${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ [MongoDB Atlas] Connection error:', err.message);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  [MongoDB Atlas] Disconnected from database');
      isConnected = false;
    });

    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Atlas] Initial connection failed: ${error.message}`);
    console.warn('⚠️  [MongoDB] Falling back to in-memory mode so server stays operational.');
    isConnected = false;
    return false;
  }
};

export const isDBConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

export default connectDB;

