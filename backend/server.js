/**
 * Express server configuration and startup
 * Main entry point for the Primetrade Task Manager API
 * 
 * @description Sets up Express server with middleware, routes, and database connection
 * @author Primetrade Development Team
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables from .env file
dotenv.config();

/**
 * Validate required environment variables
 * Ensures JWT_SECRET is properly configured before server startup
 * @throws {Error} If JWT_SECRET is not defined in environment variables
 */
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET not defined in environment variables');
}

/**
 * Initialize Express application
 * @type {Express.Application}
 */
const app = express();

/**
 * Connect to MongoDB database
 * Establishes connection using configuration from database.js
 */
connectDB();

/**
 * Middleware Configuration
 * Sets up CORS, JSON parsing, and request logging
 */

// Enable Cross-Origin Resource Sharing for frontend communication
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse incoming JSON requests with size limit for security
app.use(express.json({ limit: '10mb' }));

/**
 * Request logging middleware for development and debugging
 * Logs HTTP method, path, and timestamp for each incoming request
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object  
 * @param {Function} next - Express next middleware function
 */
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * API Routes Configuration
 * Mounts authentication and task management route handlers
 */

// Authentication routes: signup, login, profile management
app.use('/api/auth', require('./routes/auth'));

// Task management routes: CRUD operations for tasks
app.use('/api/tasks', require('./routes/tasks'));

/**
 * Health check endpoint
 * Provides server status and uptime information for monitoring
 * 
 * @route GET /health
 * @returns {Object} Server health status with timestamp
 * @example
 * // GET /health
 * // Response: { "status": "Server running", "timestamp": "2024-01-01T00:00:00.000Z" }
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server running', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

/**
 * 404 Error Handler for undefined routes
 * Catches requests to non-existent API endpoints
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Object} 404 error message with requested route
 */
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requestedPath: req.originalUrl,
    method: req.method,
    availableRoutes: ['/api/auth', '/api/tasks', '/health']
  });
});

/**
 * Global Error Handler Middleware
 * Catches and handles all unhandled application errors
 * 
 * @param {Error} err - The error object containing error details
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Formatted error response
 */
app.use((err, req, res, next) => {
  // Log error details for debugging
  console.error(`${new Date().toISOString()} - Error:`, err.message);
  console.error('Stack trace:', err.stack);
  
  // Send appropriate error response based on environment
  res.status(err.status || 500).json({ 
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

/**
 * Server port configuration
 * Uses environment variable PORT or defaults to 5000
 * @type {number}
 */
const PORT = process.env.PORT || 5000;

/**
 * Start the Express server
 * Binds server to specified port and logs startup information
 * 
 * @param {number} PORT - Port number to listen on
 * @callback - Server startup callback function
 */
app.listen(PORT, () => {
  console.log(`
🚀 Primetrade Task Manager API Server
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📊 Health Check: http://localhost:${PORT}/health
⏰ Started: ${new Date().toISOString()}
  `);
});
