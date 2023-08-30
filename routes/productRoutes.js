import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/add-product',authMiddleware, productController.addProduct);


export default router;
