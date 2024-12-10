const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      creator: req.user._id
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const { category, search, sort = '-createdAt' } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const campaigns = await Campaign.find(query)
      .sort(sort)
      .populate('creator', 'name avatar')
      .populate('donorsCount');

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name avatar')
      .populate('donorsCount');
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, creator: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id
    });
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 