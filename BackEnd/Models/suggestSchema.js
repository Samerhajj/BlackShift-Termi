const mongoose = require("mongoose");

const suggestSchema = new mongoose.Schema({
  categories:Array,  
  shortDefinition:Object,
  lastEdited:{
    type: Date,
    default: Date.now
  },
  conceptName:Object,
  longDefinition:Object,
  suggestedBy:String,
  readMore:String,
  termSuggestedByID: String,
});

suggestSchema.index({"conceptName.english": 'text', "conceptName.hebrew": 'text', "conceptName.arabic": 'text'});

const SUGGEST = mongoose.model("suggestconcepts", suggestSchema);

module.exports = SUGGEST;

// const suggestSchema = new mongoose.Schema({
//   categories:String,  
//   shortDefinition:Object,
//   lastEdited:{
//     type: Date,
//     default: Date.now
//   },
//   conceptName:Object,
//   lastEditedDisplayable:String,
//   longDefinition:Object,
//   suggestedBy:String,
//   readMore:String,
//   firestore_id:String
// });

