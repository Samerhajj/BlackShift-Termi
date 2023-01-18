import axios from "axios";

const getAllSuggestedTerms = async (termId) => {
    try{
         const res = await axios.get("http://dir.y2022.kinneret.cc:7013/user/allsuggestedterms");
         console.log("=>>>>>>");
         console.log(res.data);
         return {body: res.data, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};

const addSelectedTerm = async (data)=>{
    // not implemented
    try{
        // const res = await axios.put(process.env.React_App_BaseURL + "user" + '/' + "approve-term",{_id:term_id});
        const res = await axios.put(process.env.React_App_BaseURL + "user" + '/' + "approve-term",data);
        console.log(res);
        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}

const deleteSelectedTerm = async (data) =>{
    try{
        // const url = "http://dir.y2022.kinneret.cc:7013/user/deleteonesuggest";
        const url = process.env.React_App_BaseURL + "user" + "/" + "deleteonesuggest";
        const res = await axios.delete(url, {data : {suggestId: data['_id']}});
        return {body: {info: res.data,del_ID:data['_id']}, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}

const top10 = async () =>{
    try{
        const res = await axios.get(process.env.React_App_BaseURL + "search" + "/" + "get-top10");
        return {body: res, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}


export default {getAllSuggestedTerms,deleteSelectedTerm,top10,addSelectedTerm};
