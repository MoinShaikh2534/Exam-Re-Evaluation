const Faculty = require("../models/faculty.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { compareHash } = require("../utils/hash");

// Register Faculty
exports.registerFaculty = async (req, res) => {
    try {
        const { name, email, username, password, department, role } = req.body;
        const existingUser = await Faculty.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const newFaculty = new Faculty({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            username,
            password,
            department,
            role,
        });

        await newFaculty.save();
        res.status(201).json({ message: "Faculty registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Faculty Login
exports.loginFaculty = async (req, res) => {
    try {
        const { username, password } = req.body;
        const faculty = await Faculty.findOne({ username });

        if (!faculty) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compareHash(password, faculty.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true,  // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production",  // Set true in production
            sameSite: "Strict",
            maxAge: 3600000 // 1 hour
        });

        res.json({ message: "Login successful", user: { id: faculty._id, name: faculty.name, role: faculty.role } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Logout Faculty
exports.logoutFaculty = async (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logout successful" });
};

// Get Faculty Profile
exports.getFacultyProfile = async (req, res) => {
    res.json(req.user);
};

// Get All Faculty (Admin Only)
exports.getAllFaculty = async (req, res) => {
    try {
        const facultyList = await Faculty.find().select("-password");
        res.json(facultyList);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
