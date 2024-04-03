// userController.js

const User = require('../models/User');

// Fungsi untuk membuat pengguna baru
exports.createUser = async (req, res) => {
    try {
        // Mendapatkan data pengguna dari body request
        const { username, email, password } = req.body;

        // Membuat instance pengguna baru
        const user = new User({
            username,
            email,
            password
        });

        // Menyimpan pengguna ke database
        await user.save();

        res.status(201).json({ message: 'Pengguna berhasil dibuat', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat membuat pengguna');
    }
};

// Fungsi untuk mendapatkan semua pengguna
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mendapatkan pengguna');
    }
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mendapatkan pengguna');
    }
};

// Fungsi untuk memperbarui pengguna
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        // Cek apakah pengguna dengan ID yang diberikan ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Update data pengguna
        user.username = username;
        user.email = email;
        user.password = password;

        // Simpan perubahan
        await user.save();

        res.status(200).json({ message: 'Pengguna berhasil diperbarui', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat memperbarui pengguna');
    }
};

// Fungsi untuk menghapus pengguna
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Cek apakah pengguna dengan ID yang diberikan ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Hapus pengguna dari database
        await user.remove();

        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menghapus pengguna');
    }
};
// userController.js

exports.registerUser = async (req, res) => {
    try {
        // Logika registrasi pengguna di sini
        res.send('Registrasi pengguna berhasil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat melakukan registrasi pengguna');
    }
};
