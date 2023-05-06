const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption"); //new level 2
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  language: String,
  field: String,
  email: String,
  password: String,
  gender: String,
  favorite: [],
  suggestion: [],
  points: {
    type: Number,
    default: 0,
  },
  searchCounter: {
    type: Number,
    default: 0,
  },
  suggestConceptCounter: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "default user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpiration: {
    type: Date,
    default: null,
  },
  passwordResetToken: {
    type: String,
    default: undefined,
  },
  passwordResetExpires: {
    type: String,
    default: undefined,
  },
  recentSearch: {
    type: [String], // Array of strings
    maxItems: 10, // Maximum number of items in the array
    unique: true
  },
  status: {
    type: [String]
  },
  achievements: Array
});

UserSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
  console.log(this.passwordResetToken);
  return token;
};




//New code 

// UserSchema.methods.updateRecentSearch = function(term) {
//   const MAX_SEARCH_ITEMS = 5;
//   if (!this.recentSearch.includes(term)) {
//     if (this.recentSearch.length >= MAX_SEARCH_ITEMS) {
//       // remove the oldest search term
//       this.recentSearch.shift();
//     }
//     // add the new search term to the end of the array
//     this.recentSearch.push(term);
//     // save the updated user object to the database
//     this.save();
//   }
// };

//End of the new code




const secret = process.env.SECRET;
// UserSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); //new level 2

const User = mongoose.model("UserDatabase", UserSchema); //UserDatabase collectionn
module.exports = User;
  