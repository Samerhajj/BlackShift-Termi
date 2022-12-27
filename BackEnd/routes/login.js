const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const {Login} = require("./../Controllers/loginController")
router.use(express.json());

// Get Singel Member
router.post("/",Login);
// Not Implemented

router.get('/',(req,res)=>{
  res.json({
    msg : "hi from login route"
  });
})

module.exports = router;
