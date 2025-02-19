const express = require("express");
const {
    studentLogin,
    studentRegister,
} = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const {
    registerFaculty,
    loginFaculty,
    getFacultyProfile,
    getAllFaculty,
    logoutFaculty,
} = require("../controllers/authcontrollers");
const router = express.Router();

router.post("/student-register", studentRegister);
router.post("/student-login", studentLogin);

router.post("/faculty/register", registerFaculty);
router.post("/faculty/login", loginFaculty);
router.post("/faculty/logout", logoutFaculty);
router.get("/faculty/profile", authMiddleware, getFacultyProfile);
router.get("/faculty/all", authMiddleware, getAllFaculty);

module.exports = router;
