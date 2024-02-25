const axios = require('axios');
const cheerio = require('cheerio');
const formatProductRatingAndReviews = require('../utils/stringFormatter');

const mercadoLivreURL = 'https://lista.mercadolivre.com.br/';

const getHTML = async (searchURL) => {
  const { data } = await axios.get(searchURL);
  return data;
};

const getProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const searchURL = `${mercadoLivreURL}${keyword}#D[A:${keyword}]`

    const html = await getHTML(searchURL);
    const $ = cheerio.load(html);

    const products = [];

    $('.ui-search-layout>li').each((_i, el) => {
      const productTitle = $(el).find('.ui-search-item__title').text();
      const productRatingAndReviews = $(el).find('.andes-visually-hidden').text();
      const productImage = $(el).find('.ui-search-result-image__element').attr('data-src');

      const product = {
        title: productTitle,
        ratingAndReviews: formatProductRatingAndReviews(productRatingAndReviews),
        image: productImage
      };

      products.push(product);
    });

    res.json(products);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

module.exports = getProducts;
