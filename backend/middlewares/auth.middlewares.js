const jwt = require("jsonwebtoken");
const Faculty = require("../models/faculty.model");
const asyncHandler = require("../utils/asyncHandler");
const { createError } = require("../utils/responseHandler");
const { Role } = require("../utils/enums");
const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) throw createError(400, "User not loggedin");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw createError(400, "User not loggedin");

    if (decoded.role === Role.CHECKER || decoded.role === Role.CASHIER) {
        req.user = await Faculty.findById(decoded.id);
    } else {
        req.user = await Student.findById(decoded.id);
    }

    if (!req.user) {
        throw createError(400, "User not loggedin");
    }

    next();
});

module.exports = { verifyToken };
