// routes/proposalRoutes.js

const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');
const SubmittedProposal = require('../models/SubmittedProposal');
const proposalController = require('../controllers/proposalController');
const Dosen = require('../models/Dosen');
const sendProposalNotification = require('../services/emailService');


// Endpoint untuk menyimpan proposal
router.post('/proposals', async (req, res) => {
    try {
      const { user_id, title, background, deskripsiUsaha, penutup, lampiran, folder_id } = req.body;
  
      // Buat proposal baru
      const proposal = new Proposal({
        user_id,
        title,
        background,
        deskripsiUsaha,
        penutup,
        lampiran,
        folder_id // Tentukan folder tempat proposal akan disimpan
      });
  
      // Simpan proposal ke dalam basis data
      await proposal.save();
  
      res.status(201).json({ message: 'Proposal berhasil disimpan' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// routes/proposalRoutes.js

// Endpoint untuk mengirim proposal ke administrator
  

router.post('/send-proposal-to-admin', async (req, res) => {
    try {
        const { proposalId, adminId } = req.body;

        // Ambil proposal dari basis data berdasarkan ID
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal tidak ditemukan' });
        }

        // Perbarui proposal untuk menetapkan ID administrator yang dituju
        proposal.admin_id = adminId;

        // Simpan proposal yang diperbarui ke dalam basis data
        await proposal.save();

        // Simpan proposal ke dalam koleksi "submitted_proposals"
        const submittedProposal = new SubmittedProposal({
            proposal_id: proposal._id,
            admin_id: adminId
        });
        await submittedProposal.save();

        res.status(200).json({ message: 'Proposal berhasil dikirim ke administrator' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/send-proposal-to-dosen', async (req, res) => {
  try {
      const { proposal_id, dosen_email } = req.body;

      // Temukan proposal dari database "proposals" berdasarkan proposal_id
      const proposal = await Proposal.findById(proposal_id);
      if (!proposal) {
          return res.status(404).json({ message: 'Proposal not found' });
      }

      // Temukan dosen dari database "dosens" berdasarkan email
      const dosen = await Dosen.findOne({ email: dosen_email });
      if (!dosen) {
          return res.status(404).json({ message: 'Dosen not found' });
      }

      // Pastikan bahwa dosen memiliki properti proposals dan inisialisasi jika belum ada
      if (!dosen.proposals) {
          dosen.proposals = [];
      }

      // Kirim proposal ke dosen
      dosen.proposals.push(proposal);
      await dosen.save();

      // Kirim email notifikasi ke dosen
      await sendProposalNotification(dosen_email);

      res.status(200).json({ message: 'Proposal sent to dosen successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



module.exports = router;
