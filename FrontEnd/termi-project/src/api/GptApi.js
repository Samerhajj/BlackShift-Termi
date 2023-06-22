import axios from "axios";
import { chatgptRoute } from '../api/ApiRoutes';

const generateDefinitions = async (userInput) => {
  try {
    const response = await axios.post(chatgptRoute, { userInput });
    const reply = response.data.reply;
    return reply; // Return the generated reply
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export default {generateDefinitions};
