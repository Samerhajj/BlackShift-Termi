const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption"); //new level 2


// const UserSchema = new mongoose.Schema({
//   fullName:String,
//   phone:String,
//   language:String,
//   field:String,
//   email: String,
//   password: String,
// });
// replace ↓↑
const UserSchema = new mongoose.Schema({
  fullName:String,
  phone:String,
  language:String,
  field:String,
  email: String,
  password: String,
  favorite : []
});

// const secret = "Thisisourlittlesecret";
const secret = process.env.SECRET;
// UserSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); //new level 2

const User = mongoose.model("UserDatabase", UserSchema); //UserDatabase collectionn
module.exports = User;
