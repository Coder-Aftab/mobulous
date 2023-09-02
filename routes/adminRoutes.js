import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js';
import isIdValid from '../middleware/isIdValid.js';
import checkUserExists from '../middleware/checkUserExists.js';

router.post('/login', adminController.login);

router.put("/users/:id/activate",authMiddleware,isIdValid,checkUserExists,adminController.activateUser);
router.put("/users/:id/deactivate",authMiddleware,isIdValid,checkUserExists,adminController.blockUser);
router.put("/users/:id/delete",authMiddleware,isIdValid,checkUserExists,adminController.deleteUser)
router.get('/users/all', authMiddleware, adminController.getUsersList);


router.get('/orders/new', authMiddleware, adminController.getNewOrders);
router.put("/orders/:id/accept",authMiddleware,isIdValid,adminController.acceptOrder)
router.put("/orders/:id/reject",authMiddleware,isIdValid,adminController.rejectOrder)


router.post("/hub/addWarehouse",authMiddleware,adminController.addWarehouse)

export default router;
