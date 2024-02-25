const displayResults = (products) => {
  const resultsContainer = document.getElementById('results');

  resultsContainer.style.display = 'grid';

  products.forEach((product) => {
    if (product.title && product.ratingAndReviews) {
      const productCard = document.createElement('section');
      productCard.className = 'product';

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = 'Imagem do produto';

      const productTitle = document.createElement('h3');
      productTitle.textContent = product.title;

      const productRatingAndReviewsElement = document.createElement('p');
      productRatingAndReviewsElement.textContent = product.ratingAndReviews || 'O produto não possui avaliações.';

      productCard.appendChild(productImage);
      productCard.appendChild(productTitle);
      productCard.appendChild(productRatingAndReviewsElement);

      resultsContainer.appendChild(productCard);
    }
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

document.getElementById('keywordInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    startScraping();
  }
});