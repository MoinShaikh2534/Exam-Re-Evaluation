const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddlewares");
const {
    registerFaculty,
    loginFaculty,
    getFacultyProfile,
    getAllFaculty,
    logoutFaculty,
} = require("../controllers/authcontrollers");

router.post("/faculty/register", registerFaculty);
router.post("/faculty/login", loginFaculty);
router.post("/faculty/logout", logoutFaculty);
router.get("/faculty/profile", authMiddleware, getFacultyProfile);
router.get("/faculty/all", authMiddleware, getAllFaculty);
module.exports = router;
