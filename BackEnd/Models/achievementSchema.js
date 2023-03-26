
// const mongoose = require("mongoose");

// const AchievementSchema = new mongoose.Schema({
//     name :  Object,
//     description : Object,
//     achieved : {
//     type: Boolean,
//     default: false
//     },
//     relevantGame : String
// });


// const Achievement = mongoose.model(" AchievementrDatabase", AchievementSchema); //BackDefinitionSchema collectionn
// module.exports = Achievement;


const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  achieved: {
    type: Boolean,
    default: false,
  },
});

const Achievement = mongoose.model("Achievement", AchievementSchema);
module.exports = Achievement;
// achievement
		  //fiveCorrectAnswers: {
		  //  name: 'Five in a Row',
		  //  description: 'Answer five questions correctly in a row',
		  //  condition: (score, lastAnswerCorrect) => score >= 5 && lastAnswerCorrect,
		  //  achieved: false
		  //},
		  
