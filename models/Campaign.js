const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true,
    min: 0
  },
  raised: {
    type: Number,
    default: 0
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['medical', 'education', 'emergency', 'nonprofit', 'animals', 'sports', 'environment', 'community']
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for donors count
campaignSchema.virtual('donorsCount', {
  ref: 'Donation',
  localField: '_id',
  foreignField: 'campaign',
  count: true
});

// Virtual for days left
campaignSchema.virtual('daysLeft').get(function() {
  return Math.ceil((this.endDate - new Date()) / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Campaign', campaignSchema); 