import axios from "axios";
import { addFeedbackRoute } from '../api/ApiRoutes';

const addFeedback = async (userId, termId, overallRating, shortDefinitionRating, longDefinitionRating, feedbackText) => {
  try {
      const res = await axios.post(`${addFeedbackRoute}/${termId}`, {
      userId,
      overallRating,
      shortDefinitionRating,
      longDefinitionRating,
      feedbackText
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