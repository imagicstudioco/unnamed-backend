const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');
const User = require('../models/User');

async function seedDatabase() {
  try {
    // Clear existing data
    await Campaign.deleteMany({});
    await User.deleteMany({});

    // Create a test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      walletAddress: '0x1234567890abcdef',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      nonce: Math.floor(Math.random() * 1000000).toString()
    });

    // Create sample campaigns
    const campaigns = [
      {
        title: 'Medical Support Fund',
        description: 'Help provide essential medical care for those in need.',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop',
        goal: 50000,
        raised: 15000,
        creator: user._id,
        category: 'medical',
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Education for All',
        description: 'Supporting underprivileged students with educational resources.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        goal: 25000,
        raised: 8000,
        creator: user._id,
        category: 'education',
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Environmental Conservation',
        description: 'Protecting local wildlife and natural habitats.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        goal: 35000,
        raised: 12000,
        creator: user._id,
        category: 'environment',
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      }
    ];

    await Campaign.insertMany(campaigns);
    console.log('Database seeded successfully');
  } catch (error) {
    console.warn('Error seeding database:', error);
  }
}

module.exports = seedDatabase; 