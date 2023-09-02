import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/login', adminController.login);



router.post("/hub/addWarehouse", authMiddleware, adminController.addWarehouse)

export default router;
