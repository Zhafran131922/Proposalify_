// userService.js

const User = require('../models/User');

// Fungsi untuk membuat pengguna baru
exports.createUser = async ({ username, email, password, role }) => {
    const user = new User({ username, email, password, role });
    return await user.save();
};

// Fungsi untuk mendapatkan semua pengguna
exports.getUsers = async () => {
    return await User.find();
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
exports.getUserById = async (userId) => {
    return await User.findById(userId);
};

// Fungsi untuk memperbarui pengguna
exports.updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

// Fungsi untuk menghapus pengguna
exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};
