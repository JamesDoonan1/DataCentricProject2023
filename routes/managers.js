const express = require('express');
const router = express.Router();

// Import your controllers
const managersController = require('../controllers/managersController');

// Managers Page (GET)
router.get('/managers', managersController.getManagersPage);

// Handle form submission to add a manager (POST)
router.post('/managers', managersController.addManager);

module.exports = router;
