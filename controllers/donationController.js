const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

exports.createDonation = async (req, res) => {
  try {
    const { campaignId, amount, message, transactionHash } = req.body;

    // Verify campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const donation = new Donation({
      campaign: campaignId,
      donor: req.user._id,
      amount,
      message,
      transactionHash
    });

    await donation.save();

    // Update campaign raised amount
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { raised: amount }
    });

    await donation.populate('donor', 'name avatar');
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCampaignDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ campaign: req.params.campaignId })
      .populate('donor', 'name avatar')
      .sort('-createdAt');

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate('campaign', 'title image')
      .sort('-createdAt');

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 