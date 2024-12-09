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

// Database connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  });
  
  cachedDb = db;
  return db;
}

// Routes with async DB connection
app.use('/api/campaigns', async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Database connection failed' });
  }
}, campaignRoutes);

app.use('/api/users', async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Database connection failed' });
  }
}, userRoutes);

app.use('/api/donations', async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Database connection failed' });
  }
}, donationRoutes);

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
