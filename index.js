function index(app){
    app.use("/api/auth", require("./routes/authRoutes"));
    app.use("/api/article", require("./routes/articleRoutes")); 
    app.use("/api", require("./routes/appRoutes")); 
}

module.exports = { index };