import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users-products',authMiddleware, userController.getUsersProductsAggregation);
router.post('/create-order',authMiddleware, userController.createOrder);

export default router;
