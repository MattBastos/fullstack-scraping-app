const displayResults = (products) => {
  const resultsContainer = document.getElementById('results');
  const productsContainer = document.getElementById('productsContainer');

  resultsContainer.style.display = 'block';

  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('section');
    productElement.className = 'product';

    const titleElement = document.createElement('h3');
    titleElement.textContent = product.title;

    const ratingAndReviewsElement = document.createElement('p');
    ratingAndReviewsElement.textContent = product.ratingAndReviews;

    const imageElement = document.createElement('img');
    imageElement.src = product.image;
    imageElement.alt = 'Imagem do produto';

    productElement.appendChild(titleElement);
    productElement.appendChild(ratingAndReviewsElement);
    productElement.appendChild(imageElement);

    productsContainer.appendChild(productElement);
  });
}

const startScraping = async () => {
  const URL = 'http://localhost:3000/api/scrape?keyword='
  const keyword = document.getElementById('keywordInput').value;

  await fetch(`${URL}${keyword}`)
    .then(response => response.json())
    .then(products => {
      displayResults(products);
    })
    .catch(error => {
      console.error('Erro ao realizar scraping:', error);
    });
}

const setupSearchButton = () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', startScraping);
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearchButton();
});