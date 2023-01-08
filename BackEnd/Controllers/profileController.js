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


const changePassword = async(req, res) => {
  // get the new password from the request body
  const newPassword = req.body.newPassword;

  // get the user's email from the request body
  const email = req.body.email;

  // find the user in the database
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      // handle error
      res.status(500).send(err);
    } else {
      // update the user's password
      user.password = newPassword;
      user.save((err, updatedUser) => {
        if (err) {
          // handle error
          res.status(500).send(err);
        } else {
          // send the updated user object back to the frontend
          res.send(updatedUser);
        }
      });
    }
  });
};
module.exports = { changeProfile,changePassword };