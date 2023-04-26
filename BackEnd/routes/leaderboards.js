const express = require("express");
const router = express.Router();

const { 
    getLeaderboard,
    getAvailableContexts
} = require("../Controllers/leaderboardsController");

router.get("/", getLeaderboard);

router.get("/contexts", getAvailableContexts);

module.exports = router;
