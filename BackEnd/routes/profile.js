const express = require('express');
const router = express.Router();


const {changeProfile,changePassword} = require("../Controllers/profileController.js");
router.put('/edit',changeProfile);
router.put("/change-password", changePassword);

module.exports=router;