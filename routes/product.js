const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProductsPage);
router.get('/products/delete/:productId', productController.deleteProduct);

module.exports = router;