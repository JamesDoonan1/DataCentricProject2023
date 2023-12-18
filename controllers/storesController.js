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

async function postAddStore(req, res) {
    try {
        const { sid, location, mgrid } = req.body;

        // Check if location and mgrid are defined before using them
        if (!location || !mgrid) {
            return res.status(400).send('Location and Manager ID are required');
        }

        // Check the length of the Store ID
        const maxSidLength = 5;
        if (sid.length != maxSidLength) {
            return res.status(400).set('Content-Type', 'text/html').send(`
                <p>${`Store ID must be ${maxSidLength} characters long`}</p>
                <a href="/stores/add">Go back</a>
            `);
        }

        // Check if manager ID already exists
        const isManagerIdExists = await mysqlModel.isManagerIdExists(mgrid);
        if (isManagerIdExists) {
            return res.render('error', {
                message: 'Manager ID already manages another store. Please choose a different Manager ID.',
                backLink: '/stores/add',
            });
        }
        // Check the length of the Manager ID
        const maxMgridLength = 4;
        if (mgrid.length != maxMgridLength) {
            return res.status(400).set('Content-Type', 'text/html').send(`
                <p>${`Manager ID must be ${maxMgridLength} characters long`}</p>
                <a href="/stores/add">Go back</a>
            `);
        }

        const storeData = { sid, location, mgrid };
        await mysqlModel.addStore(storeData);

        // Redirect to the stores page after successful addition
        res.redirect('/stores');
    } catch (error) {
        console.error('Error in postAddStore:', error);
        console.error('Error message:', error.message);
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
        try {
            await mysqlModel.updateStore(storeId, { location, mgrid });
            // Redirect to the stores page after successful update
            res.redirect('/stores');
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry error
                return res.render('error', {
                    message: `Manager ID '${mgrid}' already manages another store. Please choose a different Manager ID.`,
                    backLink: '/stores/edit/' + storeId,
                });
            } else {
                // Handle other errors
                console.error('Error updating store:', error);
                res.status(500).send('Internal Server Error');
            }
        }
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
};