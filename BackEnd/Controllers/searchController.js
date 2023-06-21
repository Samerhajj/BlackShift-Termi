const Search = require("../Models/searchSchema");
const User = require("../Models/userSchema");
const Category = require("../Models/categorySchema");
const {gameSearchActivity} = require("./UserFolder/tracker/gameSearchActivity");
const jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');

const searchTerm = async(req,res)=>{
  try{
    let term = req.body.term;
    let category = req.body.category;
    let language = req.body.language;
    let token = req.headers["x-auth-token"];
    
    console.log(term + " " + category + " " + language);
    
    if(term != null && category != null && language != null){
      let categoryNum = parseInt(category);
      {
      // let respond = await Search.find({
      //   "$text": {
      //     "$search": term
      //   },
      //   "categories": { $in : [categoryNum] }
      // }).sort( 
      //   { score: { $meta : 'textScore' } }
      // );
      }
      
      // To avoid SQL injection
     let sanitizedTerm = sanitize(term
        .trim()
        .replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"));
                                  
      let respond = await Search.findOne({
        [`conceptName.${language}`]: {'$regex': "^"+ sanitizedTerm +"\\s*$" ,$options:'i'},
        "categories": { $in : [categoryNum] }
      });

      if(respond){
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.SECRET);
          // const user = await User.findByIdAndUpdate({_id :decoded.id},{$inc: { searchCounter: 1 }});
          console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
          // Await
          // await User.updateOne(
          //   { _id: decoded.id },
          //   {
          //     $push: {
          //       recentSearch: {
          //         $each: [respond.conceptName[language]],
          //         $position: 0,
          //         $slice: 5
          //       }
          //     }
          //   }
          // );
          
          const user = await User.findById(decoded.id);
          if(user){
            user.updateRecentSearch(respond.conceptName[language]);
          }
          console.log("Update the search count");
        } catch (err) {
          console.log("Not auth");
        }
        Search.updateOne({ _id: respond._id }, { $inc: { searchCount: 1 } }, function(error,res) {
          if (error) {
            console.log(error);
          }
          else{
            console.log(res);
          }
        });
        const currentDate = new Date();
        const trendingTerms = await Search.find({}).sort({searchCount : -1}).limit(10); 
        
        const resultTerm=respond.toObject();
        const newOrTrendRes = isNewOrTrending(resultTerm, trendingTerms, currentDate);
        resultTerm.isNew = newOrTrendRes.isNew;
        resultTerm.isTrending = newOrTrendRes.isTrending;
        respond=resultTerm;
      }
      gameSearchActivity(token, req.body.activity, category);
      res.send(respond);
    }else{
      res.status(400).send("Missing data");
    }
  }catch(e){
    console.log(e);
    res.status(500).send("Server error");
  }
};

const autoCompleteTerm = async(req,res) =>{
  let input = req.body.input;
  let language = req.body.language;
  let category = req.body.category;
  
  if(input != null && category != null && language != null){
    // {"conceptName": 1} => filters the fields and returns the fields with the value of 1.
    console.log(input + " " + language);
    // let respones = await Search.find({"conceptName.english": {'$regex': "^"+term ,$options:'i'}},{"conceptName": 1});
    let categoryNum = parseInt(category);
    
    //Sanitaze the input before the query
    // let sanitizedInput = sanitize(input
    //                               .trim()
    //                               .replace("(", "\\(")
    //                               .replace(")", "\\)")
    //                               .replace("/", "\\/"));
    let sanitizedInput = sanitize(input.trim()).replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    
    let respones = await Search.find({
      [`conceptName.${language}`]: {'$regex': "^"+sanitizedInput ,$options:'i'},
      "categories": { $in : [categoryNum] }
    }).limit(10);
    
    
   
    // Fix this to be done within the query itself
    let temp = [];
    
    const currentDate = new Date();
    const trendingTerms = await Search.find({}).sort({searchCount : -1}).limit(10);
    
    respones.forEach((item)=>{
        const newOrTrendingRes = isNewOrTrending(item, trendingTerms, currentDate);
        temp.push({conceptName: item.conceptName[language], isNew: newOrTrendingRes.isNew, isTrending: newOrTrendingRes.isTrending});
    });
    res.send(temp);
  }else{
    res.status(400).send("Missing data");
  }
  // let respones = await Search.aggregate([
  //       {
  //         "$search": {
  //           "index":"termSearch", 
  //           "autocomplete": {
  //             "query": term,
  //             "path": "conceptName.english",
  //             "fuzzy":{
  //               "maxEdits": 1
  //             }
  //           }
  //         }
  //       },
  //       {"$limit": 5},
  //       {"$project": {"conceptName": 1, "_id":1}}
  // ]);
  
  // console.log(respones);
};

const getRandomConcepts = async(req,res)=>{
  try{
     console.log(req.body);
     console.log(req.body.numOfTerms);
    const numOfTerms = parseInt(req.body.numOfTerms, 10);
    let category = parseInt(req.body.category, 10);
    
    if(numOfTerms > 0 && category != null){
      // let terms = await Search.aggregate([
      //   { categories: category },
      //   { $sample: { size: numOfTerms } }
      // ]);
      
      
     
      
      let terms = await Search.find({categories: category});
      let randomTerms = [];
      let generatedIndexs = new Map();
      
      if(terms.length <= numOfTerms){
        res.status(400).send("Not enough concepts in the database");
      }
      
      for (var i = 0; i < numOfTerms; i++) {
        let randIndex = Math.floor(Math.random() * terms.length);
        if(numOfTerms <= terms.length && generatedIndexs.has(randIndex)){
          //if the term exsits skip it
          i--;
          continue;
        }
        generatedIndexs.set(randIndex);
        randomTerms[i] = terms[randIndex];
      }
      const token = req.headers['x-auth-token'];
      gameSearchActivity(token, req.body.activity, category,req.body.gameName);
      res.send(randomTerms);
      
      // Search.aggregate([
      //   { $match : { categories: category } },
      //   { $sample: { size: numOfTerms } }
      // ], function(err, items) {
      //   if(err){
      //     res.send(err);
      //   }else{
      //     console.log(items);
      //     res.send(items);
      //   }
      // });
    }
  }catch(e){
    res.send();
  }
};

