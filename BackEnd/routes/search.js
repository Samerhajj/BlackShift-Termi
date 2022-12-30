const express = require("express");
const router = express.Router();
const {autoCompleteTerm,
searchTerm,
getRandomConcepts,
addToFav,
getAllTermList,
suggestTerm
} = require("../Controllers/searchController");
router.use(express.json());

router.get("/",searchTerm);

router.post("/auto-complete", autoCompleteTerm);

router.get("/random", getRandomConcepts);

router.put("/send-favorite",addToFav);

router.post("/display-myterms",getAllTermList);

router.post("/suggest-term",suggestTerm);

module.exports = router;
