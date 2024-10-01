// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { getAllUser, findUser, UpdateUser, addUser, deleteUser, updateUserRole } = require('../controller/userController');
const auth = require('../middlewares/auth');
const middleware = require('../middlewares/validateRole');
// Routes

//admin
router.get("/", auth.verify, middleware.isAdmin, getAllUser);
router.get("/search/:key", auth.verify, middleware.isAdmin, findUser);
router.put("/:id", auth.verify, middleware.isAdmin, UpdateUser);
router.put("/role/:id", auth.verify, middleware.isAdmin, updateUserRole);
router.delete("/:id", auth.verify, middleware.isAdmin, deleteUser);
router.post("/add", addUser);

module.exports = router;