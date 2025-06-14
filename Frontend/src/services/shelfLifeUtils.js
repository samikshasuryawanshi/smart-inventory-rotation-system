export const estimateShelfLifeDays = (category) => {
  const estimates = {
    dairy: 7,
    fruits: 5,
    bread: 3,
    meat: 4,
    frozen: 30,
  };
  return estimates[category] || 7;
};