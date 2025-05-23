const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,  // Prevents JavaScript access (secure)
      sameSite: "Strict",  // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000,  // 1 hour expiration
    });
    
    res.json({ message: "Login successful" });
    // res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return {};
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return {};
    }
    
    return user; 
  } catch (error) {
    return {}; 
  }
};


exports.logout = async(req, res) =>{
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true in production (HTTPS)
    sameSite: "Strict",
  });

  res.json({ message: "Logged out successfully" });
};

