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
            id: student._id,
            prn: student.prn,
            role: "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }, // Token valid for 7 days
    );
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
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

    if (!name || !email || !username || !password || !department || !role) {
        throw createError(400, "All fields are required.");
    }

    const existingUser = await Faculty.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw createError(400, "Email or username already in use.");
    }

    // Hash the password before saving
    const hashedPassword = await hash(password);

    const newFaculty = await Faculty.create({
        name,
        email,
        username,
        password: hashedPassword,
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
const loginFaculty = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });

    if (!faculty) throw createError(400, "Invalid credentials");

    const isMatch = await compareHash(password, faculty.password);
    if (!isMatch) throw createError(400, "Invalid credentials");

    const token = jwt.sign(
        {
            id: faculty._id,
            email: faculty.email,
            role: faculty.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d", // Token valid for 7 days
        },
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(
        createResponse("Login successful!", {
            token,
            faculty: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email,
                role: faculty.role,
            },
        }),
    );
});

// Logout Faculty
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json(createResponse("Logout successful"));
});

module.exports = {
    studentRegister,
    studentLogin,
    registerFaculty,
    loginFaculty,
    logout,
};
