import express from 'express';
import { addProduct, getAllProducts } from '../controllers/productController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/', protect, addProduct);
router.get('/', protect, getAllProducts);

export default router;
