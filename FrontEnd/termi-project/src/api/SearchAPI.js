import axios from "axios";
import { searchRoute, autocompleteRoute,SearchActiviyUserRoute } from '../api/ApiRoutes';

const allCloseResults = [];

const closestResult = {};

const search = async (term, language, category) =>{
    try{
        const res = await axios.post(searchRoute, {term: term, category: category, activity: "Concept search", language: language},
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
        }});
        
        // If the server returns a status error
        if(res.status != 200){
            return {success: false, message: res.statusText};
        }
        if(res.data.length != 0){
            // Take all the close terms
            Object.assign(allCloseResults, res.data);
            // Take the closest term
            Object.assign(closestResult, res.data[0], {category: category});
            console.log(res.data[0]);
            
            
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
            return {success: false, error:false, message: "Term doesn't exist, would you like to suggest it ?"};
        }
    }catch(e){
        if(e.response){
            return {success: false, error:false, message: e.response.data};
        }else{
            return {success: false, error:true, message: e.message};
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

const historySearch = async() =>{
    console.log(localStorage.getItem('token'))
    try{
        // {headers: {headers: { 'Authorization': `${localStorage.getItem('token')}`}}});
        const res = await axios.post("http://dir.y2022.kinneret.cc:7013/search/historySearch",{
            headers: {
                'x-auth-token': localStorage.getItem('token')}
            });
        return {body: res.data, success: true};
    }
    catch(err){
        return {success: false, message: err.message};
    }
}

export default {search, autocomplete, closestResult, allCloseResults,historySearch};