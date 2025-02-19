const jwt = require("jsonwebtoken");
const Faculty = require("../models/faculty.model");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken; // Extract token from cookies
    if (!token)
        return res
            .status(401)
            .json({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Faculty.findById(decoded.id).select("-password");
        if (!req.user)
            return res.status(404).json({ message: "User not found" });

        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = { authMiddleware };
