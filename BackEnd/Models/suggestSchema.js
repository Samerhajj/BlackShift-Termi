const mongoose = require("mongoose");

const suggestSchema = new mongoose.Schema({
  categories:Array,  
  shortDefinition:Object,
  lastEdited:Number,
  conceptName:Object,
  lastEditedDisplayable:String,
  longDefinition:Object,
  suggestedBy:String,
  readMore:String,
  firestore_id:String
});

suggestSchema.index({"conceptName.english": 'text', "conceptName.hebrew": 'text', "conceptName.arabic": 'text'});

const SUGGEST = mongoose.model("suggestconcepts", suggestSchema);

module.exports = SUGGEST;
