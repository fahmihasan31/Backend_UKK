const { body, param, validationResult } = require('express-validator');

const addTrans = [
  // Validasi id_user, id_meja, dan nama_pelanggan
  body('id_user').notEmpty().withMessage('id_user harus diisi.'),
  body('id_meja').notEmpty().withMessage('id_meja harus diisi.'),
  body('nama_pelanggan').notEmpty().withMessage('nama_pelanggan harus diisi.'),

  body('detailTransaksi').isArray().withMessage('detailTransaksi harus berupa array.').notEmpty().withMessage('detailTransaksi tidak boleh kosong.'),

  // Middleware untuk memeriksa hasil validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: 'Validasi gagal',
        errors: errors.array(),
      });
    }
    next();
  },
];

const updateTrans = [
  // Validasi ID transaksi
  param('id')
    .notEmpty()
    .withMessage('ID transaksi harus diisi.'),

  // Validasi status transaksi
  body('status')
    .notEmpty()
    .withMessage('Status harus diisi.')
    .isIn(['belum_bayar', 'lunas'])
    .withMessage('Status harus berupa salah satu dari: belum_bayar, lunas'),

  // Middleware untuk memeriksa hasil validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: 'Validasi gagal',
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = { addTrans, updateTrans };

