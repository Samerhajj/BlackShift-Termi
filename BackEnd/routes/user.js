const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const { body } = require("express-validator");
router.use(express.json());

// imported from other local javaScript files
const {Register,Login,Logout,tokenG,Private} = require("../Controllers/userController");
const authToken = require("../Controllers/UserFolder/Middleware/authenticateToken");
const {createUser} = require("./../validator");


// Router Functions

router.post("/login",Login);

router.post("/token",tokenG);

router.delete("/logout",Logout);

router.post("/register",Register);

router.get("/private",authToken,Private);


module.exports = router;





















//  const {Register,Login,Authorize} = require("../Controllers/userController");







// router.post("/register",Register);s

// https://stackoverflow.com/questions/40376557/how-to-check-is-user-already-exist-with-customvalidators-in-express-validator


    
// router.post("/protected",Authorize);



// router.post("/",createUser,Register);// (Path , validator , Controller)

//////////////////////////////////////////////////////↓↓↓↓↓↓↓↓↓
//////////////////////////////////////////////////////↓↓↓↓↓↓↓↓↓
// [
    
//         body("email")
//         .isEmail()
//         .withMessage("please enter a valid email")
//         .custom (async (email)=>{
          
//           const user=await User.findOne(email);
//             if(user[0].length>0){
//                 return Promise.reject("Email Already exist");
//             }
//         })
//         .normalizeEmail(),
//         body("password").trim().isLength({min:6}),
//         ],