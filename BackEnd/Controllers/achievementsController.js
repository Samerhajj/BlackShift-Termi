const Achievement = require("../Models/achievementSchema");
const User = require("../Models/userSchema");

// Get Achievements
const getAchievements = async(req, res, next) => {
    try{
        let respond = await Achievement.find({});
        res.send(respond);
    }catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
};

// Add Achievement
const addAchievement = async(req, res, next) => {
    try{
        let name = req.body.name;
        let description = req.body.description;
        let requirement = req.body.requirement;
        let relevantGame = req.body.relevantGame;
        let image = req.body.image;
        
        const newAchievement = new Achievement({
            "name": name,
            "description": description,
            "requirement": requirement,
            "relevantGame": relevantGame,
            "image": image
        });
        newAchievement.save();
        
        res.send("Working...");
    }catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
};

// Update Achievement
const updateAchievement=async(req,res,next)=>{
    try{
        const userId=req.params.userId;
        const achievementId=req.params.achievementId;
        const requirementMet=req.body.requirementMet;
        console.log(userId + " USER ID");
        console.log(achievementId + " ID OF ACHIEVMENEJT");
        
        //check if the user and achievemnt exist
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send("User not found");
        }
        const achievement=await Achievement.findById(achievementId);
        if(!achievement){
            return res.status(404).send("Achievemnt not found");
        }
        
        //update the achievment for user if requirement met
        if(requirementMet){
            if(user.achievements.includes(achievementId)){
              
                return res.status(201).send("Achievement already added");
            }
            user.achievements.push(achievementId);
            await user.save();
          
            res.status(200).send("Achievement added");
        }
        else{
              res.send("Achievement not found for the user");
        }
    }
    catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

// Remove Achievment
const removeAchievement=async(req,res,next)=>{
    try{
        const userId=req.params.userId;
        const achievementId=req.params.achievementId;
        
        const user = await User.findByIdAndUpdate(userId, {
          $pull: { achievements: achievementId}
        });
        if(!user){
            return res.status(404).send("User not found");
        }
        res.send("Achievement Removed");
        
    }catch (e) {
        console.log(e);
        res.status(500).send("Server error");
  }
};


module.exports={
    getAchievements,
    addAchievement,
    updateAchievement,
    removeAchievement
};