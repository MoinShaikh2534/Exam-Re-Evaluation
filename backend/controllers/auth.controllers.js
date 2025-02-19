const Student = require("../models/student.model");
const Faculty = require("../models/faculty.model");
const asyncHandler = require("../utils/asyncHandler");
const { createError, createResponse } = require("../utils/responseHandler");
const jwt = require("jsonwebtoken");

const studentRegister = asyncHandler(async (req, res) => {
    const { prn, name, dob, email, department, year } = req.body;
    if (!prn || !name || !dob || !email || !department || !year) {
        throw createError(
            400,
            "PRN, name, DOB, email, department, year are required.",
        );
    }

    const student = await Student.findOne({ $or: [{ prn }, { email }] });
    if (student) {
        throw createError(
            400,
            "Student already exists with the same PRN or email.",
        );
    }

    const newStudent = await Student.create({
        prn,
        name,
        dob,
        email,
        department,
        year,
    });

    res.status(201).json(
        createResponse("Student registered successfully!", {
            prn: newStudent.prn,
            name: newStudent.name,
            email: newStudent.email,
            role: newStudent.role,
            department: newStudent.department,
            year: newStudent.year,
        }),
    );
});

const studentLogin = asyncHandler(async (req, res) => {
    //dob format YYYY-MM-DD
    const { prn, dob } = req.body;
    if (!prn || !dob) {
        throw createError(400, "PRN and DOB are required.");
    }

    const student = await Student.findOne({ prn });
    if (!student) {
        throw createError(404, "Student not found.");
    }

    const inputDOB = new Date(dob).toISOString().split("T")[0];
    const studentDOB = student.dob.toISOString().split("T")[0];

    if (inputDOB !== studentDOB) {
        throw createError(401, "Invalid PRN or DOB.");
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            prn: student.prn,
            role: "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }, // Token valid for 7 days
    );
    res.status(200).json(
        createResponse("Login successful!", {
            token,
            student: {
                prn: student.prn,
                name: student.name,
                email: student.email,
                role: student.role,
                department: student.department,
                year: student.year,
                appliedForReevaluation: student.appliedForReevaluation,
            },
        }),
    );
});

// Register Faculty
const registerFaculty = asyncHandler(async (req, res) => {
    const { name, email, username, password, department, role } = req.body;
    const existingUser = await Faculty.findOne({ email });

    if (existingUser) {
        throw createError(400, "Email already in use");
    }

    const newFaculty = await Faculty.create({
        name,
        email,
        username,
        password,
        department,
        role,
    });

    res.status(201).json(
        createResponse("Faculty registered successfully", {
            name: newFaculty.name,
            email: newFaculty.email,
            username: newFaculty.username,
            department: newFaculty.department,
            role: newFaculty.role,
        }),
    );
});

// Faculty Login
const loginFaculty = async (req, res) => {
    try {
        const { username, password } = req.body;
        const faculty = await Faculty.findOne({ username });

        if (!faculty)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compareHash(password, faculty.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Set token in HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true, // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production", // Set true in production
            sameSite: "Strict",
            maxAge: 3600000, // 1 hour
        });

        res.json({
            message: "Login successful",
            user: { id: faculty._id, name: faculty.name, role: faculty.role },
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Logout Faculty
const logoutFaculty = async (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logout successful" });
};

// Get Faculty Profile
const getFacultyProfile = async (req, res) => {
    res.json(req.user);
};

// Get All Faculty (Admin Only)
const getAllFaculty = async (req, res) => {
    try {
        const facultyList = await Faculty.find().select("-password");
        res.json(facultyList);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { studentRegister, studentLogin };
