const axios = require('axios');
const cheerio = require('cheerio');
const formatProductRatingAndReviews = require('../utils/stringFormatter');

// Base URL for Mercado Livre to perform searches.
const mercadoLivreURL = 'https://lista.mercadolivre.com.br/';


/**
 * Fetches HTML content from a URL using axios.
 * @param {string} searchURL - The URL from which to obtain the HTML content.
 * @returns {string} - The HTML content of the page.
 */
const getHTML = async (searchURL) => {
  // Performs an HTTP request using axios and returns the HTML content.
  const { data } = await axios.get(searchURL);
  return data;
};


/**
 * Retrieves product data based on the provided keyword.
 * @param {Object} req - Express request object containing query parameters.
 * @param {Object} res - Express response object to send data back to the client.
 * @returns {Object} - JSON response containing an array of products with title, rating and reviews, and image.
 * @throws {Error} - Throws an error if there is an issue with the scraping process or internal server error.
 */

const getProducts = async (req, res) => {
  try {
    // Extracting the keyword from the query parameters
    const { keyword } = req.query;

    // Constructing the search URL for Mercado Livre based on the provided keyword
    const searchURL = `${mercadoLivreURL}${keyword}#D[A:${keyword}]`

    // Fetching HTML content from the Mercado Livre search page
    const html = await getHTML(searchURL);
    const $ = cheerio.load(html);

    // Array to store the extracted product data
    const products = [];

    // Iterating through each product element in the first page search results
    $('.ui-search-layout>li').each((_i, el) => {
      // Extracting product details such as title, rating and reviews, and image URL
      const productTitle = $(el).find('.ui-search-item__title').text();
      const productRatingAndReviews = $(el).find('.andes-visually-hidden').text();
      const productImage = $(el).find('.ui-search-result-image__element').attr('data-src');

      // Creating a product object with extracted data
      const product = {
        title: productTitle,
        ratingAndReviews: formatProductRatingAndReviews(productRatingAndReviews),
        image: productImage
      };

      // Adding the product object to the products array
      products.push(product);
    });

    // Sending the array of products as a JSON response
    res.json(products);
  } catch (error) {
    // Handling errors and sending an internal server error response
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

module.exports = getProducts;
