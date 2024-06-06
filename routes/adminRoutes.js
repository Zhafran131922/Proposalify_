//adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Proposal = require('../models/Proposal');
const Dosen = require('../models/Dosen');
const sendProposalNotification = require('../services/emailService');
const ReviewController = require('../controllers/reviewController');
// const { authenticateUser } = require('../middleware/authMiddleware');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Endpoint untuk mengirimkan proposal ke email dosen
router.post('/send-proposal-to-dosen', async (req, res) => {
    try {
        const { proposal_id, dosen_email } = req.body;

        // Temukan proposal dari database "proposals" berdasarkan proposal_id
        const proposal = await Proposal.findById(proposal_id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        const dosen = await Dosen.findOne({ email: dosen_email });
        if (!dosen) {
            return res.status(404).json({ message: 'Dosen not found' });
        }

        if (!dosen.proposals) {
            dosen.proposals = [];
        }

        dosen.proposals.push(proposal);
        await dosen.save();

        await sendProposalNotification(dosen_email);

        res.status(200).json({ message: 'Proposal sent to dosen successfullyyyyy' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/proposals/dosen/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const dosen = await Dosen.findOne({ username });
        if (!dosen) {
            return res.status(404).json({ message: 'Dosen not found' });
        }

        const proposals = await Proposal.find({ _id: { $in: dosen.proposals } });

        res.status(200).json({ proposals });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/dosens', async (req, res) => {
    try {
        const dosens = await Dosen.find();
        
        res.status(200).json({ dosens });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/dosens/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDosen = await Dosen.findByIdAndDelete(id);

        if (!deletedDosen) {
            return res.status(404).json({ message: 'Akun dosen tidak ditemukan' });
        }

        res.status(200).json({ message: 'Akun dosen berhasil dihapus', deletedDosen });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/review-proposal', ReviewController.reviewProposal);

router.get('/proposals/:username', adminController.getProposalsForDosen);

module.exports = router;
