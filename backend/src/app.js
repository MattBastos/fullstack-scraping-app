const express = require('express');
const cors = require('cors');
const productRoutes = require('../src/routes/products');

const app = express();

app.use(cors());
app.use('/api/scrape', productRoutes);

module.exports = app;
