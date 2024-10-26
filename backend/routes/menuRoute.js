const express = require('express');
const router = express.Router();
const { getFoodImage, addMenu, findMenu, getAllMenu, updateMenu, deleteMenu } = require('../controller/menuController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');

router.post("/add", auth.verify, middleware.isAdmin, addMenu);
router.put("/update/:id", auth.verify, middleware.isAdmin, updateMenu);
router.delete("/delete/:id", auth.verify, middleware.isAdmin, deleteMenu);
router.get("/image/:filename", getFoodImage);
router.get("/", auth.verify, getAllMenu);
router.get("/search/:key", auth.verify, findMenu);

module.exports = router;