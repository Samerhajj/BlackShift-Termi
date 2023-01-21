import axios from "axios";
import { searchRoute, autocompleteRoute,SearchActiviyUserRoute } from '../api/ApiRoutes';

const allCloseResults = [];

const closestResult = {};

const search = async (term, category) =>{
    try{
        console.log("right category :");
        console.log(category);
        console.log("right category :");
        // let query = {params: {term: term, category: category}};
        const res = await axios.post(searchRoute, {term: term, category: category, activity: "Concept search"},
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
        }});
        //"http://dir.y2022.kinneret.cc:7013/user/gameSearchActivity"
        //we need to improve this code ↓
        // const respond = await axios.post(SearchActiviyUserRoute,{activity,category}
        // ,{
        //     headers: {
        //         'x-auth-token': localStorage.getItem('token')
        // }});
        
        // If the server returns a status error
        if(res.status != 200){
            return {success: false, message: res.statusText};
        }
        if(res.data.length != 0){
            // Take all the close terms
            Object.assign(allCloseResults, res.data);
            // Take the closest term
            Object.assign(closestResult, res.data[0], {category: category});

            
            
            console.log(closestResult['categories'])
            const ur = "http://dir.y2022.kinneret.cc:7013/search/returnAllCategories";
            const categoryNames = await axios.post(ur,{categoryIds:closestResult['categories']},{
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
            console.log("*****(((((((((((((((((((((((((((((((((((**")
            console.log(categoryNames);
            console.log("*****((((((((((((((((((((((((((((((((((**")

            
            return {body: {closestResult,categoryNames}, success: true};
        }else{
            // Add the alert to suggest the searched term
            return {success: false, message: "Term doesn't exist, would you like to suggest it ?"};
        }
    }catch(e){
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
    }
};

const autocomplete = async (input, language,category)=>{
    try{
        let params = {input: input, language: language,category:category};
        const res = await axios.post(autocompleteRoute, params);
        return {body: res.data, success: true};
    }catch(e){
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
    }
};

export default {search, autocomplete, closestResult, allCloseResults};