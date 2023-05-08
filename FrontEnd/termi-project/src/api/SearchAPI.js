import axios from "axios";
import {searchRoute,
        autocompleteRoute,
        SearchActiviyUserRoute,
        search_historySearch,
        search_returnAllCategories} from '../api/ApiRoutes';

// const allCloseResults = [];

// const closestResult = {};

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
        if(res.data){
            // Take all the close terms
            // Object.assign(allCloseResults, res.data);
            // Take the closest term
            // Object.assign(closestResult, res.data[0], {category: category});
            console.log(res.data);
            
            
            console.log(res.data['categories'])
            const categoryNames = await axios.post(search_returnAllCategories,{categoryIds:res.data['categories']},{
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            
            return {body: {closestResult: res.data, categoryNames: categoryNames}, success: true};
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
    try{
        // {headers: {headers: { 'Authorization': `${localStorage.getItem('token')}`}}});
        const res = await axios.post(search_historySearch,{
            headers: {
                'x-auth-token': localStorage.getItem('token')}
            });
            let finishedHistory = [];
            res.data.map((item) => {
                finishedHistory.push({conceptName: item, isHistory: true});
            });
        return {body: finishedHistory, success: true};
    }
    catch(err){
        return {success: false, message: err.message};
    }
}

export default {search, autocomplete,historySearch};