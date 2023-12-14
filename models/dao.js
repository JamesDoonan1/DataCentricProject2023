const { MongoClient } = require('mongodb');
// Connection URL with Database Name
const url = 'mongodb://localhost:27017/proj2023MongoDB';

// Function to get the managers collection
async function getManagersCollection() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(); // No need to specify dbName here
    const managersCollection = database.collection('managers');
    return managersCollection;
  } finally {
    await client.close();
  }
}

// Add other MongoDB-related functions as needed

module.exports = {
  getManagersCollection,
  // Add other functions here
};
