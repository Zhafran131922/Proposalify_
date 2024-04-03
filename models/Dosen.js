const mongoose = require('mongoose');

const dosenSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Tambahkan bidang lain sesuai kebutuhan
});

const Dosen = mongoose.model('Dosen', dosenSchema);

module.exports = Dosen;
