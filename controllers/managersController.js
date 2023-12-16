// controllers/managersController.js
const dao = require('../models/dao'); // Adjust the path accordingly

async function getManagersPage(req, res) {
  try {
    // Ensure that the MongoDB client is connected before proceeding
    const managersCollection = await dao.getManagersCollection();
    const managers = await managersCollection.find().toArray();
    res.render('managers', { managers });
  } catch (error) {
    console.error('Error retrieving managers:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getManagersPage,
  // Add other exported functions here
};
