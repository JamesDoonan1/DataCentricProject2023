// controllers/storesController.js
const mysqlModel = require('../models/mysqlModel');

async function getStoresPage(req, res) {
    try {
        const stores = await mysqlModel.getAllStores();
        res.render('stores', { stores });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

function getAddStorePage(req, res) {
    // Your implementation for rendering the add store page
    res.render('addStores');
}

//add stores
async function postAddStore(req, res) {
    try {
      const { sid, location, mgrid } = req.body;
  
      // Check if location and mgrid are defined before using them
      if (!location || !mgrid) {
        return res.status(400).send('Location and Manager ID are required');
      }
  
      const storeData = { sid, location, mgrid };
      await mysqlModel.addStore(storeData);
  
      // Redirect to the stores page after successful addition
      res.redirect('/stores');
    } catch (error) {
      console.error('Error in postAddStore:', error);
      console.error('MySQL Error:', error.sqlMessage);
      res.status(500).send('Internal Server Error');
    }
  }


// Display the edit store page
async function getEditStorePage(req, res) {
    try {
        const storeId = req.params.storeId;
        const store = await mysqlModel.getStoreById(storeId);

        if (!store) {
            return res.status(404).send('Store not found');
        }

        res.render('editStores', { store });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Update the store
async function postEditStore(req, res) {
    try {
        const storeId = req.params.storeId;
        const { location, mgrid } = req.body;

        // Check if location is defined before using it
        if (!location) {
            return res.status(400).send('Location is required');
        }

        // Update the store in the database
        await mysqlModel.updateStore(storeId, { location, mgrid });

        // Redirect to the stores page after successful update
        res.redirect('/stores');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getStoresPage,
    getAddStorePage,
    postAddStore,
    getEditStorePage,
    postEditStore


    // Add other exported functions here
};
