// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const token = req.headers.authorization.split(' ')[1];

    // Verifikasi token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil user berdasarkan id yang tersimpan di token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    // Tambahkan user ke objek request untuk digunakan di rute berikutnya
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Autentikasi gagal' });
  }
};
