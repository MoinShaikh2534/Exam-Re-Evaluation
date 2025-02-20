const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const answersheetRoutes = require("./routes/answersheet.routes");
require("dotenv").config();
const errorHandler = require("./utils/errorHandler");

const authRoutes = require("./routes/auth.routes");
const app = express();

const corsOptions = {
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    console.log("new connection");
    res.send("Welcome to Exam Re-evaluation System");
});

app.use("/auth", authRoutes);
app.use("/answersheet", answersheetRoutes);
app.use(errorHandler);

module.exports = app;
