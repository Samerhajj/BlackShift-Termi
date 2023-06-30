import axios from "axios";
import { favoritesRoute,
deleteFavoriteRoute,
addFavoriteRoute,
suggestUserRoute,
suggestionsRoute,
search_favorites,
user_getUserData,
user_activeLag,
uploadProfileImageRoute
} from '../api/ApiRoutes';

const favorites = async (email) => {
    try{
        const usr = await axios.post(favoritesRoute, {email:email})//find the user
        // const res1 = await axios.post("http://dir.y2022.kinneret.cc:7013/user/favorite", {personId})
        const favList =  await axios.post(search_favorites, {list:usr.data});// display all the fav
        
        let array = [];
        array = favList.data;
        console.log(array)
        
        // const ur = "http://dir.y2022.kinneret.cc:7013/search/returnAllCategories";
            // const categoryNames = await axios.post(ur,);
        
        return {body: array, success: true};
    }catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }   
}

const getAllSuggestList = async (email) => {
    try{
        const usr = await axios.post(suggestionsRoute, {email:email})
        //router.post("/suggestions",suggestion); // new
        console.log("user :");
        console.log(usr);
        // const list = await axios.post("http://dir.y2022.kinneret.cc:7013/search/display-myterms",{list:usr.data})
        // let array = [];
        // array = list.data;
        // console.log(array)
        

        return {body: usr, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}

// const deleteFavorite = async (list,card,data) => {
//     try{
//         const card_id = card['_id'];
//         let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
//         const del = await axios.put(deleteFavoriteRoute, {card_id,personId});
//         const updatedArray = list.filter(item => item !== data);
//         console.log("delete");
//         return {body: updatedArray, success: true};
//     }
//     catch(err){
//          console.log(err);
//          return {success: false, message: err.message};
//     }
// };

const deleteFavorite = async (termId, userId) => {
    try{
        const res = await axios.put(deleteFavoriteRoute, {termId: termId, personId: userId});
        return {body: {updatedList: res.data, isDeleted: !res.data.includes(termId)}, success: true};
    }
    catch(err){
         console.log(err);
         return {success: false, message: err.message};
    }
};
// this function is running when you click on the star in TeamCard.js
const addFavorite = async (termId, userId) => {
    try{
        const res = await axios.put(addFavoriteRoute, {termId: termId, personId: userId});
        return {body: {updatedList: res.data, isAdded: res.data.includes(termId)}, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};

const suggestFromUser = async (values) => {
    try{
        // values.selectedCategory = [selectedCategory];
         
        console.log(values);
        const res = await axios.post(suggestUserRoute, values, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
        }});
        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}

const languageChanged = async (email,activity,page,isCounterChanged,currentConceptLang=null,previousConceptLang=null) => {
    try{
    //Data to send.
    let points = 0 ;
    if(page=='Definition Game' || 'Memory Game'){
        points = parseInt(localStorage.getItem('points'));
    }

    // console.log(page);
    const cLang = localStorage.getItem('currentLanguage');
    const pLang = localStorage.getItem('previousLanguage');
    const sCount = parseInt(localStorage.getItem('searchCounter'));
    
    const data = { cLang, pLang,email,activity,page,sCount,points,currentConceptLang,previousConceptLang };
        const result = await axios.post(user_activeLag, data);
        return {body: result, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};

const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.get(user_getUserData, {
          headers: { 'x-auth-token': token }
        });
        return {body: res.data, success: true};
      } catch (err) {
        console.log(err);
        return {success: false};
      }
    }
};

const uploadProfileImage = async (formData) => {
    try{
        const res = await axios.post(uploadProfileImageRoute, formData);
        return {body: res.data, success: true};
    }catch(ex){
        return {success: false, message: "Can't upload image"};
    }
};

export default {favorites, deleteFavorite, addFavorite,suggestFromUser,languageChanged,getUserData,getAllSuggestList,uploadProfileImage};

{
    // const email = "m7md@gmail.com";// comment this 
    // const activity = "Change Language";


    // if((localStorage.hasOwnProperty('profileBody'))['email']){


    // } 


// import axios from "axios";
// import { favoritesRoute, deleteFavoriteRoute, addFavoriteRoute,suggestUserRoute } from '../api/ApiRoutes';

// const favorites = async () => {
//     try{
//         let x = JSON.parse(localStorage.getItem('profileBody'));
//         // let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];

//         let email = x.email;
//         const usr = await axios.post(favoritesRoute, {email:email})//find the user
//         // const res1 = await axios.post("http://dir.y2022.kinneret.cc:7013/user/favorite", {personId})
//         const favList =  await axios.post("http://dir.y2022.kinneret.cc:7013/search/display-myterms", {list:usr.data});// display all the fav
        
//         let array = [];
//         array = favList.data;
//         console.log(array)
        
//         // const ur = "http://dir.y2022.kinneret.cc:7013/search/returnAllCategories";
//             // const categoryNames = await axios.post(ur,);
        
        
        
        
//         return {body: array, success: true};
//     }catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }   
// }

// // const deleteFavorite = async (list,card,data) => {
// //     try{
// //         const card_id = card['_id'];
// //         let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
// //         const del = await axios.put(deleteFavoriteRoute, {card_id,personId});
// //         const updatedArray = list.filter(item => item !== data);
// //         console.log("delete");
// //         return {body: updatedArray, success: true};
// //     }
// //     catch(err){
// //          console.log(err);
// //          return {success: false, message: err.message};
// //     }
// // };

// const deleteFavorite = async (termId) => {
//     try{
//         let user = JSON.parse(localStorage.getItem("profileBody"));
//         const res = await axios.put(deleteFavoriteRoute, {termId: termId, personId: user['_id']});
//         user['favorite'] = res.data;
//         localStorage.setItem("profileBody", JSON.stringify(user));
//         return {body: {updatedList: res.data, isDeleted: !res.data.includes(termId)}, success: true};
//     }
//     catch(err){
//          console.log(err);
//          return {success: false, message: err.message};
//     }
// };

// const addFavorite = async (termId) => {
//     try{
//         let user = JSON.parse(localStorage.getItem("profileBody"));
//         const res = await axios.put(addFavoriteRoute, {termId: termId, personId: user['_id']});
//         user['favorite'] = res.data;
//         localStorage.setItem("profileBody", JSON.stringify(user));
//         return {body: {updatedList: res.data, isAdded: res.data.includes(termId)}, success: true};
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// };

// const suggestFromUser = async (values,selectedCategory) => {
//     try{
//         const user = JSON.parse(localStorage.getItem('profileBody'));
//         values.suggestedBy = user.fullName;
//         values.selectedCategory = [selectedCategory];
//         console.log(selectedCategory);
//         console.log(values);
//         const res = await axios.post(suggestUserRoute, values);
//         console.log(res);
//         console.log({values,selectedCategory});
//         return {body: res, success: true};
//     }
    
    
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// }


// // // not implemented
// // const languageChanged = async ()=>{
// //     //localStorage.getItem(previousLanguage);
    
// // }
// const languageChanged = async (activity) => {
//     try{
//     const page  = document.title;
//     const cLang = localStorage.getItem('currentLanguage');
//     const pLang = localStorage.getItem('previousLanguage');
//     const sCount = parseInt(localStorage.getItem('searchCounter'));
//     // if((localStorage.hasOwnProperty('profileBody'))['email']){
//     const email = JSON.parse(localStorage.getItem('profileBody'))['email'];// this right
//     // const email = "m7md@gmail.com";// comment this 

//     // const activity = "Change Language";
//     const data = { cLang, pLang,email,activity,page,sCount };
//     // let result;
//     const result = await axios.post("http://dir.y2022.kinneret.cc:7013/user/active-lag", data);
//     // if(result.status == 200){
//     //     //   localStorage.setItem("searchCounter",0 );
//     //       console.log(result);

//     //     }
//         return {body: result, success: true};
        
//     // } 
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// };



// export default {favorites, deleteFavorite, addFavorite,suggestFromUser,languageChanged};
}
