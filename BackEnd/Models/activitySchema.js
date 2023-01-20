const mongoose = require("mongoose");
// const moment = require('moment');
const moment = require('moment-timezone');


    //   const current = new Date();
    //   const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.toLocaleTimeString()}`;




const activitySchema = new mongoose.Schema({
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
    }
    ,
    activity:{
        type: String,
        default: null
    },
    currentLanguage: {
        type: String,
        default: null
    },
    previousLanguage: {
        type: String,
        default: null
    },
    origin: {
        type: String,
        default: null
    },
    searchCount: {
        type: Number,
        default: 0
  },
   lastScore:{
       type:Number,
       default:0
   },
   currentConceptLang:{
       type:String,
       default:null
   },previousConceptLang:{
       type:String,
       default:null
   }
});
const USERACTIVITY = mongoose.model("allusersactivitydatabase", activitySchema);
// lan 
module.exports = USERACTIVITY;


    // currentTime: {
    //     type: String,
    //     default: moment().tz("Etc/GMT-2").format('HH:mm:ss')//moment.utc().format();
    // },
    
    
    
//     const activitySchema = new mongoose.Schema({
//     email: String,
//     currentDate: {
//         type: Date,
//         default: Date.now
//     },
//     currentDate:{
//         type:String,
//         default: ()=>{
//             const date = new Date();
//             return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
//         }
//     },
//     currentTimea: {
//         type: String,
//       default: () => {
//       const date = new Date();
//       return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//         }
//     }
//     ,
//     activity:{
//         type: String,
//         default: null
//     },
//     currentLanguage: {
//         type: String,
//         default: null
//     },
//     previousLanguage: {
//         type: String,
//         default: null
//     },
//     origin: {
//         type: String,
//         default: null
//     },
//     userAgent: {
//         type: String,
//         default: null
//     },
//     ip: {
//         type: String,
//         default: null
//     }
// });
// const USERACTIVITY = mongoose.model("allusersactivitydatabase", activitySchema);
