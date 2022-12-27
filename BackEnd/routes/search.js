const express = require("express");
const router = express.Router();
const {getAllConcept,getConcept,SearchParams,SearchWord,autoCompleteTerm,searchTerm,getRandomConcepts,addToFav} = require("../Controllers/searchController");
router.use(express.json());

// router.get("/", getAllConcept);

// router.post("/value",getConcept);


// router.get("/value/api/:id",SearchParams);


// router.get("/value/api/:word",SearchWord);

router.get("/",searchTerm);

router.post("/auto-complete", autoCompleteTerm);

router.get("/random", getRandomConcepts);

router.put("/send-favorite",addToFav)

// router.post("/value",getConcept)


module.exports = router;
