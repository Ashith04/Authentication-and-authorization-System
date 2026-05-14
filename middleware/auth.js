const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ').pop();
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access required' });
};

const isOwnerOrAdmin = (req, res, next) => {
  const { id } = req.params;
  if (req.user.role === 'admin' || req.user.id === id) return next();
  return res.status(403).json({ message: 'Not authorized' });
};

module.exports = { auth, isAdmin, isOwnerOrAdmin };
