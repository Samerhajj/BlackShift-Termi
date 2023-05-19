const mongoose = require("mongoose");
const TermFeedback = require("./termFeedbackSchema");

const searchSchema = new mongoose.Schema({
  categories:Array,  
  shortDefinition:Object,
  lastEdited:Number,
  conceptName:Object,
  lastEditedDisplayable:String,
  longDefinition:Object,
  suggestedBy:String,
  readMore:String,
  firestore_id:String,
  searchCount: {
    type: Number,
    default: 0
  }
});

searchSchema.index({"conceptName.english": 'text', "conceptName.hebrew": 'text', "conceptName.arabic": 'text'});

searchSchema.pre("remove", function (next) {
  const termId = this._id;
  
  // Remove associated feedback documents
  TermFeedback.deleteMany({ termId: termId }, (err) => {
    if (err) {
      console.error("Error deleting associated feedback:", err);
    }
    next();
  });
});

const SEARCH = mongoose.model("allconceptsdatabase", searchSchema);

module.exports = SEARCH;






    