const User = require("../models/User");
const { verifyToken } = require("./auth");

exports.appObject = async (req, res) => {
  try {
    // const newArticle = new Article({ ...req.body, author: req.user.id });
    // await newArticle.save();
    const user = await verifyToken(req, res);
    
    const data = [{
        "islogin" : user ? true : false
    }]
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};