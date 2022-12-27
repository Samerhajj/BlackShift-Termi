const express = require("express");
const router = express.Router();
const Note = require("../Models/noteSchema");
const {getAll} = require("./../Controllers/noteController")
router.use(express.json());


router.get("/",getAll);


// router.get('/',(req,res)=>{
//   res.json({
//     msg : "hi from note route"
//   });
// })




module.exports = router;
