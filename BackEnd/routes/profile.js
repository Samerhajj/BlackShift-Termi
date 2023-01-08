const express = require('express');
const router = express.Router();


const {changeProfile} = require("../Controllers/profileController.js");
router.put('/profile',changeProfile);


module.exports=router;