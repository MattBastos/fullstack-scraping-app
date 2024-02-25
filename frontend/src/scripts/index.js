/**
 * Display or hide the loading indicator based on the provided flag.
 * @param {boolean} isLoading - A flag indicating whether to show or hide the loading indicator.
 * @returns {void}
 */
const displayLoading = (isLoading) => {
  // Get the loading element from the DOM
  const loading = document.getElementById('loading');

  // Set the display style based on the isLoading flag
  loading.style.display = isLoading ? 'block' : 'none';
}


/**
 * Display the search results on the webpage.
 * @param {Array} products - An array of product objects containing title, ratingAndReviews, and image properties.
 * @returns {void}
 */
const displayResults = (products) => {
  // Get the results container element from the DOM
  const resultsContainer = document.getElementById('results');

  // Clear any existing content within the results container
  resultsContainer.innerHTML = '';

  // Set the display style of the results container to 'grid'
  resultsContainer.style.display = 'grid';

  // Iterate through the array of products and create a card for each valid product
  products.forEach((product) => {

    // Check if the product is valid and has a title and ratingAndReviews
    if (product.title && product.ratingAndReviews) {
      // Create a new section element for the product card
      const productCard = document.createElement('section');
      productCard.className = 'product';

      // Create an image element for the product's image
      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = 'Imagem do produto';

      // Create an h3 element for the product's title
      const productTitle = document.createElement('h3');
      productTitle.textContent = product.title;

      // Create a paragraph element for the product's rating and reviews
      const productRatingAndReviewsElement = document.createElement('p');
      productRatingAndReviewsElement.textContent = product.ratingAndReviews || 'O produto não possui avaliações.';

      // Append the created elements to the product card
      productCard.appendChild(productImage);
      productCard.appendChild(productTitle);
      productCard.appendChild(productRatingAndReviewsElement);

      // Append the product card to the results container
      resultsContainer.appendChild(productCard);
    }
  });
}

const startScraping = async () => {
  displayLoading(true);

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

  displayLoading(false);
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