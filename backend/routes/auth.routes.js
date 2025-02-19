const express = require("express");
const {
    studentLogin,
    studentRegister,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/student-register", studentRegister);
//student login
router.post("/student-login", studentLogin);

//make POST /faculty-login

module.exports = router;
