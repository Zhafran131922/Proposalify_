// authController.js

const authService = require('../services/authService');
const User = require('../models/User');
const Dosen = require('../models/Dosen');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.registerDosen = async (req, res) => {
    try {
        // Dapatkan data akun dosen dari body permintaan
        const { nama, email, password } = req.body;

        // Buat instansiasi objek Dosen
        const dosen = new Dosen({ nama, email, password });

        // Simpan data dosen ke dalam MongoDB
        await dosen.save();

        res.status(201).json({ message: 'Akun dosen berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendProposalToDosen = async (req, res) => {
    try {
        // Lakukan logika pengiriman proposal ke dosen di sini
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
