const dao = require('../models/dao');

async function getManagersPage(req, res) {
  try {
    const managersCollection = await dao.getManagersCollection();
    const managers = await managersCollection.find().toArray();
    res.render('managers', { managers });

  } catch (error) {
    console.error('Error retrieving managers: ', error.message);
    res.status(500).send('Internal Server Error');

  }
}

// Function to add a manager
async function addManager(req, res) {
  try {
    const managersCollection = await dao.getManagersCollection();
    const { _id, name, salary } = req.body;

    // Insert the new manager into the collection
    await managersCollection.insertOne({ _id, name, salary });

    // Redirect back to the same page after adding a manager
    res.redirect('/managers');

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      console.error('Duplicate key error: Manager ID already exists.');
      res.status(400).send('Manager ID is already in use. Choose a different one. <a href="/managers">Back to Managers Page</a>'); } else {
      // Other errors
      console.error('Error adding manager: ', error.message);
      
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = {
  getManagersPage,
  addManager,
};
