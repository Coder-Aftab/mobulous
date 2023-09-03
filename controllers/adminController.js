import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
};

export default adminController;
