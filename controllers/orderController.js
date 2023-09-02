import Order from '../models/order.js';
import Product from '../models/product.js';
import { CustomError } from '../utils/utils.js';

const orderController = {
    createOrder: async (req, res) => {
        const { productIds } = req.body;
        const { userId } = req;

        const productsNotInStock = await Product.find({
            _id: { $in: productIds },
            stock: { $lte: 0 }, // Find products with quantity less than or equal to 0
        });



        if (productsNotInStock.length > 0) {
            return res.status(400).json({ error: 'Some products are out of stock' });
        }

        // Create the order
        const order = new Order({ userId, products: productIds });
        await order.save();

        // Update product quantities and mark them as reserved
        const pd = await Product.updateMany(
            { _id: { $in: productIds } },
            { $inc: { stock: -1 } },
            { new: true }
        );

        res.status(201).json({ message: 'Order created successfully', order });
    },
    getOrder: async (req, res) => {
        const { id } = req.params;
        const order = await Order.findOne({ _id: id, userId: req.userId }).populate('products');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: "success", order });
    },
    acceptOrder: async (req, res) => {
        const { id } = req.params;

        // Update the order status to 'accepted'
        const order = await Order.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });

        if (!order) {
            throw new CustomError("Order Not Found"); // Order not found
        }

        // Notify the user that their order is accepted
        // const notification = new Notification({
        //     userId: order.userId,
        //     message: 'Your order has been accepted',
        // });
        // await notification.save();

        res.json({ message: "success", order });

    },

    rejectOrder: async (req, res) => {

        const { id } = req.params;
        // Update the order status to 'rejected'
        const order = await Order.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });


        // Notify the user that their order is rejected
        // const notification = new Notification({
        //     userId: order.userId,
        //     message: 'Your order has been rejected',
        // });
        // await notification.save();

        res.json({ message: "success", order });
    },

    getNewOrders: async (req, res) => {
        // Fetch new orders with status 'new' and populate products
        const newOrders = await Order.find({ status: 'new' })
            .populate('products');
            
        res.status(200).json(newOrders);
    },
    getAllOrders: async (req, res) => {

        const orders = await Order.find()

        res.status(200).json({ message: "success", orders });
    },
};

export default orderController;
