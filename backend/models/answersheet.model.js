const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswerSheetSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    fileUniqueName: {
        type: String,
        required: true,
    },
    assignedFaculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
    subject: {
        code: String,
        name: String,
    },
    pdfPath: {
        type: String,
        required: true,
    },
    questionMarks: [
        {
            questionNumber: Number,
            marksObtained: Number,
            maxMarks: Number,
        },
    ],
    totalObtained: Number,
    totalMaxMarks: Number,
    reevaluatedMarks: [
        {
            questionNumber: Number,
            marksObtained: Number,
            maxMarks: Number,
        },
    ],
    reevaluatedTotal: Number,
    reevaluated: Boolean,
});

module.exports = mongoose.model("AnswerSheet", AnswerSheetSchema);
