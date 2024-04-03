// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route untuk membuat pengguna baru
router.post('/users', userController.createUser);

// Route untuk mendapatkan semua pengguna
router.get('/users', userController.getUsers);

// Route untuk mendapatkan pengguna berdasarkan ID
router.get('/users/:id', userController.getUserById);

// Route untuk memperbarui pengguna
router.put('/users/:id', userController.updateUser);

// Route untuk menghapus pengguna
router.delete('/users/:id', userController.deleteUser);

// Route untuk registrasi pengguna
router.post('/register', userController.registerUser); // Perhatikan bahwa Anda perlu menambahkan callback function yang valid di sini

module.exports = router;
