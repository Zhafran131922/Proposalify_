const express = require('express');
const router = express.Router();
const ReviewProposal = require('../models/ReviewProposal');
const sendNotificationToOwner = require('../services/emailService');

// Endpoint untuk mendapatkan proposal yang akan direview oleh dosen
router.get('/:proposalId', async (req, res) => {
    try {
      const proposalId = req.params.proposalId;
      const reviewProposal = await ReviewProposal.findOne({ proposal: proposalId }).populate('proposal');
      if (!reviewProposal) {
        return res.status(404).json({ message: 'Review proposal not found' });
      }
      // Ambil alamat email pemilik proposal dari data proposal
      const email = reviewProposal.proposal.user_email; // Pastikan Anda menyesuaikan dengan struktur data proposal Anda
      res.status(200).json(reviewProposal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Endpoint untuk mereview proposal
router.post('/:proposalId', async (req, res) => {
    try {
      const { title, background, deskripsiUsaha, penutup, lampiran, recipientEmail } = req.body;
      const proposalId = req.params.proposalId;
  
      // Simpan review proposal ke dalam database
      const review = new ReviewProposal({
        proposal: proposalId,
        review: {
          title,
          background,
          deskripsiUsaha,
          penutup,
          lampiran
        }
      });
      await review.save();
  
      // Kirim notifikasi email ke pemilik proposal
      await sendNotificationToOwner(recipientEmail, proposalId);
  
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




module.exports = router;
