/**
 * User Model Schema
 * Defines the structure for user documents in MongoDB
 */
const mongoose = require('mongoose');

/**
 * User schema definition with validation rules
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    lowercase: true, // Convert to lowercase
    trim: true // Remove whitespace
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export User model
module.exports = mongoose.model('User', userSchema);
