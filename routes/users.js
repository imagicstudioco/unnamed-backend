const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.get('/nonce/:walletAddress', userController.getNonce);
router.post('/verify', userController.verifyWallet);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

module.exports = router; 