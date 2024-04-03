// models/SubmittedProposal.js

const mongoose = require('mongoose');

const submittedProposalSchema = new mongoose.Schema({
    proposal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal', // Merujuk ke model Proposal
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Merujuk ke model Admin jika ada
        required: true
    }
    // Anda dapat menambahkan bidang lain sesuai kebutuhan
});

const SubmittedProposal = mongoose.model('SubmittedProposal', submittedProposalSchema);

module.exports = SubmittedProposal;
