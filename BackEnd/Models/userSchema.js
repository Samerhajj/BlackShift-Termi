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
    maxItems: 5, // Maximum number of items in the array
  },
  status: {
    type: [String]
  },
  achievements: Array,
  profileImage: {
    type: String,
    default: ""
  }
});

UserSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
  console.log(this.passwordResetToken);
  return token;
};


UserSchema.methods.hashUserId=function(){
  const userIdString=String(this._id);
  const hashedIdToken=crypto.createHash('sha256').update(userIdString).digest('hex');
  console.log("userIdString = :   "+userIdString);
  console.log("hashedToken: = " + hashedIdToken);
  return hashedIdToken;
}

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

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// this funtion is work but has a problem that if the team is already exist not pushing again
// UserSchema.methods.updateRecentSearch = function(term) {
//   const MAX_SEARCH_ITEMS = 5;
//   if (!this.recentSearch.includes(term)) {
//     if (this.recentSearch.length >= MAX_SEARCH_ITEMS) {
//       // remove the oldest search term
//       this.recentSearch.pop();
//     }
//     // add the new search term to the beginning of the array
//     this.recentSearch.unshift(term);
//     // save the updated user object to the database
//     this.save();
//   }
// };


UserSchema.methods.updateRecentSearch = function(term) {
  const MAX_SEARCH_ITEMS = 5;
  if (!this.recentSearch.includes(term)) {
    if (this.recentSearch.length >= MAX_SEARCH_ITEMS) {
      // remove the oldest search term
      this.recentSearch.pop();
    }
    // add the new search term to the beginning of the array
    this.recentSearch.unshift(term);
  } else {
    // remove the existing search term from the array
    const index = this.recentSearch.indexOf(term);
    this.recentSearch.splice(index, 1);
    // add the existing search term to the beginning of the array
    this.recentSearch.unshift(term);
  }
  this.searchCounter = this.searchCounter + 1;// new to update the search counter
  
  // save the updated user object to the database
  this.save();
};



const secret = process.env.SECRET;
// UserSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); //new level 2

const User = mongoose.model("UserDatabase", UserSchema); //UserDatabase collectionn
module.exports = User;
  