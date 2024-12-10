const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  message: {
    type: String,
    trim: true
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema); 