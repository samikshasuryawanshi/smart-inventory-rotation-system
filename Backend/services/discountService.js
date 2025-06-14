export const applyAutoDiscount = (product) => {
  const daysLeft = product.shelfLifeDays;

  if (daysLeft <= 3) {
    product.discounted = true;
    product.discountPercent = 50;
  } else if (daysLeft <= 7) {
    product.discounted = true;
    product.discountPercent = 20;
  } else {
    product.discounted = false;
    product.discountPercent = 0;
  }
  return product;
};
