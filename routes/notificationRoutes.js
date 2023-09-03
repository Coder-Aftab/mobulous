import express from "express";
import authMiddleware from "../middleware/auth.js";
import Notification from "../models/notification.js";

const router = express.Router();


router.get("/", async (req, res) => {
    const notification = await Notification.find({ $or: [{ userId: req.userId }, { isAdmin: req.isAdmin }] })
    res.json({ message: "success", notification })
})


export default router;