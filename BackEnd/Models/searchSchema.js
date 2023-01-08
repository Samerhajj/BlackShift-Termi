const mongoose = require("mongoose");

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

const SEARCH = mongoose.model("allconceptsdatabase", searchSchema);

module.exports = SEARCH;

