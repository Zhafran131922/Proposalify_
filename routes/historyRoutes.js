// routes/historyRoutes.js

const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Endpoint untuk mendapatkan history proposal yang sudah disubmit oleh seorang user
router.get('/users/:userId/history', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Cari history proposal berdasarkan user ID
    const history = await History.find({ userId }).sort({ timestamp: -1 });

    // Kembalikan data history
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
