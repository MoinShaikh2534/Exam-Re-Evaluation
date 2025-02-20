const express = require("express");
const router = express.Router();
const upload = require("../middlewares/answersheet.middlewares");
const { uploadAnswerSheet, downloadAnswerSheet, deleteAnswerSheet } = require("../controllers/answersheet.controllers");

// Upload a new answer sheet
router.post("/upload", upload.single("pdfFile"), uploadAnswerSheet);

// Download an answer sheet by ID
router.get("/download/:id", downloadAnswerSheet);

// Delete an answer sheet (Optional)
router.delete("/delete/:id", deleteAnswerSheet);

module.exports = router;
 