const express = require('express');
const router = express.Router();
const { addTransaksi, getTransaksiByIdUser, getTransaksi, getNota, getTransaksiFilteredByDate, updateTransaksi, deleteTransaksi } = require('../controller/transaksiController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');
const midTrans = require('../middlewares/validateTrans');
// Routes

//kasir
router.post("/add", auth.verify, middleware.isKasir, midTrans.addTrans, addTransaksi);
router.get("/nota/:id", auth.verify, middleware.isKasir, getNota);
router.put("/update/:id", auth.verify, middleware.isKasir, midTrans.updateTrans, updateTransaksi);
router.delete("/delete/:id_transaksi", auth.verify, middleware.isKasir, deleteTransaksi);

//manajer
router.get("/", auth.verify, getTransaksi);
router.get("/manajer/kasir/:id", auth.verify, middleware.isManajer, getTransaksiByIdUser);
router.get("/manajer/FilterDate/:tgl_transaksi", auth.verify, middleware.isManajer, getTransaksiFilteredByDate);

module.exports = router;