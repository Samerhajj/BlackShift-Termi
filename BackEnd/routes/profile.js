const express = require('express');
const router = express.Router();


const {changeProfile,changePassword,updatePoints,getGamePoints} = require("../Controllers/profileController.js");
router.put('/edit',changeProfile);
router.put("/change-password", changePassword);
router.put("/updatePoints",updatePoints);
router.post("/getPoints",getGamePoints);

module.exports=router;