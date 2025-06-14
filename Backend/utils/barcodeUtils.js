// You can add external libraries for real barcode generation if needed
export const validateBarcode = (barcode) => {
  return barcode && barcode.length > 5; // simple mock validation
};
