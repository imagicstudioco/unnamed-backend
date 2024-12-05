const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', campaignController.getCampaigns);
router.get('/:id', campaignController.getCampaign);

// Protected routes
router.post('/', auth, campaignController.createCampaign);
router.put('/:id', auth, campaignController.updateCampaign);
router.delete('/:id', auth, campaignController.deleteCampaign);

module.exports = router; 