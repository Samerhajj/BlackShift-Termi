const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const LeaderboardSchema = new mongoose.Schema({
  categoryId: Number,
  contexts: [{
    context: String,
    leaderboard:[{
      userId: {type: Schema.Types.ObjectId, ref: 'UserDatabase'},
      points: Number
    }]
  }]
});

const Leaderboard = mongoose.model("Leaderboards", LeaderboardSchema);
module.exports = Leaderboard;