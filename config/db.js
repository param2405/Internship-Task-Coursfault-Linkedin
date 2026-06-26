const mongoose = require('mongoose');

/**
 * Centralized MongoDB connection helper.
 * Keeps connection code in one place for clarity and testability.
 */
const connectDB = async (uri, fallback) => {
  const mongoUri = (uri || process.env.MONGO_URI || '').trim();
  const connectionString = !mongoUri || mongoUri === 'your_mongodb_connection_string' ? (fallback || 'mongodb://127.0.0.1:27017/casualfunel') : mongoUri;

  try {
    await mongoose.connect(connectionString, { });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
