import axios from "axios";
import { addFeedbackRoute } from '../api/ApiRoutes';

const addFeedback = async (termId, overallRating, shortDefinitionRating, longDefinitionRating, feedbackText) => {
  try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${addFeedbackRoute}/${termId}`, {
      overallRating,
      shortDefinitionRating,
      longDefinitionRating,
      feedbackText
      },{
        headers: { 'x-auth-token': token }
    });
    return { body: res.data, success: true };
  } catch (e) {
    if (e.response) {
      return { success: false, message: e.response.data };
    } else {
      return { success: false, message: e.message };
    }
  }
};



export default {addFeedback};