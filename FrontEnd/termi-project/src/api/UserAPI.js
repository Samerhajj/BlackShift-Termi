import axios from "axios";
import { favoritesRoute, deleteFavoriteRoute, addFavoriteRoute } from '../api/ApiRoutes';

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

const deleteFavorite = async (list,card,data) => {
    try{
        const card_id = card['_id'];
        let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
        const del = await axios.put(deleteFavoriteRoute, {card_id,personId});
        const updatedArray = list.filter(item => item !== data);
        console.log("delete");
        return {body: updatedArray, success: true};
    }
    catch(err){
         console.log(err);
         return {success: false, message: err.message};
    }
};

const deleteFavorite1 = async (termId) => {
    try{
        let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
        const res = await axios.put(deleteFavoriteRoute, {termId, personId});
        console.log(res);
        return {body: res.data, success: true};
    }
    catch(err){
         console.log(err);
         return {success: false, message: err.message};
    }
};

const addFavorite = async (favoriteId) => {
    try{
        let emailA = JSON.parse(localStorage.getItem("profileBody"))['email'];
        let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
        const update = await axios.put(addFavoriteRoute, {id:favoriteId, email:emailA, person_id:personId});
        console.log(update);
        return {body: update.data, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};

export default {favorites, deleteFavorite, deleteFavorite1, addFavorite};
