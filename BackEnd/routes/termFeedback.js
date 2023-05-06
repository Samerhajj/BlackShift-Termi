const express = require("express");
const router = express.Router();
const {addFeedback,getAllFeedbacks,deleteFeedback } = require('../Controllers/termFeedbackController');


//Create feedback by term id and user id?
router.post('/term/:termId',addFeedback);

router.get('/term',getAllFeedbacks)

// Delete feedback by feedback id
router.delete('/term/:feedbackId', deleteFeedback);

module.exports=router;