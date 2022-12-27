const Search = require("../Models/searchSchema");
const User = require("../Models/userSchema");

const getAllConcept = async (req, res)=>{
  await Search.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getConcept = async(req,res)=>{
  await Search.findById(req.body.id)
    .then((result) => {
      res.send(result);
      console.log(req.params.id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const SearchParams = async(req,res)=>{
  await Search.findById(req.params.id)
    .then((result) => {
      res.send(result);
      // console.log(result.conceptName);
    })
    .catch((err) => {
      console.log(err);
    });
};

const SearchWord = async(req,res)=>{
  let wo = req.params['word'];

  console.log("what you are looking for : ",wo);
  
  var query = {'conceptName.english': wo}
  
  // let respones = await Search.find({"conceptName.english": wo})
  // let respones = await Search.find({"conceptName.english": {'$regex': wo,$options:'i'}});
    
    
  let respones = await Search.find({ $or: [{"conceptName.english": {'$regex': wo,$options:'i'}}, {"conceptName.english": wo}] });
   

// var thename = 'Andrew';
// db.collection.find({'name': {'$regex': thename,$options:'i'}});

  if(respones){
    console.log(respones);
      // let respones = await Search.find({conceptName: {english: wo}});
      console.log({"conceptName.english": wo});
      // let respones = await Search.find({$conceptName : {"english": wo}});
      res.send(respones);
  }
  else{
      console.log("ohh no something wrong happend");
  }

    
  
  
  
  // ,(error,found)=>{
  //   if(error){
  //     console.log(error);
  //   }else{
  //     console.log(found);
  //     // let respones = await Search.find({conceptName: {english: wo}});
  //     console.log({"conceptName.english": wo});
  //     // let respones = await Search.find({$conceptName : {"english": wo}});
  //     res.send(respones);
  //   }
  //   });
  
  
  
  
  
  // let respones = await Search.find({$conceptName : { english: wo}},(err,found)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     res.send(found);
  //   }
  // });
  
  // res.send(respones);
  // console.log(respones);
  // console.log(wo);
  
  //http://dir.y2022.kinneret.cc:7013/search/value/api/oney
  //conceptName
  // {conceptName.english: req.params['word']
  // await Search.find(
  //   {categories: "0", conceptName : {$elemMatch: {english : "Hiring"}}}
  //   ,()=>console.log("hello"));
  
  // , (err,found)=>{
  //   if (err) {
  //     console.log(err);
  //   } 
  //     if (found) {
  //       //if there is a user exist
  //       console.log(found);
  //       res.send(found);
  //     }
    
  // })
  
  
  
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
  console.log(req.body.id);
  console.log(req.body.emailA);
  
 await User.updateOne(
  { email: req.body.emailA },
  { $push: { favorite: req.body.id_term } },
  (error, result) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(result);
      res.send(result);
    }
  }
);
}




module.exports = {getAllConcept,getConcept,SearchParams,SearchWord,autoCompleteTerm,searchTerm,getRandomConcepts,addToFav};



// if(err){console.log(err); res.send(err)}
//     else {
//       console.log(found)
//       res.send(found)
      
//     }
//   });