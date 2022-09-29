const express = require("express");
const contactsRouter = require("./app/routes/contact.route");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use((req, res, next) => {
    //ham error se chuyen vao neu sai duong dan
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    //hm khi may chu khong the cung cap 
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    }); 
});  

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

module.exports = app;