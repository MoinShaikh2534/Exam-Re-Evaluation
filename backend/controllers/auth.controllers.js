const Student = require("../models/student.model");
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

module.exports = { studentRegister, studentLogin };
