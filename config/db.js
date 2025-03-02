const mongoose = require('mongoose');
const fs = require('fs');

const connectDB = async () => {
  if (process.env.USE_DB_CONNECTION === 'true') {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1); // Exit the process with failure
    }
  } else {
    console.log("Using JSON data instead of MongoDB");
  }
};

module.exports = connectDB;
