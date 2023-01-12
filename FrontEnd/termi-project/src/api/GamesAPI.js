import axios from "axios";
import { randomRoute } from '../api/ApiRoutes';


const random = async (numOfTerms, category)=>{
    try{
        let params = {params: {numOfTerms: numOfTerms, category: category}};
        const res = await axios.get(randomRoute, params);
        console.log(res);
        return {body: res.data, success: true};
    }catch(e){
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
    }
};

const updatePoints=async(_id,points)=>{
    try{
        const response = await axios.put('http://dir.y2022.kinneret.cc:7013/profile/updatePoints',{_id,points});
        console.log(response);
        return { success: true };
       } 
    catch (error)
        {
          return { success: false, message: error.message };
        }
     };


export default {random,updatePoints};