/**
 * Formats the product rating and reviews string.
 * @param {string} productRatingAndReviews - The original string containing product rating and reviews information.
 * @returns {string} - The formatted product rating and reviews string.
 */
const formatProductRatingAndReviews = (productRatingAndReviews) => {
  // Remove leading commas, trim leading whitespaces, replace leading 'Avaliação' with 'Avaliação', and remove trailing commas.
  return productRatingAndReviews.replace(/^,*/, '')
  .trimStart()
  .replace(/^Avaliação/, 'Avaliação')
  .replace(/,+$/, '');
}

module.exports = formatProductRatingAndReviews;
