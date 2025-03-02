const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersFilePath = path.join(__dirname, '../data/users.json');

const useMongoDB = process.env.USE_DB_CONNECTION === 'true';

let User;

if (useMongoDB) {
  User = require('../models/User');  
}

const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];  
  }
};

const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to users file:', err);
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (useMongoDB) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } else {
      const users = readUsersFromFile();
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      writeUsersToFile(users);
      res.status(201).json({ message: 'User created successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (useMongoDB) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10s' });

      res.json({ token });
    } else {
      const users = readUsersFromFile();
      const user = users.find(user => user.email === email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '10s' });
      res.json({ token });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
