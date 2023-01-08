const User = require("../Models/userSchema");


const changeProfile = async(req,res)=>{
   const updatedProfile = req.body;

  // find the user in the database using the email from the updated profile
  User.findOne({ email: updatedProfile.email }, (error, user) => {
    if (error) {
      // send a response to the client indicating that the update failed
      res.status(500).send({ message: 'Error updating profile: ' + error.message });
    } else {
      // update the user document with the new profile information
      user.fullName = updatedProfile.fullName;
      user.phone = updatedProfile.phone;
      user.field = updatedProfile.field;
      user.language = updatedProfile.language;

      // save the updated user document to the database
      user.save((error) => {
        if (error) {
          // send a response to the client indicating that the update failed
          res.status(500).send({ message: 'Error updating profile: ' + error.message });
        } else {
          // send a response to the client indicating that the update was successful
          res.status(200).send({ message: 'Profile updated successfully' });
        }
      });
    }
  });
    
}
module.exports = { changeProfile };