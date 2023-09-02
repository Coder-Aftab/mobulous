import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Order from "../models/order.js";
import User from '../models/user.js';

const adminController = {
  login: async (req, res) => {
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: admin._id, isAdmin: true }, process.env.JWT_KEY);

    res.header("Access-Control-Expose-Headers", "x-auth-token");
    res.header("x-auth-token", token);
    res.json({ message: 'sucess' });

  },

  getUsersList: async (req, res) => {

    const users = await User.find();
    res.status(200).json(users);

  },
  activateUser: async (req, res) => {

    const { id } = req.params

    //Update user status to active
    const user = await User.findByIdAndUpdate(id, { isActive: true }, { new: true });


    res.status(200).json({ message: 'User activated successfully', user });
  },
  blockUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
    res.status(200).json({ message: 'User blocked successfully', user });
  },

  deleteUser: async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  },
  addWarehouse: async (req, res) => {
    const { name, location } = req.body;
    // Add warehouse logic here
    // Create a new warehouse/hub and save it in the database
    // ...

    res.status(201).json({ message: 'Warehouse added successfully' });
  },

  acceptOrder: async (req, res) => {
    const orderId = req.body.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order status to accepted
    order.status = 'accepted';
    await order.save();

    res.status(200).json({ message: 'Order accepted successfully' });
  },

  rejectOrder: async (req, res) => {
    try {
      const orderId = req.body.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Update order status to rejected
      order.status = 'rejected';
      await order.save();

      res.status(200).json({ message: 'Order rejected successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  getNewOrders: async (req, res) => {
    // Fetch new orders with status 'new' and populate products
    const newOrders = await Order.find({ status: 'new' })
      .populate('products');

    res.status(200).json(newOrders);
  },
};

export default adminController;
