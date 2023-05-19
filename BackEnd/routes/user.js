const express = require("express");
const router = express.Router();

router.use(express.json());

// imported from other local javaScript files
const { favorites,
        deleteFavorite,
        addFavorite,
        suggestTerm,
        getAllSuggestedTerms,
        deleteOneSuggest,
        addSelectedTerm,
        handleLanguageChange,
        deleteLog,
        getAllLogs,
        handleLanguageChange2,
        getAllLogsSearchGames,
        deleteLog2,
        incrementSearchCount,
        getUserData,
        gameSearchActivity,
        clearGameSearchActivity,
        findUserByEmail,
        suggestion,
        deleteTerm,
        deleteAllUsers,uploadImage
} = require("../Controllers/userController");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload',upload.single('file'), uploadImage);



router.delete("/delete-all-users",deleteAllUsers);


// Router Functions

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: User related operations
 * paths:
 *  /user/favorites:
 *    post:
 *      tags: [user]
 *      summary: Finds the favorite terms of a user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: email of the user
 *                  required: true
 *      responses:
 *        200:
 *          description: A list of the user's favorite terms.
 */
router.post("/favorites", favorites);
router.post("/suggestions",suggestion); // new


router.put("/delete-favorite", deleteFavorite);

router.put("/add-favorite", addFavorite);

/**
 * @swagger
 *  tags:
 *   - name: user
 *     description: User related operations
 * 
 * /user/suggest-term:
 *    post:
 *      tags: [user]
 *      summary: Suggests a new term
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                selectedCategory:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: Categories of the term
 *                  required: true
 *                shortDefinition:
 *                  type: object
 *                  properties:
 *                    hebrew:
 *                      type: string
 *                      description: Hebrew short definition of the term
 *                      required: true
 *                    english:
 *                      type: string
 *                      description: English short definition of the term
 *                      required: true
 *                    arabic:
 *                      type: string
 *                      description: Arabic short definition of the term
 *                      required: true
 *                lastEdited:
 *                  type: number
 *                  format: timestamp
 *                  description: Last edited date of the term
 *                  required: true
 *                conceptName:
 *                  type: object
 *                  properties:
 *                    hebrew:
 *                      type: string
 *                      description: Hebrew short definition of the term
 *                      required: true
 *                    english:
 *                      type: string
 *                      description: English short definition of the term
 *                      required: true
 *                    arabic:
 *                      type: string
 *                      description: Arabic short definition of the term
 *                      required: true
 *                suggestedBy:
 *                  type: string
 *                  description: Email of the user who suggested the term
 *                  required: true
 *      responses:
 *        200:
 *          description: The newly suggested term
 */

router.post("/suggest-term", suggestTerm);

router.get("/allsuggestedterms",getAllSuggestedTerms);

router.delete("/deleteonesuggest",deleteOneSuggest);

router.put("/approve-term",addSelectedTerm);

router.post("/active-lag",handleLanguageChange);

router.delete("/delete-log",deleteLog); // GetDataSwitchLanguageActivityLogs

router.get("/get-all-logs",getAllLogs);


//handleLanguageChange2
router.post("/active-game-search",handleLanguageChange2)
router.delete("/delete-game-search",deleteLog2) // GetUserSearchGameLogs
router.get("/get-all-search-game-logs",getAllLogsSearchGames)



router.post("/inc-search-counter",incrementSearchCount);


router.get("/getUserData",getUserData)


router.post("/gameSearchActivity",gameSearchActivity);
router.delete("/clearGameSearchActivity",clearGameSearchActivity);


/**
 * @swagger
 * tags:
 *   - name: search
 *     description: Search related operations
 * paths:
 *  /user/deleteTerm:
 *    delete:
 *      tags: [search]
 *      summary: Delete a term from search
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                TermID:
 *                  type: string
 *                  description: ID of the term to be deleted
 *                  required: true
 *      responses:
 *        200:
 *          description: Term deleted successfully
 *        400:
 *          description: Bad request
 *        404:
 *          description: Term not found
 */
router.delete("/deleteterm",deleteTerm);// deleteTerm : admin delete incorrect term # API SWAGGER

//
router.get("/findUserByEmail",findUserByEmail);


module.exports = router;


// --> Delete all the logs 
//http://dir.y2022.kinneret.cc:7013/user/delete-log 


















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