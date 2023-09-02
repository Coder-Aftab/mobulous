
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const userController = {
  signup: async (req, res) => {
      const { firstName, lastName, email, phoneNumber, password } = req.body;
      
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
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

      res.status(201).json({ message: 'User created successfully Please wait for verification'});
  },
  
  login: async (req, res) => {
      const { email,phoneNumber, password } = req.body;
    
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
      if(user.isActive!=="true") {
        return res.status(401).json({ message: 'Account is not active' });
      }

      const token=jwt.sign({ userId: user._id },process.env.JWT_KEY);

      res.header("Access-Control-Expose-Headers", "x-auth-token");
      res.header("x-auth-token", token);

      return res.status(200);
  },  getUsersProductsAggregation: async (req, res) => {
     const aggregatedData = await User.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'userId',
            as: 'products',
          },
        },
        {
          $project: {
            _id: 1,
            firstname: 1,
            lastname: 1,
            email: 1,
            phoneNumber: 1,
            products: 1,
          },
        },
      ]);

      res.status(200).json(aggregatedData);
    
  },

  createOrder: async (req, res) => {
      const { userId, productId } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock > 0) {
        // Create an order logic here
        // Decrease product stock and create an order record
        // ...

        res.status(201).json({ message: 'Order created successfully' });
      } else {
        res.status(400).json({ message: 'Product out of stock' });
      }
    
  },

};

export default userController;


