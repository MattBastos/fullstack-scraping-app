const express = require('express');
const cors = require('cors');
const productRoutes = require('../src/routes/products');

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Route Configuration
// All requests to '/api/scrape' will be handled by the 'productRoutes' router
app.use('/api/scrape', productRoutes);

module.exports = app;
