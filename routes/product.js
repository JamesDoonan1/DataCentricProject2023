// routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProductsPage);
router.post('/products/delete/:productId', productController.deleteProduct);

module.exports = router;
