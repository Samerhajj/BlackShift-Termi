const express = require('express');
const router = express.Router();


const {changeProfile,changePassword,updatePoints,getGamePoints} = require("../Controllers/profileController.js");
router.put('/edit',changeProfile);
router.put("/change-password", changePassword);
router.put("/updatePoints",updatePoints);
router.get("/getPoints",getGamePoints);
//router.get("/getData",getUserData);
module.exports=router;