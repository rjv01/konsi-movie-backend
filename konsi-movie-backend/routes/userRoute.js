const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
    adminlogin
} = require("../routing/userCtr");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/loggedin",loginStatus);
router.get("/logout",logoutUser);
router.post("/adminlogin",adminlogin);


module.exports = router;