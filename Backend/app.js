const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Smart Inventory Rotation System API');
});

// Add more routes here


// Start the server
app.listen(3000)