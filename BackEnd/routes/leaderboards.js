const express = require("express");
const router = express.Router();

const { 
    getSuggestionsLeaderboard,
    getGameLeaderboard,
    addGamePoints,
} = require("../Controllers/leaderboardsController");

router.get("/suggestions", getSuggestionsLeaderboard);

router.get("/games", getGameLeaderboard);

router.put("/games", addGamePoints);

module.exports = router;
