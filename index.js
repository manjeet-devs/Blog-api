function index(app){
    app.use("/api/auth", require("./routes/authRoutes"));
    app.use("/api/article", require("./routes/articleRoutes")); 
}

module.exports = { index };