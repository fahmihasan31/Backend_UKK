const express = require('express');
const router = express.Router();
const { addTransaksi, getTransaksiKasir, getTransaksiManajer, getNota, getTransaksiFilteredByDate, updateTransaksi } = require('../controller/transaksiController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');
// Routes

//kasir
router.post("/", auth.verify, middleware.isKasir, addTransaksi);
router.get("/nota/:id", auth.verify, middleware.isKasir, getNota);
router.get("/kasir/filter/transaksi", auth.verify, middleware.isKasir, getTransaksiKasir); //masih error gajelas 
router.put("/update/:id", auth.verify, middleware.isKasir, updateTransaksi);

//manajer
router.get("/manajer", auth.verify, middleware.isManajer, getTransaksiManajer);
router.get("/manajer/Filter/date", auth.verify, middleware.isManajer, getTransaksiFilteredByDate);

module.exports = router;