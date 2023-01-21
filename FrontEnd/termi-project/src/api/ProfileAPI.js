import axios from "axios";

const updateProfile = async formValues => {
  try {
         console.log('Request body:', formValues);
    // send a PUT request to update the profile information
    const response = await axios.put('http://dir.y2022.kinneret.cc:7013/profile/edit', formValues);
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
    const response = await axios.put('http://dir.y2022.kinneret.cc:7013/profile/change-password', formValues);
    // handle success
    return { body: response.data, success: true };
  } catch (error) {
    // handle error
    return { success: false, message: error.message };
  }
};

const getGamePoints = async () => {
  try {
    const response = await axios.get('http://dir.y2022.kinneret.cc:7013/profile/getPoints', {headers: {'x-auth-token': localStorage.getItem('token')}});
    return { body: response.data, success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const getSearchCount = async () =>{
  try{
    const response = await axios.post('http://dir.y2022.kinneret.cc:7013/user/inc-search-counter', {headers: {'x-auth-token': localStorage.getItem('token')}});
    return { body: response.data, success: true };
  }catch(error){
    return { success: false, message: error.message };
  }
}

export default {updateProfile,changePassword,getGamePoints,getSearchCount}  ;