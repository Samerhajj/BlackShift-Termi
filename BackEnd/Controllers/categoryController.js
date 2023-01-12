const Category = require("../Models/categorySchema");

const getAllCategories = async (req,res)=>{
    try{
        let respond = await Category.find({});
        res.send(respond);
    }catch(err){
        console.log(err);
    }
};

module.exports = {getAllCategories};