import axios from "axios";
import { allCategoriesRoute } from '../api/ApiRoutes';


const getAllCategories = async ()=>{
    try{
        const res = await axios.get(allCategoriesRoute);
        return {body: res.data, success: true};
    }catch(e){
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
    }
};

export default {getAllCategories}; 