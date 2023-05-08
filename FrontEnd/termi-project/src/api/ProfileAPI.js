import axios from "axios";
import {profile_edit,profile_change_password,profile_get_point,profile_getSearchCount} from "./ApiRoutes";
const updateProfile = async formValues => {
  try {
         console.log('Request body:', formValues);
    // send a PUT request to update the profile information
    const response = await axios.put(profile_edit, formValues);
    // handle success
    return { body: response.data, success: true };
  } catch (error) {
    // handle error
    return { success: false, message: error.message };
  }
};

const changePassword = async formValues => {
  try {
         console.log('Request body:', formValues);
    // send a PUT request to update the password
    const response = await axios.put(profile_change_password, formValues);
    // handle success
    return { body: response.data, success: true };
  } catch (error) {
    // handle error
    return { success: false, message: error.message };
  }
};

const getGamePoints = async () => {
  try {
    const response = await axios.get(profile_get_point, {headers: {'x-auth-token': localStorage.getItem('token')}});
    return { body: response.data, success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const getSearchCount = async () =>{
  try{
    const response = await axios.post(profile_getSearchCount, {headers: {'x-auth-token': localStorage.getItem('token')}});

    return { body: response.data, success: true };
  }catch(error){
    return { success: false, message: error.message };
  }
}

export default {updateProfile,changePassword,getGamePoints,getSearchCount}  ;