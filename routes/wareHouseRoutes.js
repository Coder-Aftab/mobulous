import express from 'express';
import wareHouseController from '../controllers/wareHouseController.js';
const router = express.Router();


router.post("/:wareHouseId/:productId",wareHouseController.update)

router.post("/",wareHouseController.create)


export default router;