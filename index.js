import dotenv from "dotenv"
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import 'express-async-errors'; // Import express-async-errors for handling errors
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wareHouseRouter from "./routes/wareHouseRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import DBConnection from './db/index.js';
// Set up Express app

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Connect to db
DBConnection();

// Set up Express app to handle data parsing
app.use(cors())
app.use(express.json());
app.use(morgan("tiny"))

app.use("/api/users", userRouter);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/warehouse", wareHouseRouter)
app.use("/api/notifications", notificationRouter)

app.use("/*", (_, res) => res.status(404).send("404 Not Found"))

app.use(globalErrorHandler);


const PORT = process.env.PORT || 8080;


app.use("/", (req, res) => {
    res.send("Hello World")
})

export const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
