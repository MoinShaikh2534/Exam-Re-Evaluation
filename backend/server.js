const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const errorHandler = require("./utils/errorHandler");
const config = require("./config/appConfig");
const connectDB = require("./db/connection");
const path = require("path");

const app = express();
const corsOptions = {
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
};

connectDB(config.mongodbUri)
    .then(() => {
        console.log("MongoDB connection successfull!");
    })
    .catch((error) => {
        console.log("server service :: connectDB :: error : ", error);
        console.log("MongoDB connection failed!!!!!");
    });

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    console.log("new connection");
    res.send("welcome to exam re-evaluation system");
});

app.use(errorHandler);
const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
