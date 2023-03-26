
const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
router.use(express.json());

// imported from other local javaScript files
const {register, login, logout, tokenG, privateAccess,forgotPassword,resetPassword} = require("../Controllers/authController");
const authToken = require("../Controllers/UserFolder/Middleware/authenticateToken");


// Router Functions
router.post("/login", login);

router.post("/token", tokenG);

router.delete("/logout", logout);

router.post("/register", register);

router.post("/forgotpassword",forgotPassword);

router.get("/private", authToken, privateAccess);

router.post('/reset-password', resetPassword);

module.exports = router;