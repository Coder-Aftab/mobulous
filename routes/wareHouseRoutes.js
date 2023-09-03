import express from 'express';
import wareHouseController from '../controllers/wareHouseController.js';
const router = express.Router();


router.put("/:wareHouseId/:productId",wareHouseController.update)

router.post("/",wareHouseController.create)


export default router;