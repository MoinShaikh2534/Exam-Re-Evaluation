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
FacultySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await hash(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Faculty", FacultySchema);
