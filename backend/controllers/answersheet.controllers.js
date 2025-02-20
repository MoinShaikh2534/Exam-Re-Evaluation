const AnswerSheet = require("../models/answerSheet.model");
const { createError, createResponse } = require("../utils/responseHandler");
const fs = require("fs");
const path = require("path");

// Upload Answer Sheet (PDF)
const uploadAnswerSheet = async (req, res, next) => {
    try {
        if (!req.file) {
            throw createError(400, "No file uploaded.");
        }

        const { student, subjectCode, subjectName } = req.body;
        if (!student || !subjectCode || !subjectName) {
            // Delete uploaded file if request is invalid
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete uploaded file:", err);
            });
            throw createError(
                400,
                "Student ID, Subject Code, and Subject Name are required.",
            );
        }

        // Save to database
        const newAnswerSheet = new AnswerSheet({
            student,
            fileUniqueName: req.file.filename,
            pdfPath: req.file.path,
            subject: { code: subjectCode, name: subjectName },
            reevaluated: false,
        });

        await newAnswerSheet.save();

        return res
            .status(201)
            .json(createResponse("File uploaded successfully", newAnswerSheet));
    } catch (error) {
        if (req.file) {
            // Delete uploaded file if any error occurs
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete uploaded file:", err);
            });
        }
        next(error);
    }
};

// Download Answer Sheet (PDF)
const downloadAnswerSheet = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

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
const deleteAnswerSheet = async (req, res, next) => {
    try {
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

        return res
            .status(200)
            .json(createResponse("File deleted successfully"));
    } catch (error) {
        next(error);
    }
};

module.exports = { uploadAnswerSheet, downloadAnswerSheet, deleteAnswerSheet,calculateTotalMarks,updateTotalMarks };
