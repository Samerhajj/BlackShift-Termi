import axios from "axios";


const getAllSuggestedTerms = async (termId) => {
    try{
         const res = await axios.get("http://dir.y2022.kinneret.cc:7013/user/allsuggestedterms");
         return {body: res.data, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
};

const addSelectedTerm = async ()=>{
    // not implemented
}
const deleteSelectedTerm = async (data) =>{
    try{
        const url = "http://dir.y2022.kinneret.cc:7013/user/deleteonesuggest";
        const res = await axios.delete(url, {data : {suggestId: data['_id']}});
        return {body: {info: res.data,del_ID:data['_id']}, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
    
}

export default {getAllSuggestedTerms,deleteSelectedTerm};
