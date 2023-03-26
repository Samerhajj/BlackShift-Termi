const express = require("express");
const router = express.Router();
const {updateGameHistory,getGameHistory} = require("../Controllers/gameHistoryController");

router.post("/updateGameHistory", updateGameHistory);
router.get("/getGameHistory",getGameHistory)


module.exports = router;



// const express = require("express");
// const router = express.Router();
// const GameHistory = require("../models/GameHistory");

// router.get("/getGameHistory", async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const gameHistory = await GameHistory.findOne({ userId });
//     if (!gameHistory) {
//       return res.status(404).json({ message: "Game history not found" });
//     }
//     res.status(200).json(gameHistory);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error retrieving game history" });
//   }
// });

// module.exports = router;
