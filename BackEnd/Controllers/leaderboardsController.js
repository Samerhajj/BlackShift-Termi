const User = require("../Models/userSchema");
const Leaderboard = require("../Models/leaderboardSchema");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// Function to get the suggestions leaderboard and the rank of the user sending the request
const getSuggestionsLeaderboard = async(req, res, next) => {
    try{
        const token = req.headers['x-auth-token'];
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id;
        const limitNum = parseInt(req.query.limit, 10);
        const category = req.query.category;
        
        const leaderboard = await User.aggregate([
            { $match: { field: category } },
            { $sort: { "suggestConceptCounter": -1 } },
            { $project: {
                _id: 0,
                fullName: 1,
                email: 1,
                field: 1,
                gender: 1,
                suggestion: 1,
                suggestConceptCounter: 1
            }},
            { $limit: limitNum }
        ]);
        res.status(200).json(leaderboard);
    }catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
    
};

// Function to get the game leaderboard and the rank of the user sending the request
const getGameLeaderboard = async(req, res, next) => {
    try{
        const token = req.headers['x-auth-token'];
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id;
        const category = req.query.category;
        const gameName = req.query.gameName;
        const limit = req.query.limit;
        
        if(category != null && gameName != null){
            let categoryNum = parseInt(category, 10);
            let limitNum = parseInt(limit, 10);
            
            // Find the leaderboard with the specified category id
            const leaderboard = await Leaderboard.aggregate([
                                  { $match: { categoryId: categoryNum } },
                                  { $unwind: "$games" },
                                  { $match: { "games.gameName": gameName } },
                                  { $unwind: { path: "$games.leaderboard" } },
                                  { $sort: { "games.leaderboard.points": -1 } },
                                  { $lookup: {
                                      from: "userdatabases",
                                      localField: "games.leaderboard.userId",
                                      foreignField: "_id",
                                      as: "user"}
                                  },
                                  { $addFields: {
                                        "games.leaderboard.user": { 
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
                                      gameName: { $first: "$games.gameName" },
                                      leaderboard: { $push: "$games.leaderboard" } }
                                  },
                                  { $project: {
                                      _id: 0,
                                      categoryId: 1,
                                      gameName: 1,
                                      userRank: {
                                        $add: [{$indexOfArray: [{ $map: {
                                                            input: "$leaderboard",
                                                            as: "lb",
                                                            in: "$$lb.userId"}},
                                                            mongoose.Types.ObjectId(userId)]}, 1]
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
                res.status(200).json(leaderboard);
            }
        }else{
            res.status(400).json({ message: "Incorrect or missing data"});
        }   
    }catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
};

// Function to test the addition of game points using postman
const addGamePoints = async(req, res, next) => {
    // This Funciton is not in use its for Postman test only
    const token = req.headers['x-auth-token'];
    const category = req.body.category;
    const gameName = req.body.gameName;
    const points = req.body.points;
    
    addLeaderboardPoints(token, category, gameName, points);
    res.status(200).json("Leaderboard Updated");
    
    // OLD CODE:
    // try{
    //     const token = req.headers['x-auth-token'];
    //     const decoded = jwt.verify(token, process.env.SECRET);
    //     const category = req.body.category;
    //     const gameName = req.body.gameName;
    //     const userId = decoded.id;
    //     const points = req.body.points;
        
    //     if(category != null && gameName != null && userId != null && points != null){
    //         let categoryNum = parseInt(category, 10);
    //         let pointsAmmount = parseInt(points, 10);
    //         // Find the leaderboard with the specified category id
    //         const leaderboard = await Leaderboard.findOne({ "categoryId": categoryNum });
    //         if(!leaderboard){
    //             const newLeaderboard = new Leaderboard({
    //                   "categoryId": categoryNum,
    //                   games: [{ "gameName": gameName,
    //                             "leaderboard": [{ "userId": userId,
    //                                               "points": pointsAmmount }]
    //                   }]
    //                 });
    //                 newLeaderboard.save();
    //         }else{
    //             // Category found, find the game with the specified name
    //             const game = leaderboard.games.find((game) => game.gameName === gameName);
    //             if (!game) {
    //               // Game not found, create new game and add user to leaderboard
    //               leaderboard.games.push({ "gameName": gameName, "leaderboard": [{ "userId": userId, "points": pointsAmmount }] });
    //               leaderboard.save();
    //             } else {
    //               // Game found, find the user with the specified id
    //               const user = game.leaderboard.find((user) => user.userId.toString() === userId);
    //               if (!user) {
    //                 // User not found, add to leaderboard with default points value of 0
    //                 game.leaderboard.push({ "userId": userId, "points": pointsAmmount });
    //                 leaderboard.save();
    //               } else {
    //                 // User already exists in leaderboard
    //                 user.points+=pointsAmmount;
    //                 leaderboard.save()
    //               }
    //             }
    //         }
    //         res.status(200).json({ message: "Points updated successfully"});
    //     }else{
    //         res.status(400).json({ message: "Incorrect or missing data"});
    //     } 
    // }catch(e){
    //     console.log(e);
    //     res.status(500).send("Server error");
    // }
};

// Function to add points to a user in the game leaderboard
const addLeaderboardPoints = async(token, category, gameName, points) => {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    if(category != null && gameName != null && userId != null && points != null){
        let categoryNum = parseInt(category, 10);
        let pointsAmmount = parseInt(points, 10);
        // Find the leaderboard with the specified category id
        const leaderboard = await Leaderboard.findOne({ "categoryId": categoryNum });
        if(!leaderboard){
            const newLeaderboard = new Leaderboard({
                  "categoryId": categoryNum,
                  games: [{ "gameName": gameName,
                            "leaderboard": [{ "userId": userId,
                                              "points": pointsAmmount }]
                  }]
                });
                newLeaderboard.save();
        }else{
            // Category found, find the game with the specified name
            const game = leaderboard.games.find((game) => game.gameName === gameName);
            if (!game) {
              // Game not found, create new game and add user to leaderboard
              leaderboard.games.push({ "gameName": gameName, "leaderboard": [{ "userId": userId, "points": pointsAmmount }] });
              leaderboard.save();
            } else {
              // Game found, find the user with the specified id
              const user = game.leaderboard.find((user) => user.userId.toString() === userId);
              if (!user) {
                // User not found, add to leaderboard with default points value of 0
                game.leaderboard.push({ "userId": userId, "points": pointsAmmount });
                leaderboard.save();
              } else {
                // User already exists in leaderboard
                user.points+=pointsAmmount;
                leaderboard.save();
              }
            }
        }
    }
};

module.exports={
    getSuggestionsLeaderboard,
    getGameLeaderboard,
    addGamePoints,
    addLeaderboardPoints
};