const getAllTermList = async (req,res) =>{
    // let lista = ["6390aeba34aa753e5c961306"];

    console.log("data from body");
    console.log(req.body.list)
  // const resSe = await Search.find({ _id: { $in: lista} })

  const resSe = await Search.find({ _id: { $in: req.body.list} })
  
  // User.findMany()
//   res.send("hi");
  res.send(resSe);

} // this function for return all the fav list

const getAllSuggestList = async (req,res) =>{
  
  const resSe = await Search.find({ _id: { $in: req.body.suggestions} })
  console.log("GGGG")
  console.log(resSe)
    console.log("GGGG")

  res.send(resSe);

}

const suggestTerm = async (req,res) =>{
  console.log(req.body);
  res.send("hello");
} // not that important

// const getTop10 = async (req,res)=>{
//   try{
//       const response = await Search.find().sort({searchCount : -1}).limit(10);
//       res.send(response);
//       console.log(response);
//   }
//   catch(err){
//       console.log(err);
//       res.send(err);
//   }
// }

const getTop10 = async (req, res) => {
  try {
    const role = req.query.role;
    if (role !== "admin") {
      return res.status(401).json("Unauthorized");
    }

    const response = await Search.find().sort({ searchCount: -1 }).limit(10);
    res.send(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};// return the top 10 


const addNewCategories = async (req,res) =>{
  try{
      console.log("hi");
      
          const newCategory = await new Category({
          categoryId: "0",
            "categoryName" : {
            "arabic": 'الموارد البشرية' ,
            "hebrew" : "משאבי אנוש",
            "english" : "human resources"
        }
    })
    
    


//     const newCategory = await new Category({
//     "categoryId": "1",
//     "categoryName": {
//         "arabic": "حاسوب هندسة",
//         "hebrew": "תוכנה הנדסת",
//         "english": "software engineering"
//     }
// })
    
    
    
     newCategory.save(); 
      console.log(req.body);
      res.send(req.body);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
}

const getCategorie = async (req,res)=>{
  const token = req.headers["x-auth-token"];
  // console.log(`this is the token : \n ${token}`)
      let decoded;
      try{
          decoded = jwt.verify(token, process.env.SECRET);
      }
      catch(err){
        console.log("Not auth");
      }
  
  // const cats = [0,1];
  const cats  = req.body.categoryIds;
  
  // console.log("*****(((((((((((((((((((((((((((((((((((**")

  // console.log(req.body);
  //       console.log("*****(((((((((((((((((((((((((((((((((((**")

  // const catName = await Category.find({ 'categoryId': { $in: req.body.categoryName} })
  // res.send(catName);

    const cat_res = await Category.find({categoryId :{$in: cats }});//new
    const arrayOfCategorys = cat_res.map(item => item.categoryName);
    console.log(arrayOfCategorys)
  
  
  
  console.log("*******")
  console.log(arrayOfCategorys);
  console.log("*******")
  res.send(arrayOfCategorys);
  
  // const cat_res = await Category.find({categoryId :{$in: cat }});
  
  // console.log(cat_res[0]['categoryName']);
  // res.send(cat_res[0]['categoryName']);

}

const historySearch = async (req, res) => {
  try {
    let token = req.body.headers["x-auth-token"];
    if (!token) {
      // Return an error response if token is missing
      return res.status(401).send("JWT token must be provided");
    }
    let decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (user) {
      const recentSearchValues = user.recentSearch;
      console.log(recentSearchValues);
      res.send(recentSearchValues);
    } else {
      // User not found
      console.log("User not found");
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    // Return an error response with appropriate status code and error message
    res.status(500).send("Internal Server Error");
  }
};


//This functions is a local one to check if the term is trending or new
const isNewOrTrending = (term, trendingTerms, currentDate) =>{
    const lastEdited = new Date(term.lastEdited);
    const timeDiff = currentDate.getTime() - lastEdited.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return {isTrending: trendingTerms.some(trendingItem => trendingItem._id.equals(term._id)), isNew: daysDiff <= 14};
};


module.exports = {autoCompleteTerm,
                  searchTerm,
                  getRandomConcepts,
                  getAllTermList,
                  suggestTerm,
                  getTop10,
                  addNewCategories,
                  getCategorie,
                  getAllSuggestList,
                  historySearch
};




//       if (respond.length != 0) {
//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.SECRET);

//     await User.updateRecentSearch(decoded.id, respond[0].conceptName[language]);
//     console.log("Update the search count");
//   } catch (err) {
//     console.log("Not auth");
//   }

//   Search.updateOne({ _id: respond[0]._id }, { $inc: { searchCount: 1 } }, function(error, res) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(res);
//     }
//   });
// }

// gameSearchActivity(token, req.body.activity, category);
// res.send(respond);