/**
 * MongoDB Database Connection Configuration
 * Handles connection to MongoDB using Mongoose ODM
 * 
 * @description Establishes and manages MongoDB connection with error handling
 * @author Primetrade Development Team
 * @version 1.0.0
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Establishes connection using URI from environment variables
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Promise that resolves when connection is established
 * @throws {Error} If connection fails or MONGODB_URI is not provided
 * 
 * @example
 * // Usage in server.js
 * const connectDB = require('./config/database');
 * connectDB();
 */
const connectDB = async () => {
  try {
    // Validate MongoDB URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    /**
     * Mongoose connection options for optimal performance
     * @type {Object}
     */
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maximum number of connections
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Socket timeout
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // Disable mongoose buffering
    };

    // Establish connection to MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
    
    // Connection event listeners for monitoring
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // Exit process in production, throw error in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
