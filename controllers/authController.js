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
        const { nama, email, password, bidangKeahlian } = req.body;

        const dosen = new Dosen({ nama, email, password, bidangKeahlian });

        await dosen.save();

        res.status(201).json({ message: 'Akun dosen berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.sendProposalToDosen = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getRegisteredDosens = async (req, res) => {
    try {
        const dosens = await Dosen.find();

        res.status(200).json(dosens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
