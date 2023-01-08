import axios from "axios";
import { favoritesRoute, deleteFavoriteRoute, addFavoriteRoute,suggestUserRoute } from '../api/ApiRoutes';

const favorites = async () => {
    try{
        let x = JSON.parse(localStorage.getItem('profileBody'));
        // let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];

        let email = x.email;
        const usr = await axios.post(favoritesRoute, {email:email})//find the user
        // const res1 = await axios.post("http://dir.y2022.kinneret.cc:7013/user/favorite", {personId})
        const favList =  await axios.post("http://dir.y2022.kinneret.cc:7013/search/display-myterms", {list:usr.data});// display all the fav
        let array = [];
        array = favList.data;
        console.log(array)
        return {body: array, success: true};
    }catch(err){
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

const deleteFavorite = async (termId) => {
    try{
        let user = JSON.parse(localStorage.getItem("profileBody"));
        const res = await axios.put(deleteFavoriteRoute, {termId: termId, personId: user['_id']});
        user['favorite'] = res.data;
        localStorage.setItem("profileBody", JSON.stringify(user));
        return {body: {updatedList: res.data, isDeleted: !res.data.includes(termId)}, success: true};
    }
    catch(err){
         console.log(err);
         return {success: false, message: err.message};
    }
};

const addFavorite = async (termId) => {
    try{
        let user = JSON.parse(localStorage.getItem("profileBody"));
        const res = await axios.put(addFavoriteRoute, {termId: termId, personId: user['_id']});
        user['favorite'] = res.data;
        localStorage.setItem("profileBody", JSON.stringify(user));
        return {body: {updatedList: res.data, isAdded: res.data.includes(termId)}, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};

const suggestFromUser = async (values,selectedCategory) => {
    try{
        const user = JSON.parse(localStorage.getItem('profileBody'));
        values.suggestedBy = user.fullName;
        const res = await axios.post(suggestUserRoute, {values,selectedCategory})
        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}

export default {favorites, deleteFavorite, addFavorite,suggestFromUser};

