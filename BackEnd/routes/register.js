const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const {Register,getReq} = require("../Controllers/registerController");
const {createUser} = require("./../validator");
router.use(express.json());

// Checking the get request
router.get("/get", getReq);
// Creating a new user
router.post("/",createUser,Register);// (Path , validator , Controller)

module.exports = router;