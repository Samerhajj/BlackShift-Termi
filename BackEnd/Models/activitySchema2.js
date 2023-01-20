const mongoose = require("mongoose");
// const moment = require('moment');
const moment = require('moment-timezone');


const activitySchema2 = new mongoose.Schema({
    email: String,
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
        default: null
    },
    origin: {
        type: String,
        default: null
    },
    previousGame:{
        type:String,
        default: null
    },
    currentGame:{
        type:String,
        default: null
    },
    searchCount: {
        type: Number,
        default: 0
  },
   category:{
       type:String,
       default:null 
   },
   lastScoreBeforeSwitchGame:{
       type:Number,
       default:0
   },
   timePlayed:{
       type:String,
       default:null
   }
});
const USERACTIVITY2 = mongoose.model("allusersactivity2database", activitySchema2);
// lan 
module.exports = USERACTIVITY2;

