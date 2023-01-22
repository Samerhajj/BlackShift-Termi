const express = require("express");
const router = express.Router();
const {autoCompleteTerm,
searchTerm,
getRandomConcepts,
getAllTermList,
suggestTerm,
getTop10,
addNewCategories,
getCategorie
} = require("../Controllers/searchController");
router.use(express.json());

router.post("/",searchTerm);

router.post("/auto-complete", autoCompleteTerm);

router.post("/random", getRandomConcepts);

router.post("/display-myterms",getAllTermList);

router.post("/suggest-term",suggestTerm);

router.get("/get-top10",getTop10);

router.post("/addCategories",addNewCategories);

router.post("/returnAllCategories",getCategorie);

module.exports = router;
