import axios from "axios";
import {allsuggestedterms,approveTerm,deleteTerm,AllChangeLanguageLogs,AllSearchGameLogs} from "./ApiRoutes";
// return all the suggested terms from the clients
const getAllSuggestedTerms = async (termId) => {
    try{
         const res = await axios.get(allsuggestedterms);
         console.log("=>>>>>>");
         console.log(res.data);
         return {body: res.data, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};
// approve suggested term from the use
const addSelectedTerm = async (data)=>{
    try{
        const res = await axios.put(approveTerm,data);
        console.log(res);
        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}
// discard suggested term from the user
const deleteSelectedTerm = async (data) =>{
    try{
        const res = await axios.delete(deleteTerm, {data : {suggestId: data['_id']}});
        return {body: {info: res.data,del_ID:data['_id']}, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}
// return the top 10 terms has the most search count
const top10 = async () =>{
    try{
        const res = await axios.get(process.env.React_App_BaseURL + "search" + "/" + "get-top10");
        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};
// delete incorrect terms from the search.
const deleteTermFromSearch = async(data) =>{
    try{
        console.log(data);
        // const res = await axios.delete(process.env.React_App_BaseURL + "user" + "/" + "deleteterm", {data});
        let url =process.env.React_App_BaseURL + "user" + "/" + "deleteterm";
        const res = await axios.delete(url, {data : {TermID: data}});

        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}



// return to the admin all the change languages activity (activitySchema)
const fetchAllLogs = async ()=>{
    try{
        const res = await axios.get(AllChangeLanguageLogs);
        return {body: res.data, success: true};

    }catch(err){
        console.log(err);
        return {success: false, message: err.message};
       
    }
};
// return to the admin all the search game log (activitySchema2)
const fetchAllSearchGameLogs = async ()=>{
    try{
        const res = await axios.get(AllSearchGameLogs);
        return {body: res.data, success: true};
    }catch(err){
        console.log(err);
        return {success: false, message: err.message};
       
    }
};

export default {getAllSuggestedTerms,
                deleteSelectedTerm,
                top10,
                addSelectedTerm,
                fetchAllLogs,
                fetchAllSearchGameLogs,
                deleteTermFromSearch
};
