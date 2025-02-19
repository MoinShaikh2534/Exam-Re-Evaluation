const asyncHandler = require("../utils/asyncHandler");
const { createError, createResponse } = require("../utils/responseHandler");
const Faculty = require("../models/faculty.model");
const { Role } = require("../utils/enums");

// Get Faculty Profile
const getFacultyProfile = asyncHandler(async (req, res) => {
    const faculty = await Faculty.findById(req.user._id).select("-password");
    if (!faculty) throw createError(400, "User not found");

    res.status(200).json(
        createResponse("Faculty profile fetched successfully!", {
            faculty: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email,
                username: faculty.username,
                role: faculty.role,
            },
        }),
    );
});

const getAllFaculty = asyncHandler(async (req, res) => {
    const facultyList = await Faculty.find().select("-password");
    res.status(200).json(
        createResponse("All faculty fetched successfully!", {
            facultyList,
        }),
    );
});

module.exports = { getFacultyProfile, getAllFaculty };
