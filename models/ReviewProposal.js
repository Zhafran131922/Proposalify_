// models/ReviewProposal.js
const mongoose = require('mongoose');

const reviewProposalSchema = new mongoose.Schema({
  proposal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proposal',
    required: true
  },
  review: {
    title: String,
    background: String,
    deskripsiUsaha: String,
    penutup: String,
    lampiran: String
  }
}, { timestamps: true });

const ReviewProposal = mongoose.model('ReviewProposal', reviewProposalSchema);

module.exports = ReviewProposal;
