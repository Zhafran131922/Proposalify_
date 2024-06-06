const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    formulirs: [
        {
            judulFormulir: {
                type: String,
                required: true
            },
            isi: {
                teks: {
                    type: String,
                    required: true
                },
                gambar: {
                    type: String, // Path to the image file
                    required: false
                }
            }
        }
    ]
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
