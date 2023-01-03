const express = require("express");
const router = express.Router();
router.use(express.json());

// imported from other local javaScript files
const { favorites,
        deleteFavorite1,
        addFavorite,
        suggestTerm,
        getAllSuggestedTerms,
        deleteOneSuggest
} = require("../Controllers/userController");


// Router Functions

router.post("/favorites", favorites);

router.put("/delete-favorite", deleteFavorite1);

router.put("/add-favorite", addFavorite);

router.post("/suggest-term", suggestTerm);

router.get("/allsuggestedterms",getAllSuggestedTerms);

router.delete("/deleteonesuggest",deleteOneSuggest);



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