import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId; // User ID
    req.isAdmin = decoded.isAdmin; // isAdmin flag
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
