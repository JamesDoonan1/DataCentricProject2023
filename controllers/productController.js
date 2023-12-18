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

        // Check if the product is associated with stores
        const isSold = await mysqlModel.isProductSold(productId);

        if (isSold) {
            // If the product is associated with stores, show an error message
            return res.status(400).render('error', {
                message: 'Product is associated with one or more stores and cannot be deleted',
                backLink: '/products',
            });

        }
     
        // If the product is not associated with stores, proceed with deletion
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
};