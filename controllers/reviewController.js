const Review = require('../models/Review');
const Proposal = require('../models/Proposal');
const sendProposalNotification = require('../services/emailService');

exports.reviewProposal = async (req, res) => {
    try {
        const { proposal_id, username, dosen_email } = req.body; // Mendapatkan dosen_email dari req.body

        // Pastikan proposal dengan proposal_id tersedia
        const proposal = await Proposal.findById(proposal_id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        // Simpan proposal ke dalam koleksi review
        const review = new Review({
            username, // Menggunakan username dosen sebagai pengenal unik
            proposal: proposal_id
        });
        await review.save();

        // Kirim email notifikasi ke dosen
        await sendProposalNotification(dosen_email); // Menggunakan dosen_email

        res.status(201).json({ message: 'Proposal sent for review successfullyss' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewProposalsByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        // Temukan proposal yang harus direview oleh dosen dengan username tertentu
        const reviewProposals = await Review.find({ username }).populate('proposal');
        res.status(200).json(reviewProposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
