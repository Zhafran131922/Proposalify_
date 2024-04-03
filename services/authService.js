// authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Dosen = require('../models/Dosen');

// Fungsi untuk mendaftarkan pengguna baru
exports.register = async ({ username, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    return await user.save();
};

// Fungsi untuk melakukan login
exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return token;
};

// authService.js

exports.registerDosen = async (userData) => {
    try {
        const { nama, email, password } = userData;

        // Enkripsi password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat objek Dosen baru dengan data yang diterima
        const dosen = new Dosen({ nama, email, password: hashedPassword });

        // Simpan objek Dosen ke dalam MongoDB
        await dosen.save();

        // Kembalikan objek Dosen yang baru saja disimpan
        return dosen;
    } catch (error) {
        throw new Error('Gagal menambahkan akun dosen: ' + error.message);
    }
};
