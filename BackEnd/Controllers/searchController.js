const Search = require("../Models/searchSchema");
const User = require("../Models/userSchema");
const Category = require("../Models/categorySchema");

const searchTerm = async(req,res)=>{
  try{
    console.log(req.query);
    let term = req.query.term.trim();
    let category = req.query.category;
    let language = req.query.language;
    
    if(term != null && category != null){
      let categoryNum = parseInt(category);
      
      let respond = await Search.find({
        "$text": {
          "$search": term
          
        },
        "categories": { $in : [categoryNum] }
      }).sort( 
        { score: { $meta : 'textScore' } }
      );
      Search.updateOne({ _id: respond[0]._id }, { $inc: { searchCount: 1 } }, function(error,res) {
        if (error) {
          console.log(error);
        }
        else{
          console.log(res);
        }
      });
      console.log(respond);
      console.log(respond[0]['categories'])
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
  
  if(input != null && category != null){
    // {"conceptName": 1} => filters the fields and returns the fields with the value of 1.
    console.log(input + " " + language);
    // let respones = await Search.find({"conceptName.english": {'$regex': "^"+term ,$options:'i'}},{"conceptName": 1});
    let categoryNum = parseInt(category);
    let respones = await Search.find({
              "$text": {
                "$search": input
              },
              "categories": { $in : [categoryNum] }
            }).sort( 
              { score: { $meta : 'textScore' } }
            );
            
    // Fix this to be done within the query itself
    let temp = [];
    respones.forEach((item)=>{
        temp.push(item.conceptName[language]);
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
    res.send()
    console.log(e);
  }
};

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

const getTop10 = async (req,res)=>{
  try{
      const response = await Search.find().sort({searchCount : -1}).limit(10);
      res.send(response);
      console.log(response);
  }
  catch(err){
      console.log(err);
      res.send(err);
  }
}

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
  // const cats = [0,1];
  const cats  = req.body.categoryIds
  
  console.log("*****(((((((((((((((((((((((((((((((((((**")

  console.log(req.body);
        console.log("*****(((((((((((((((((((((((((((((((((((**")

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





module.exports = {autoCompleteTerm,
                  searchTerm,
                  getRandomConcepts,
                  getAllTermList,
                  suggestTerm,
                  getTop10,
                  addNewCategories,
                  getCategorie
};