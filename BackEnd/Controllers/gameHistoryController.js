const { GameHistory } = require("../Models/gameHistorySchema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

// var ObjectID = require('mongodb').ObjectID;

const updateGameHistory = async (req, res, next) => {
    const {userId, gameName, score} = req.body;
    try {
        // Find the user's game history
        const gameHistory = await GameHistory.findOne({ userId });
        if (!gameHistory) {
            // If the user has no game history, create a new one
            const newGameHistory = new GameHistory({
                userId,
                games: [{ gameName, score }],
                totalGamesPlayed: 1
            });
            await newGameHistory.save();
        } else {
            // If the user has a game history, update it
            // push a new game object to the games array
            gameHistory.games.push({ gameName, score });
            gameHistory.totalGamesPlayed++;
            await gameHistory.save();
        }
        res.status(200).json({ message: 'Game history updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating game history' });
    }
};

const getGameHistory=async(req,res)=>
{
     const token = req.headers["x-auth-token"];
  //console.log(token)
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
   // const { userId } = req.query;
   console.log(decoded.id);
    const gameHistory = await GameHistory.findOne({userId:decoded.id});
    if (!gameHistory) {
      return res.status(404).json({ message: "Game history not found" });
    }
    res.status(200).json(gameHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving game history" });
  }
};

module.exports={updateGameHistory,getGameHistory};
