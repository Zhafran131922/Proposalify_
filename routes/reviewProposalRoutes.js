const express = require('express');
const router = express.Router();
const ReviewProposal = require('../models/ReviewProposal');
const sendNotificationToOwner = require('../services/emailService');

router.get('/:proposalId', async (req, res) => {
    try {
      const proposalId = req.params.proposalId;
      const reviewProposal = await ReviewProposal.findOne({ proposal: proposalId }).populate('proposal');
      if (!reviewProposal) {
        return res.status(404).json({ message: 'Review proposal not found' });
      }
      const email = reviewProposal.proposal.user_email; 
      res.status(200).json(reviewProposal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/:proposalId', async (req, res) => {
    try {
        const { komentar, recipientEmail } = req.body;
        const proposalId = req.params.proposalId;

        const review = new ReviewProposal({
            proposal: proposalId,
            komentar: komentar
        });
        await review.save();

        await sendNotificationToOwner(recipientEmail, proposalId);

        res.status(201).json({ message: 'Review submitted successfullhhhy' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
