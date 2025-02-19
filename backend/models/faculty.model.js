const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, enum: ["faculty", "cashier"], required: true },
});

module.exports = mongoose.model("Faculty", FacultySchema);
