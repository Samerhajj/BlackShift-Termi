const User = require("../Models/userSchema");
const Leaderboard = require("../Models/leaderboardSchema");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// Function to get the game leaderboard and the rank of the user sending the request
const getLeaderboard = async(req, res, next) => {
    try{
        const token = req.headers['x-auth-token'];
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id;
        const category = req.query.category;
        const context = req.query.context;
        const limit = req.query.limit;
        
        console.log(req.query);
        
        if(category != null && context != null){
            let categoryNum = parseInt(category, 10);
            let limitNum = parseInt(limit, 10);
            
            const leaderboard = await Leaderboard.aggregate([
                                  // Find the category
                                  { $match: { categoryId: categoryNum } },
                                  { $unwind: "$contexts" },
                                  // Find the Game
                                  { $match: { "contexts.context": context } },
                                  { $unwind: { path: "$contexts.leaderboard" } },
                                  // Sort them according to the score
                                  { $sort: { "contexts.leaderboard.points": -1 } },
                                  // Put add a new field with the user info according to the user's id
                                  { $lookup: {
                                      from: "userdatabases",
                                      localField: "contexts.leaderboard.userId",
                                      foreignField: "_id",
                                      as: "user"}
                                  },
                                  { $addFields: {
                                        "contexts.leaderboard.user": { 
                                            $let: {
                                                vars: { user: { $arrayElemAt: ["$user", 0] } },
                                                in: { fullName: "$$user.fullName", email: "$$user.email", field: "$$user.field", gender: "$$user.gender" }
                                            }
                                        }
                                    },
                                  },
                                  { $group: {
                                      _id: "$_id", 
                                      categoryId: { $first: "$categoryId" },
                                      context: { $first: "$contexts.context" },
                                      leaderboard: { $push: "$contexts.leaderboard" } }
                                  },
                                  // Return the wanted fields with the userRank
                                  { $project: {
                                      _id: 0,
                                      categoryId: 1,
                                      context: 1,
                                      userRank: {
                                        $add: [{$indexOfArray: [{ $map: {
                                                            input: "$leaderboard",
                                                            as: "lb",
                                                            in: "$$lb.userId"}},
                                                            mongoose.Types.ObjectId(userId)]}, 1]
                                      },
                                      userScore: {
                                        $let: {
                                          vars: {
                                            user: { $arrayElemAt: [
                                              { $filter: {
                                                  input: "$leaderboard",
                                                  as: "lb",
                                                  cond: { $eq: ["$$lb.userId", mongoose.Types.ObjectId(userId)] }
                                                }
                                              }, 0]
                                            }
                                          },
                                          in: "$$user.points"
                                        }
                                      },
                                      leaderboard: {
                                        $map: {
                                            input: {
                                                $slice: ["$leaderboard", limitNum]
                                            },
                                            as: "leaderboard",
                                            in: {
                                                points: "$$leaderboard.points",
                                                user: "$$leaderboard.user",
                                                rank: "$$leaderboard.rank"
                                            }
                                        }
                                      }
                                    },
                                  }
                                ]);
            if(!leaderboard){
                res.status(400).json({ message:"Leaderboard is empty" });
            }else{
                res.status(200).json(leaderboard[0]);
            }
        }else{
            res.status(400).json({ message: "Incorrect or missing data"});
        }   
    }catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
};

// Function to get all the names of leaderboards available in a category
const getAvailableContexts = async(req, res, next) => {
    try{
        const category = req.query.category;
        
        if(category != null){
            let categoryNum = parseInt(category, 10);
            
            const data = await Leaderboard.aggregate([
                                { 
                                    $match: { categoryId: categoryNum }
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        contexts: "$contexts.context"
                                    }
                                }
                                ]);
            if(!data){
                res.status(400).json({ message:"There are no contexts for this category" });
            }else{
                console.log(data)
                res.status(200).json(data[0]);
            }
        }else{
            res.status(400).json({ message: "Incorrect or missing data"});
        }   
    }catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
}

// Function to add points to a user in the leaderboard
const addLeaderboardPoints = async(userId, category, context, points) => {
    try{
        if(category != null && context != null && userId != null && points != null){
            let categoryNum = parseInt(category, 10);
            let pointsAmmount = parseInt(points, 10);
            
            // Find the leaderboard with the specified category id
            const leaderboard = await Leaderboard.findOne({ "categoryId": categoryNum });
            if(!leaderboard){
                const newLeaderboard = new Leaderboard({
                      "categoryId": categoryNum,
                      contexts: [{ "context": context,
                                "leaderboard": [{ "userId": userId,
                                                  "points": pointsAmmount }]
                      }]
                    });
                    newLeaderboard.save();
            }else{
                // Category found, find the context provided
                const contextRes = leaderboard.contexts.find((item) => item.context === context);
                if (!contextRes) {
                  // Context not found, create new context and add user to leaderboard
                  leaderboard.contexts.push({ "context": context, "leaderboard": [{ "userId": userId, "points": pointsAmmount }] });
                  leaderboard.save();
                } else {
                  // Context found, find the user with the specified id
                  const user = contextRes.leaderboard.find((user) => user.userId.toString() === userId);
                  if (!user) {
                    // User not found, add to leaderboard with the ammount of points provided
                    contextRes.leaderboard.push({ "userId": userId, "points": pointsAmmount });
                    leaderboard.save();
                  } else {
                    // User already exists in leaderboard
                    user.points+=pointsAmmount;
                    leaderboard.save();
                  }
                }
            }
        }
    }catch(error){
        console.log(error);
    }
};

module.exports={
    getLeaderboard,
    addLeaderboardPoints,
    getAvailableContexts
};