require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/article", require("./routes/articleRoutes"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
