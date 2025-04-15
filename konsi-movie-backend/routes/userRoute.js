const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
} = require("../routing/userCtr");

router.post("/api/register",registerUser);
router.post("/api/login",loginUser);
router.get("/api/loggedin",loginStatus);
router.get("/api/logout",logoutUser);


module.exports = router;