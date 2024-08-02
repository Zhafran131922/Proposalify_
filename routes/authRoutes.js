const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/register/admin', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role 
        });
        await user.save();

        res.status(201).json({ message: 'Pendaftaran berhasil' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/login/admin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email atau kata sandi salah' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau kata sandi salah' });
        }

        if (user.role !== 'administrator') {
            return res.status(403).json({ message: 'Akses ditolak: Hanya administrator yang dapat login' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login berhasil', token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register/user', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: "user"
        });

        await user.save();

        res.status(201).json({ message: 'Pendaftaran berhasil' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login/user', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email atau kata sandi salah' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau kata sandi salah' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login berhasil', 
            token, 
            role: user.role,
            name: user.username,  // Sertakan nama
            email: user.email // Sertakan email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post('/admin/register-dosen', roleMiddleware('administrator'), authController.registerDosen);


module.exports = router;
