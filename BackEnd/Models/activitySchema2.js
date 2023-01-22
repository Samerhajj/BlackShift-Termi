const mongoose = require("mongoose");

const activitySchema2 = new mongoose.Schema({
    email: String,
    gameName:{
        type: String,
        default: null,
        enum: ["Definition Game","Memory Game",null]
    },

    currentDate:{
        type:String,
        default: ()=>{
            const date = new Date();
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
    },
    currentTime: {
      type: String,
      default: () => {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
    },
    activity:{
        type: String,
        default: null,
        enum: ["Game started","Game over","Concept search"]
    },
    currentScore:{
         type: Number,
        default: 0
    },
    category:{
       type:String,
       default:null
   },
    searchCounter: {
        type: Number,
        default: 0
  },
   
});
const USERACTIVITY2 = mongoose.model("allusersactivity2database", activitySchema2);
module.exports = USERACTIVITY2;



