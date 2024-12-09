const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ethers = require('ethers');
const crypto = require('crypto');

// Generate nonce for wallet signature
const generateNonce = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Verify wallet signature
const verifySignature = (message, signature, walletAddress) => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    return false;
  }
};

exports.getNonce = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        walletAddress: walletAddress.toLowerCase(),
        nonce: generateNonce()
      });
      await user.save();
    } else {
      // Update nonce for existing user
      user.nonce = generateNonce();
      await user.save();
    }
    
    res.json({ nonce: user.nonce });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyWallet = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;
    
    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const message = `Sign this message to verify your wallet. Nonce: ${user.nonce}`;
    const isValid = verifySignature(message, signature, walletAddress);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    // Generate new nonce for next login
    user.nonce = generateNonce();
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      avatar: req.body.avatar
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};