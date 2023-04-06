const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const LeaderboardSchema = new mongoose.Schema({
  categoryId: Number,
  games: [{
    gameName: String,
    leaderboard:[{
      userId: {type: Schema.Types.ObjectId, ref: 'UserDatabase'},
      points: Number
    }]
  }]
});

const Leaderboard = mongoose.model("Leaderboards", LeaderboardSchema);
module.exports = Leaderboard;