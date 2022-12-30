import axios from "axios";
import { randomRoute } from '../api/ApiRoutes';


const random = async (numOfTerms, category)=>{
    try{
        let params = {params: {numOfTerms: numOfTerms, category: category}};
        const res = await axios.get(randomRoute, params);
        return {body: res.data, success: true};
    }catch(e){
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
    }
};

export default {random};