const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const campaignRoutes = require('./routes/campaigns');
const userRoutes = require('./routes/users');
const donationRoutes = require('./routes/donations');
const commentRoutes = require('./routes/comments');
const seedDatabase = require('./seeds/seed');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection and seeding
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if seeding is needed (you can add this to your .env)
    if (process.env.SEED_DATABASE === 'true') {
      await seedDatabase();
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
