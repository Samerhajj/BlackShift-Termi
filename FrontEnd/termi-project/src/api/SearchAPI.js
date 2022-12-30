import axios from "axios";
import { searchRoute, autocompleteRoute } from '../api/ApiRoutes';

const allCloseResults = [];

const closestResult = {};

const search = async (term, category) =>{
    try{
        let query = {params: {term: term, category: category}};
        const res = await axios.get(searchRoute, query);
        
        // If the server returns a status error
        if(res.status != 200){
            return {success: false, message: res.statusText};
        }
        if(res.data.length != 0){
            // Take all the close terms
            Object.assign(allCloseResults, res.data);
            // Take the closest term
            Object.assign(closestResult, res.data[0]);
            return {body: closestResult, success: true};
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

const autocomplete = async (input, language)=>{
    try{
        let params = {input: input, language: language};
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