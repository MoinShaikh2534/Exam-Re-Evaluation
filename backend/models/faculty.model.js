const mongoose = require("mongoose");
const { hash } = require("../utils/hash");

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, enum: ["faculty", "cashier"], required: true },
});

// Hash password before saving
 

module.exports = mongoose.model("Faculty", FacultySchema);
