const TermFeedback = require("../Models/termFeedbackSchema");
const mongoose = require("mongoose");

const addFeedback=async(req,res)=>{
    try{
        const {userId,overallRating,shortDefinitionRating,longDefinitionRating,feedbackText }=req.body;
        const termId=req.params.termId;
        const feedback=new TermFeedback({
            userId,
            termId,
            overallRating,
            shortDefinitionRating,
            longDefinitionRating,
            feedbackText
        });
        await feedback.save();
        res.status(201).json(feedback);
    }catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
};

const getAllFeedbacks=async(req,res)=>{
    try{
         const feedbacks =await TermFeedback.aggregate([
            { 
                $lookup: {
                            from: "userdatabases",
                            localField: "userId",
                            foreignField: "_id",
                            as: "user"
                        }},
            {
                $lookup: {
                            from: "allconceptsdatabases",
                            localField: "termId",
                            foreignField: "_id",
                            as: "term"
                        },
            },
            {
              $project:{
                "user.fullName": 1,
                "overallRating": 1,
                "shortDefinitionRating": 1,
                "longDefinitionRating": 1,
                "feedbackText": 1,
                "term": 1
              }
            }
        ]);
       res.json(feedbacks);
        
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

const deleteFeedback=async(req,res)=>{
    try{
        const feedbackId=req.params.feedbackId;
        const deleteFeedback=await TermFeedback.findByIdAndDelete(feedbackId);
        if(!deleteFeedback){
              return res.status(404).send("Feedback not found");
        }
         res.send("Feedback deleted successfully");
    } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
    };


module.exports={
    addFeedback,
    getAllFeedbacks,
    deleteFeedback
};
