const express = require('express');
const router = express.Router();
const { Login } = require('../controller/authController');

// Routes
router.post("/", Login);

module.exports = router;