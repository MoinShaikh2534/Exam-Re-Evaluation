const express = require("express");
const {
    studentLogin,
    studentRegister,
} = require("../controllers/auth.controllers");
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
    registerFaculty,
    loginFaculty,

    logout,
} = require("../controllers/auth.controllers");

const {
    getAllFaculty,
    getFacultyProfile,
} = require("../controllers/faculty.controllers");
const router = express.Router();

router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);

router.post("/faculty/register", registerFaculty);
router.post("/faculty/login", loginFaculty);
router.post("/faculty/logout", logout);
router.get("/faculty/profile", verifyToken, getFacultyProfile);
router.get("/faculty/all", verifyToken, getAllFaculty);

module.exports = router;
