import axios from "axios";
import { randomRoute, SearchActiviyUserRoute, updatePointsRoute } from '../api/ApiRoutes';


const random = async (numOfTerms, category,gameName)=>{
    try{
        // let params = {params: {numOfTerms: numOfTerms, category: category}};
        // const res = await axios.get(randomRoute, params);
        
        const activity = "Game started";
        const res = await axios.post(randomRoute,{
            numOfTerms: numOfTerms, category: category,activity,gameName}
        ,{
            headers: {
                'x-auth-token': localStorage.getItem('token')
        }});

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

const updatePoints=async(_id,points,gameName,category)=>{
    try{
        const activity = "Game over";
        const response = await axios.put(updatePointsRoute,
        {_id,points,gameName,category,activity},
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
        }});
        console.log(response);
        return { success: true };
       } 
    catch (error)
        {
          return { success: false, message: error.message };
        }
     };


export default {random,updatePoints};