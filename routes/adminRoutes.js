//adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Proposal = require('../models/Proposal');
const Dosen = require('../models/Dosen');
const sendProposalNotification = require('../services/emailService');
const ReviewController = require('../controllers/reviewController');

// Endpoint untuk mengirimkan proposal ke email dosen
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

        res.status(200).json({ message: 'Proposal sent to dosen successfullyyyyy' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/proposals/dosen/:username', async (req, res) => {
    try {
        const { username } = req.params;

        // Temukan dosen berdasarkan username
        const dosen = await Dosen.findOne({ username });
        if (!dosen) {
            return res.status(404).json({ message: 'Dosen not found' });
        }

        // Temukan daftar proposal yang dikirimkan ke dosen
        const proposals = await Proposal.find({ _id: { $in: dosen.proposals } });

        res.status(200).json({ proposals });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint untuk dosen menerima proposal untuk direview
router.post('/review-proposal', ReviewController.reviewProposal);

// Endpoint untuk mendapatkan daftar proposal yang harus direview oleh seorang dosen
router.get('/proposals/:username', adminController.getProposalsForDosen);


module.exports = router;
