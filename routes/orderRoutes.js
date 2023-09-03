import express from 'express';
import authMiddleware from '../middleware/auth.js';
import isIdValid from '../middleware/isIdValid.js';
import orderController from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
const router = express.Router();



//admin can access this endpoint
router.get("/new", [authMiddleware, adminAuth], orderController.getNewOrders);
router.get("/all", [authMiddleware, adminAuth], orderController.getAllOrders);

router.put("/:id/accept", [authMiddleware, adminAuth, isIdValid], orderController.acceptOrder);
router.put("/:id/reject", [authMiddleware, adminAuth, isIdValid], orderController.rejectOrder);

// normal routes
router.get("/:id", [authMiddleware, isIdValid], orderController.getOrder);

router.get("/", [authMiddleware], orderController.getUserOrders);

router.post("/", [authMiddleware], orderController.createOrder)


export default router;