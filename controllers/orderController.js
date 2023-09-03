import Order from '../models/order.js';
import Product from '../models/product.js';
import WareHouse from '../models/warehouse.js';
import { CustomError } from '../utils/utils.js';

const orderController = {
    createOrder: async (req, res) => {
        const { productIds } = req.body;
        const { userId } = req;

        // Check if products are in stock in the warehouse
        const productsNotInStock = await WareHouse.find({
            'products': {
                $elemMatch: {
                    'productId': { $in: productIds },
                    'stock': { $lte: 0 }, // Find products with quantity less than or equal to 0
                },
            },
        });

        if (productsNotInStock.length > 0) {
            const outOfStockProducts = productsNotInStock.map(warehouse => {
                return warehouse.products.filter(product => product.stock <= 0);
            }).flat()
            return res.status(400).json({ error: 'Some products are out of stock', product: outOfStockProducts });
        }

        // Create the order
        const order = new Order({ userId, products: productIds });
        await order.save();

        // Update product quantities and mark them as reserved
        await WareHouse.updateMany(
            { 'products.productId': { $in: productIds } },
            { $inc: { 'products.$.stock': -1 } }, // Decrement stock by 1
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
    getUserOrders: async (req, res) => {

        const orders = await Order.find({ userId: req.userId })

        if (!orders) {
            throw new CustomError("No orders for the defined user", 200); // Order not found
        }

        res.json({ message: "success", orders });
    }
};

export default orderController;
