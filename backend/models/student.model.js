const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    prn: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "student",
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    appliedForReevaluation: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Student", StudentSchema);
