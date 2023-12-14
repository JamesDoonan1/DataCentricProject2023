// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { MongoClient } = require('mongodb'); // Destructuring MongoClient from mongodb

// Add body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db; // Declare db variable

// MongoDB connection setup
MongoClient.connect('mongodb://127.0.0.1:27017/proj2023MongoDB')
  .then((client) => {
    db = client.db('proj2023MongoDB'); // Assign the database to the db variable
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set up routes
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
