const express = require("express");
const router = express.Router();
const chatgptController = require("../Controllers/chatgptController");

router.post("/generate-definitions", chatgptController.generateDefinitions);

module.exports = router;
