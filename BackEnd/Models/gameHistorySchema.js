const mongoose = require("mongoose");

const GameHistorySchema = new mongoose.Schema({
  userId: {
    type: String
  },
  games: [{
    gameName: String,
    score: Number
   
  }],
  totalGamesPlayed: {
    type: Number,
    default: 0
  }
});

const GameHistory = mongoose.model("GameHistory", GameHistorySchema);
module.exports = { GameHistory };


// const USERACTIVITY = mongoose.model("allusersactivitydatabase", activitySchema);
// // lan 
// module.exports = USERACTIVITY;