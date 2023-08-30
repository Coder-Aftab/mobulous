import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/login', adminController.login);

router.get('/users/all', authMiddleware, adminController.getUsersList);
router.put("/users/activate",authMiddleware,adminController.activateUser)
router.put("/users/deactivate",authMiddleware,adminController.blockUser)
router.put("/users/delete",authMiddleware,adminController.deleteUser)

router.get('/orders/new', authMiddleware, adminController.getNewOrders);
router.put("/orders/accept",authMiddleware,adminController.acceptOrder)
router.put("/orders/reject",authMiddleware,adminController.rejectOrder)
router.put("/orders/addWarehouse",authMiddleware,adminController.addWarehouse)

export default router;
