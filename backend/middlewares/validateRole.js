const checkRole = (roles) => {
  return (req, res, next) => {
    // Pastikan token sudah diverifikasi di middleware verify
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized"
      });
    }

    // Periksa apakah role pengguna termasuk dalam role yang diizinkan
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: Anda tidak memiliki hak akses"
      });
    }

    next(); // Lanjutkan ke route berikutnya jika role sesuai
  };
};


exports.isAdmin = checkRole(['admin']);
exports.isKasir = checkRole(['kasir']);
exports.isManajer = checkRole(['manajer']);