const mongoose = require("mongoose");

const Faculty = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, enum: ["faculty", "cashier"], required: true },
});

module.exports = { Faculty };
