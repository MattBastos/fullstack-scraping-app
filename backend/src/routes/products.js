const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const productsRoute = express.Router();
const mercadoLivreURL = 'https://lista.mercadolivre.com.br/';

const getHTML = async (searchURL) => {
  const { data } = await axios.get(searchURL);
  return data;
};

productsRoute.get('/', async (req, res) => {
  try {
    const { keyword } = req.query;
    const searchURL = `${mercadoLivreURL}${keyword}#D[A:${keyword}]`

    const html = await getHTML(searchURL);
    const $ = cheerio.load(html);

    const products = [];

    $('.ui-search-layout>li').each((_i, el) => {
      const productTitle = $(el).find('.ui-search-item__group--title').text();
      const productRatingAndReviews = $(el).find('.andes-visually-hidden').text().replace(/^,*/, '').trimStart().replace(/^Avaliação/, 'Avaliação');
      const productImage = $(el).find('.ui-search-result-image__element').attr('src');
  
      const product = {
        title: productTitle,
        ratingAndReviews: productRatingAndReviews,
        image: productImage
      };
  
      products.push(product);
    });

    res.json(products);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = productsRoute;