const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  offerAmount: {
    type: Number,
    required: true,
    min: 0
  },
  contactName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20
  },
  message: {
    type: String,
    required: true,
    maxLength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  }
}, { 
  timestamps: true 
});

// Index for efficient queries
offerSchema.index({ listing: 1, createdAt: -1 });
offerSchema.index({ buyer: 1, createdAt: -1 });
offerSchema.index({ seller: 1, createdAt: -1 });
offerSchema.index({ status: 1 });

module.exports = mongoose.model('Offer', offerSchema);