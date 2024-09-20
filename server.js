const express = require('express');
const db = require('./config/connection'); // Import the MongoDB connection
const routes = require('./routes'); // Import the routes

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the API routes from the routes folder
app.use('/api', routes);

// Start the server once the database connection is open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
