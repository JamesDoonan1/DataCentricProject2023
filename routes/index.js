const express = require('express');
const router = express.Router();
const homeRoutes = require('./home');
const storesRoutes = require('./store');
const productsRoutes = require('./product'); 
const storesController = require('../controllers/storesController');
const productController = require('../controllers/productController');
const managersRoutes = require('./managers'); 

router.use(homeRoutes);
router.use(storesRoutes);
router.use(productsRoutes);
router.use(managersRoutes);

router.get('/stores/add', storesController.getAddStorePage);
router.post('/stores/add', storesController.postAddStore);
router.delete('/products/:pid', productController.deleteProduct);

module.exports = router;
