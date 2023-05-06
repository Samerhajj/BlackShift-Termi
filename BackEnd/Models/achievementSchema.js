
const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
    name: String,
    description: String,
    requirement: String,
    relevantGame: String,
    image: String
});


const Achievement = mongoose.model("AchievementsDatabase", AchievementSchema);
module.exports = Achievement;


// const mongoose = require("mongoose");

// const AchievementSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   achieved: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Achievement = mongoose.model("Achievement", AchievementSchema);
// module.exports = Achievement;
// achievement
		  //fiveCorrectAnswers: {
		  //  name: 'Five in a Row',
		  //  description: 'Answer five questions correctly in a row',
		  //  condition: (score, lastAnswerCorrect) => score >= 5 && lastAnswerCorrect,
		  //  achieved: false
		  //},
		  
