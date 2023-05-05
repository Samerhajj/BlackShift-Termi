const express = require("express");
const router = express.Router();

const { 
    getAchievements,
    addAchievement,
    updateAchievement,
    removeAchievement
} = require("../Controllers/achievementsController");

router.get("/", getAchievements);

router.put("/", addAchievement);

// http://dir.y2022.kinneret.cc:7013/achievements/update

router.put("/update/:userId/:achievementId", updateAchievement);

router.put("/remove/:userId/:achievementId", removeAchievement);

module.exports = router;
