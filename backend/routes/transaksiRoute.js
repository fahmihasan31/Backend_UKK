const express = require('express');
const router = express.Router();
const { addTransaksi, getTransaksiByIdUser, getTransaksiManajer, getNota, getTransaksiFilteredByDate, updateTransaksi } = require('../controller/transaksiController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');
const midTrans = require('../middlewares/validateTrans');
// Routes

//kasir
router.post("/", auth.verify, middleware.isKasir, midTrans.addTrans, addTransaksi);
router.get("/nota/:id", auth.verify, middleware.isKasir, getNota);
router.get("/kasir/:id", auth.verify, middleware.isKasir, getTransaksiByIdUser); //masih error gajelas 
router.put("/update/:id", auth.verify, middleware.isKasir, midTrans.updateTrans, updateTransaksi);

//manajer
router.get("/manajer", auth.verify, middleware.isManajer, getTransaksiManajer);
router.get("/manajer/FilterDate/:tgl_transaksi", auth.verify, middleware.isManajer, getTransaksiFilteredByDate);

module.exports = router;