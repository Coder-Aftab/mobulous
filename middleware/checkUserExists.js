import User from '../models/user.js';

const checkUserExists = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  next();

};

export default checkUserExists;
