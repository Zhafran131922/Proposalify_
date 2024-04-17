//adminController.js

const Proposal = require('../models/Proposal');
const Dosen = require('../models/Dosen');
const SubmittedProposal = require('../models/SubmittedProposal');

exports.sendProposalToDosen = async (req, res) => {
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

        // Kirim proposal ke dosen (logika pengiriman proposal ke email dosen)

        // Tambahkan proposal ke dalam submitted proposals milik dosen
        const submittedProposal = new SubmittedProposal({ proposal });
        dosen.submittedProposals.push(submittedProposal);
        await dosen.save();

        res.status(200).json({ message: 'Proposal sent to dosen successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProposalsForDosen = async (req, res) => {
    try {
        const { username } = req.params;

        // Temukan dosen berdasarkan username
        const dosen = await Dosen.findOne({ username });
        if (!dosen) {
            return res.status(404).json({ message: 'Dosen not found' });
        }

        // Ambil daftar proposal yang sudah dikirimkan ke dosen
        const submittedProposals = dosen.submittedProposals;

        res.status(200).json({ submittedProposals });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
