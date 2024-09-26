const express = require('express');
const router = express.Router();
const { addMenu, findMenu, getAllMenu, updateMenu, deleteMenu } = require('../controller/menuController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');

router.post("/", auth.verify, middleware.isAdmin, addMenu);
router.put("/:id", auth.verify, middleware.isAdmin, updateMenu);
router.delete("/:id", auth.verify, middleware.isAdmin, deleteMenu);
router.get("/", getAllMenu);
router.get("/search/:key", findMenu);

module.exports = router;