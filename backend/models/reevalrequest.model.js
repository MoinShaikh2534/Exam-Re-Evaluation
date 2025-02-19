const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReevalRequestSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    answerSheets: [String],
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "rechecking", "completed"],
        default: "pending",
    },
    transactionId: String,
    paymentAmount: Number,
    completionDate: Date,
    assignedFaculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
});

module.exports = mongoose.model("ReevalRequest", ReevalRequestSchema);
