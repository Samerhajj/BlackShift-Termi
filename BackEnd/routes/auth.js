const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
router.use(express.json());

// imported from other local javaScript files
const {Register, Login, Logout, tokenG, Private} = require("../Controllers/authController");
const authToken = require("../Controllers/UserFolder/Middleware/authenticateToken");


// Router Functions

router.post("/login",Login);

router.post("/token",tokenG);

router.delete("/logout",Logout);

router.post("/register",Register);

router.get("/private",authToken,Private);

module.exports = router;