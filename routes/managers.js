// routes/managers.js
const express = require('express');
const router = express.Router();
const managersController = require('../controllers/managersController');

router.get('/managers', managersController.getManagersPage);

module.exports = router;
