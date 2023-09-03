
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { CustomError } from '../utils/utils.js';
import mongoose from 'mongoose';

const userController = {
  signup: async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (existingUser) {
      return res.status(409).json({ message: 'email or phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully Please wait for verification' });
  },

  login: async (req, res) => {
    const { email, phoneNumber, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    if (user.isActive !== "true") {
      return res.status(401).json({ message: 'Account is not active' });
    }

    const token = jwt.sign({ userId: user._id, isActive: user.isActive }, process.env.JWT_KEY);

    res.header("Access-Control-Expose-Headers", "x-auth-token");
    res.header("x-auth-token", token);

    res.json({ message: 'success' });
  },
  getUsersProductsAggregation: async (req, res) => {


    //first conver the userId to ObjectId as the pipeline will perform the equality operation on match
    const userId = new mongoose.Types.ObjectId(req.userId);

    const pipeline = [
      {
        $match: {
          _id: userId,
        }
      },
      {
        $lookup: {
          from: 'orders', // Name of the Order collection
          localField: '_id',
          foreignField: 'userId',
          as: 'userOrders',
        },
      }, 
      {
        $lookup: {
          from: 'products', // Name of the Product collection
          localField: 'userOrders.products',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          products: 1,
        },
      },
    ];
    
    const aggregatedData = await User.aggregate(pipeline);

    res.status(200).json(aggregatedData);

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

  searchUsers: async (req, res) => {

    const query = req.query;
    const { email = "", phoneNumber = "", firstName = "" } = query;
    if (!email && !firstName && !phoneNumber) {
      throw new CustomError("Please provide at least one search parameter", 201)
    }

    const users = await User.find({
      $or: [
        {
          email: { $regex: email, $options: 'i' },
          firstName: { $regex: firstName, $options: 'i' },
          phoneNumber: { $regex: phoneNumber, $options: 'i' },
        }
      ]
    });
    if (users.length <= 0) {
      throw new CustomError("No users found", 201)
    }
    res.json({ message: "success", users })

  }
};

export default userController;


