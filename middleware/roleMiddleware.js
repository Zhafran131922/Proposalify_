module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Akses ditolak: Peran pengguna tidak sesuai' });
    }
    next();
  };
};
