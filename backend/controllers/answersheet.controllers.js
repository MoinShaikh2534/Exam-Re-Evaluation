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
        const { id } = req.params;
        const answerSheet = await AnswerSheet.findById(id);

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

module.exports = { uploadAnswerSheet, downloadAnswerSheet, deleteAnswerSheet };
