// routes/storesRoutes.js
const express = require('express');
const router = express.Router();
const storesController = require('../controllers/storesController');

router.get('/stores', storesController.getStoresPage);

// Display the edit store page
router.get('/stores/edit/:storeId', storesController.getEditStorePage);

// Update the store
router.post('/stores/edit/:storeId', storesController.postEditStore);

module.exports = router;
