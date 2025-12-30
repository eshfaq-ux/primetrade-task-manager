/**
 * Task Model Schema
 * Defines the structure for task documents in MongoDB
 */
const mongoose = require('mongoose');

/**
 * Task schema definition with validation and relationships
 */
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 // Limit title length
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500 // Limit description length
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], // Only allow these values
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create indexes for better query performance
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

// Create and export Task model
module.exports = mongoose.model('Task', taskSchema);
