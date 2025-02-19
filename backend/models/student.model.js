const mongoose = require("mongoose");

const Student = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prn: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "student" },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    appliedForReevaluation: { type: Boolean, default: false },
});
module.exports = { Student };
