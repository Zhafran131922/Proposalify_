// middleware/roleMiddleware.js

module.exports = (requiredRole) => {
  return (req, res, next) => {
    // Periksa peran pengguna
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Akses ditolak: Peran pengguna tidak sesuai' });
    }
    next();
  };
};
