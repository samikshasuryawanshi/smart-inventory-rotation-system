export const checkForDonationEligibility = (product) => {
  return product.shelfLifeDays <= 1;
};
