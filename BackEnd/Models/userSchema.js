const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption"); //new level 2
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  fullName:String,
  phone:String,
  language:String,
  field:String,
  email: String,
  password: String,
  gender:String,
  favorite : [],
  suggestion : [],
  points: {
    type: Number,
    default: 0
  },
  searchCounter: {
    type: Number,
    default: 0
  },
  suggestConceptCounter: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: "default user"
  }
});

UserSchema.methods.generatePasswordResetToken = function(user) {
  console.log(user);
  const token = crypto.randomBytes(20).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
  console.log(user.passwordResetToken);
  return token;
};

// const secret = "Thisisourlittlesecret";
const secret = process.env.SECRET;
// UserSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); //new level 2

const User = mongoose.model("UserDatabase", UserSchema); //UserDatabase collectionn
module.exports = User;
