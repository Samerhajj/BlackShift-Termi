import axios from "axios";
import { getGameLeaderboard } from '../api/ApiRoutes';

// Function to call the API and get the leaderboard data
async function fetchLeaderboardData(category, gameName, limit) {
  try {
    // Make the API call
    const response = await axios.get(getGameLeaderboard, {
      params: {
        category: category,
        gameName: gameName,
        limit: limit,
      },
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });

    // Return the leaderboard data
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchLeaderboardData;
