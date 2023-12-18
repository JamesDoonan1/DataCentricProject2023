const { MongoClient } = require('mongodb');
// Connection URL with Database Name
const url = 'mongodb://127.0.0.1:27017/proj2023MongoDB';
const dbName = 'proj2023MongoDB';
const collectionName = 'managers';

// Function to get the managers collection
async function getManagersCollection() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const managersCollection = database.collection(collectionName);
    return managersCollection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

module.exports = {
  getManagersCollection,
};