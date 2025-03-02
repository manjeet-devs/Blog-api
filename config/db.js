const mongoose = require('mongoose');
const fs = require('fs');

const connectDB = async () => {
  if (process.env.USE_DB_CONNECTION === 'true') {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME || 'defaultDB',
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    }
  } else {
    console.log("Using JSON data instead of MongoDB");
  }
};

module.exports = connectDB;