import axios from "axios";
import { leaderboardRoute, availableContextsRoute } from './ApiRoutes';

// Function to get the leaderboard data
async function getLeaderboard(category, context, limit) {
  try {
    const response = await axios.get(leaderboardRoute, {
      params: {
        category: category,
        context: context,
        limit: limit,
      },
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    
    return {body: response.data, success: true};
  } catch (error) {
    return {message: error.message,success: false};
  }
}

// Function to get the leaderboard data
async function getAvailableContexts(category) {
  try {
    const response = await axios.get(availableContextsRoute, {
      params: {
        category: category
      }
    });
    
    return {body: response.data, success: true};
  } catch (e) {
        if(e.response){
            return {success: false, message: e.response.data};
        }else{
            return {success: false, message: e.message};
        }
  }
}

export default { getLeaderboard, getAvailableContexts};
