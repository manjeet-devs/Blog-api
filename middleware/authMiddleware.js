const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const useMongoDB = process.env.USE_DB_CONNECTION === 'true';

let User;

if (useMongoDB) {
  User = require('../models/User');  
}

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (useMongoDB) {
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
      } else {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        const user = users.find(user => user.id === decoded.userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
