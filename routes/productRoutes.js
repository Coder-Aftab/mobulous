import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import authMiddleware from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';


// admin only
router.get('/all',[authMiddleware, adminAuth],productController.getAllProducts);
router.post('/',[authMiddleware, adminAuth],productController.addProduct);

router.get("/",[authMiddleware],productController.getProductsBasedOnLocation)


export default router;
