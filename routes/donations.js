const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const auth = require('../middleware/auth');

router.post('/', auth, donationController.createDonation);
router.get('/campaign/:campaignId', donationController.getCampaignDonations);
router.get('/user', auth, donationController.getUserDonations);

module.exports = router; 