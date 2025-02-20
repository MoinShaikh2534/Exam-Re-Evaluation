const express = require("express");
const router = express.Router();
const upload = require("../middlewares/answersheet.middlewares");
const {
    uploadAnswerSheet,
    downloadAnswerSheet,
    calculateTotalMarks,
    updateTotalMarks,
    deleteAnswerSheet,
} = require("../controllers/answersheet.controllers");


// Route to get result by student ID
router.get("/result/:studentId", calculateTotalMarks);

// Route to update total marks after adding question-wise marks
router.put("/update-marks/:fileUniqueName", updateTotalMarks);

// Upload a new answer sheet
router.post("/upload", upload.single("pdfFile"), uploadAnswerSheet);

// Download an answer sheet by ID
router.get("/download/:fileUniqueName", downloadAnswerSheet);

// Delete an answer sheet (Optional)
router.delete("/delete/:id", deleteAnswerSheet);

module.exports = router;
