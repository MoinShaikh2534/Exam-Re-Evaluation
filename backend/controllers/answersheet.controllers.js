const AnswerSheet = require("../models/answerSheet.model");
const asyncHandler = require("../utils/asyncHandler");
const { createError, createResponse } = require("../utils/responseHandler");
const fs = require("fs");
const path = require("path");

// Upload Answer Sheet (PDF)
const uploadAnswerSheet = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        throw createError(400, "No file uploaded.");
    }

    const { student, subjectCode, subjectName } = req.body;
    if (!student || !subjectCode || !subjectName) {
        throw createError(
            400,
            "Student ID, Subject Code, and Subject Name are required.",
        );
    }

    // Generate random marks for 10 questions
    const questionMarks = [];
    const reevaluatedMarks = [];
    let totalObtained = 0;
    const totalMaxMarks = 50; // 10 questions × 5 marks each

    for (let i = 1; i <= 10; i++) {
        const maxMarks = 5;
        const marksObtained = Math.floor(Math.random() * (maxMarks + 1)); // Random marks between 0 and 5
        totalObtained += marksObtained;

        questionMarks.push({
            questionNumber: i,
            marksObtained: marksObtained,
            maxMarks: maxMarks,
        });

        // Initialize reevaluatedMarks array with same structure but 0 marks
        reevaluatedMarks.push({
            questionNumber: i,
            marksObtained: 0,
            maxMarks: maxMarks,
        });
    }

    // Save to database
    const newAnswerSheet = new AnswerSheet({
        student,
        fileUniqueName: req.file.filename,
        pdfPath: req.file.path,
        subject: { code: subjectCode, name: subjectName },
        questionMarks: questionMarks,
        totalObtained: totalObtained,
        totalMaxMarks: totalMaxMarks,
        reevaluatedMarks: reevaluatedMarks,
        reevaluatedTotal: 0,
        reevaluated: false,
    });

    await newAnswerSheet.save();

    return res
        .status(201)
        .json(createResponse("File uploaded successfully", newAnswerSheet));
});

// Download Answer Sheet (PDF)
const downloadAnswerSheet = asyncHandler(async (req, res, next) => {
    const { fileUniqueName } = req.params;
    const answerSheet = await AnswerSheet.findOne({ fileUniqueName });

    if (!answerSheet) {
        throw createError(404, "Answer sheet not found.");
    }

    // Check if file exists in the filesystem
    if (!fs.existsSync(answerSheet.pdfPath)) {
        throw createError(404, "File not found on server.");
    }

    res.download(answerSheet.pdfPath, answerSheet.fileUniqueName);
});


const calculateTotalMarks = async (req, res, next) => {
    try {
        const { studentId } = req.params;

        const answerSheets = await AnswerSheet.find({ student: studentId });

        if (!answerSheets || answerSheets.length === 0) {
            throw createError(404, "No answer sheets found for the student.");
        }

        let totalObtained = 0, totalMaxMarks = 0;
        let reevaluatedTotal = 0, reevaluatedMaxMarks = 0;
        let subjectWiseMarks = [];

        answerSheets.forEach(sheet => {
            let subjectObtained = sheet.totalObtained || 0;
            let subjectMaxMarks = sheet.totalMaxMarks || 0;
            let subjectReevalObtained = sheet.reevaluatedTotal || subjectObtained;
            let subjectReevalMaxMarks = sheet.totalMaxMarks;

            // Accumulate total marks
            totalObtained += subjectObtained;
            totalMaxMarks += subjectMaxMarks;
            reevaluatedTotal += subjectReevalObtained;
            reevaluatedMaxMarks += subjectReevalMaxMarks;

            subjectWiseMarks.push({
                subjectCode: sheet.subject.code,
                subjectName: sheet.subject.name,
                obtainedMarks: subjectObtained,
                maxMarks: subjectMaxMarks,
                reevaluatedMarks: subjectReevalObtained,
                reevaluated: sheet.reevaluated,
            });
        });

        // Determine pass/fail status (assuming 40% passing criteria)
        const passPercentage = 40;
        const isPassed = (reevaluatedTotal / totalMaxMarks) * 100 >= passPercentage;

        return res.status(200).json(
            createResponse("Student result calculated successfully", {
                studentId,
                totalObtained,
                totalMaxMarks,
                reevaluatedTotal,
                reevaluatedMaxMarks,
                passStatus: isPassed ? "Passed" : "Failed",
                subjectWiseMarks,
            })
        );
    } catch (error) {
        next(error);
    }
};

// Middleware to update total marks in the database
const updateTotalMarks = async (req, res, next) => {
    try {
        const { fileUniqueName } = req.params;
        const answerSheet = await AnswerSheet.findOne({ fileUniqueName });

        if (!answerSheet) {
            throw createError(404, "Answer sheet not found.");
        }

        // Calculate total obtained and max marks
        let totalObtained = 0, totalMaxMarks = 0;
        answerSheet.questionMarks.forEach(q => {
            totalObtained += q.marksObtained;
            totalMaxMarks += q.maxMarks;
        });

        // Save to database
        answerSheet.totalObtained = totalObtained;
        answerSheet.totalMaxMarks = totalMaxMarks;
        await answerSheet.save();

        return res.status(200).json(
            createResponse("Total marks updated successfully", {
                fileUniqueName,
                totalObtained,
                totalMaxMarks,
            })
        );
    } catch (error) {
        next(error);
    }
};
 


// Delete Answer Sheet (Optional)
const deleteAnswerSheet = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const answerSheet = await AnswerSheet.findById(id);

    if (!answerSheet) {
        throw createError(404, "Answer sheet not found.");
    }

    // Delete file from server only if it exists
    if (fs.existsSync(answerSheet.pdfPath)) {
        fs.unlinkSync(answerSheet.pdfPath);
    }

    await AnswerSheet.findByIdAndDelete(id);

    return res.status(200).json(createResponse("File deleted successfully"));
});

module.exports = { uploadAnswerSheet, downloadAnswerSheet, deleteAnswerSheet,calculateTotalMarks,updateTotalMarks };
