const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: true
  },
  nonce: {
    type: String,
    required: true,
    default: () => Math.floor(Math.random() * 1000000).toString()
  }
});

module.exports = mongoose.model('User', userSchema); 