import axios from "axios";

const updateProfile = async formValues => {
  try {
         console.log('Request body:', formValues);
    // send a PUT request to update the profile information
    const response = await axios.put('http://dir.y2022.kinneret.cc:7013/api/profile', formValues);
    // handle success
    return { body: response.data, success: true };
  } catch (error) {
    // handle error
    return { success: false, message: error.message };
  }
};


export default {updateProfile}  ;