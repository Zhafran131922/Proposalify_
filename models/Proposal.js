const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Merujuk ke model User
    required: true
  },
  title: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  deskripsiUsaha: {
    type: String,
    required: true
  },
  penutup: {
    type: String,
    required: true
  },
  lampiran: {
    type: String,
    required: true
  },
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
