const Search = require("../Models/searchSchema");
const User = require("../Models/userSchema");
var ObjectID = require('mongodb').ObjectID;

const searchTerm = async(req,res)=>{
  try{
    console.log(req.query);
    let term = req.query.term.trim();
    let category = req.query.category;
    let language = req.query.language;
    
    if(term != null && category != null){
      let categoryNum = parseInt(category);
      // let respond = await Search.find({
      //   $and: [
      //         {$or: [
      //               {"conceptName.english": {'$regex': "^"+ term,$options:'i'}},
      //               // {"conceptName.english": {'$regex': '\\(The'}},
      //               {"conceptName.hebrew": term},
      //               {"conceptName.arabic": term}
      //         ]},
      //         {"category": categoryNum}
      //   ]});
      
      let respond = await Search.find({
        "$text": {
          "$search": term
        }
      }).sort( 
        { score: { $meta : 'textScore' } }
      );
      
      console.log(respond);
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
  
  
  // {"conceptName": 1} => filters the fields and returns the fields with the value of 1.
  console.log(input + " " + language);
  // let respones = await Search.find({"conceptName.english": {'$regex': "^"+term ,$options:'i'}},{"conceptName": 1});
  let respones = await Search.find({
            "$text": {
            "$search": input
            }
          }).sort( 
            { score: { $meta : 'textScore' } }
          );
          
  // Fix this to be done within the query itself
  let temp = [];
  respones.forEach((item)=>{
      temp.push(item.conceptName[language]);
  });
  res.send(temp);
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
    let numOfTerms = parseInt(req.query.numOfTerms, 10);
    let category = parseInt(req.query.category, 10);
    if(numOfTerms > 0 && category != null){
      // let terms = await Search.aggregate([
      //   { categories: category },
      //   { $sample: { size: numOfTerms } }
      // ]);
      
      let terms = await Search.find({categories: category});
      let randomTerms = [];
      let generatedIndexs = new Map();
      
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
    console.log(e);
  }
};

const addToFav = async (req,res) =>{
  try {
        const id = req.body.person_id;
        const updateRes = await User.updateOne(
        { "_id": ObjectID(req.body.person_id)},
        { $addToSet: { favorite: req.body.id } },
        );
        res.send(updateRes.modifiedCount== 1) // --> update done succ
  }
  catch(err){
    console.log("hi from err");
    console.log(err);
  }
}

const getAllTermList = async (req,res) =>{
    let lista = ["6390aeba34aa753e5c961306"];

    console.log("data from body");
    console.log(req.body.list)
  // const resSe = await Search.find({ _id: { $in: lista} })

  const resSe = await Search.find({ _id: { $in: req.body.list} })
  
  // User.findMany()
//   res.send("hi");
  res.send(resSe);

}

const suggestTerm = async (req,res) =>{
  console.log(req.body);
  res.send("hello");
}

module.exports = {autoCompleteTerm,
                  searchTerm,
                  getRandomConcepts,
                  addToFav,getAllTermList,
                  suggestTerm};