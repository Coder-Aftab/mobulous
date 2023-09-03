import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import isIdValid from '../middleware/isIdValid.js';
import checkUserExists from '../middleware/checkUserExists.js';
import adminAuth from '../middleware/adminAuth.js';


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users-products', authMiddleware, userController.getUsersProductsAggregation);


// admin routes
router.get('/all', [authMiddleware, adminAuth], userController.getUsersList);
router.get("/search", [authMiddleware, adminAuth],userController.searchUsers)


router.put("/:id/activate", [authMiddleware, adminAuth, isIdValid, checkUserExists], userController.activateUser);
router.put("/:id/deactivate", [authMiddleware, adminAuth, isIdValid, checkUserExists], userController.blockUser);
router.delete("/:id", authMiddleware, adminAuth, isIdValid, checkUserExists, userController.deleteUser)



export default router;
