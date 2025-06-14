import Product from '../models/Product.js';
import { predictShelfLife } from '../services/shelfLifeService.js';
import { applyAutoDiscount } from '../services/discountService.js';
import { generateQRCode } from '../utils/qrCodeUtils.js';

export const addProduct = async (req, res) => {
  const { name, quantity, expiryDate, barcode } = req.body;

  let product = new Product({ name, quantity, expiryDate, barcode });
  product.shelfLifeDays = predictShelfLife(expiryDate);
  product = applyAutoDiscount(product);
  product.qrCode = await generateQRCode(product._id.toString());
  await product.save();

  res.status(201).json(product);
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
