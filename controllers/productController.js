// controllers/productsController.js
const mysqlModel = require('../models/mysqlModel');

async function getProductsPage(req, res) {
    try {
        // Retrieve all products with store information
        const products = await mysqlModel.getAllProducts();
        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.productId;

        // Delete the product by ID
        await mysqlModel.deleteProduct(productId);

        // If deletion is successful, redirect to the products page or another appropriate page
        res.redirect('/products');
    } catch (error) {
        console.error(error);

        // Display the error message on the page with a link back to the home page
        res.status(400).render('error', { message: error.message, backLink: '/' });
    }
}

module.exports = {
    getProductsPage,
    deleteProduct
    // Add other exported functions here
};
