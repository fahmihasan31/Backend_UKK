const express = require('express');
const router = express.Router();
const { addMeja, getMeja, updateMeja, deleteMeja, findMeja } = require('../controller/mejaController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');
// Routes


router.post("/", auth.verify, middleware.isAdmin, addMeja);
router.get("/", getMeja);
router.get("/search/:key", findMeja);
router.put("/:id", auth.verify, middleware.isAdmin, updateMeja);
router.delete("/:id", auth.verify, middleware.isAdmin, deleteMeja);

module.exports = router