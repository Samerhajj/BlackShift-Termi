import axios from "axios";
import {gameHistoryUpdate,getGameHistoryUpdate} from './ApiRoutes'



const updateGameHistory = async (userId, gameName, score) => {
  try {
    const res = await axios.post(gameHistoryUpdate, {
      userId,
      gameName,
      score
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const getGameHistory=async()=>{
      const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.get(getGameHistoryUpdate, {
          headers: { 'x-auth-token': token }
        });
        return {body: res.data, success: true};
      } catch (err) {
        console.log(err);
        return {success: false};
      }
    }
}

export default {updateGameHistory,getGameHistory};