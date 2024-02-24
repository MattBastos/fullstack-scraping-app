const express = require('express');

const getProducts = require('../controllers/productController');

const productsRoute = express.Router();

productsRoute.get('/', await getProducts(req, res));

module.exports = productsRoute;
