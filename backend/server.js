const app = require("./app");
const connectDB = require("./db/connection");
const config = require("./config/appConfig");

// Connect to MongoDB
connectDB(config.mongodbUri)
    .then(() => {
        console.log("✅ MongoDB connection successful!");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed!", error);
    });

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
