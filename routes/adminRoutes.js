const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Proposal = require('../models/Proposal');
const Dosen = require('../models/Dosen');
const sendProposalNotification = require('../services/emailService');


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

        res.status(200).json({ message: 'Proposal sent to dosen successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
