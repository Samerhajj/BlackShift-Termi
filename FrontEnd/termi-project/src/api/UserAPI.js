
import axios from "axios";
import { delFavoriteRoute } from '../api/ApiRoutes';

const getFavoriteList = async ()=>{
         try{
            let x = JSON.parse(localStorage.getItem('profileBody'));
            // let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];

            let email = x.email;
            const usr = await axios.post("http://dir.y2022.kinneret.cc:7013/user/favorite", {email:email})//find the user
            // const res1 = await axios.post("http://dir.y2022.kinneret.cc:7013/user/favorite", {personId})
            const favList =  await axios.post("http://dir.y2022.kinneret.cc:7013/search/display-myterms"
                                        ,{list:usr.data});// display all the fav
            let array = [];
            array = favList.data;
            console.log(array)
            return {body: array, success: true};
        }catch(err){
            console.log(err);
            return {success: false, message: err.message};
        }   
}

const favoriteCardDel = async (list,card,data) =>{
    try{
        const card_id = card['_id'];
        let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
        const del = await axios.put(delFavoriteRoute,{card_id,personId});
        const updatedArray = list.filter(item => item !== data);
        console.log("delete");
        return {body: updatedArray, success: true};
    }
    catch(err){
         console.log(err);
         return {success: false, message: err.message};
    }
}
export default {favoriteCardDel,getFavoriteList};
