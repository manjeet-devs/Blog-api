const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const start = require("./index")
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 

start.index(app);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
