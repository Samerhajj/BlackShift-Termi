const mongoose = require("mongoose");
// const shortid = require('shortid');


const NoteSchema = new mongoose.Schema({
  title:String,
  textBody:String,
});


const Note = mongoose.model("NoteDatabase", NoteSchema); //NoteDatabase collectionn
module.exports = Note;
