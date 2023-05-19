import axios from "axios";
import { achievementsRoute, achievementUpdateRoute } from '../api/ApiRoutes';


const getAllAchievements = async ()=>{
    try{
        const res = await axios.get(achievementsRoute);
        return {body: res.data, success: true};
    }catch(e){
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
    }
};


const updateAchievement = async (userId, achievementId, requirementMet) => {
  try {
    const res = await axios.put(`${achievementUpdateRoute}/${userId}/${achievementId}`, {
      requirementMet: requirementMet,
    });
    if(res.status == 201){
      return {body: res.data, success: true, added: false };
    }
    
    // Update the local user profile data
    return { body: res.data, success: true, added: true  };
  } catch (e) {
    if (e.response) {
      return { success: false, message: e.response.data };
    } else {
      return { success: false, message: e.message };
    }
  }
};

export default {getAllAchievements,updateAchievement};