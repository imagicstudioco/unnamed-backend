const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const auth = require('../middleware/auth');

// Get comments for a campaign
router.get('/campaign/:campaignId', async (req, res) => {
  try {
    const comments = await Comment.find({ campaign: req.params.campaignId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment
router.post('/', auth, async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      campaign: req.body.campaignId,
      user: req.user._id
    });
    const savedComment = await comment.save();
    const populatedComment = await Comment.findById(savedComment._id)
      .populate('user', 'name avatar');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 