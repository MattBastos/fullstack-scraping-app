const formatProductRatingAndReviews = (productRatingAndReviews) => {
  return productRatingAndReviews.replace(/^,*/, '')
  .trimStart()
  .replace(/^Avaliação/, 'Avaliação')
  .replace(/,+$/, '');
}

module.exports = formatProductRatingAndReviews;
