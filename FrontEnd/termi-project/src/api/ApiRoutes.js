// Search Routes
const searchRoute = process.env.React_App_BaseURL + "search";
const autocompleteRoute = process.env.React_App_BaseURL + "search" + "/" + "auto-complete";
const search_historySearch = process.env.React_App_BaseURL + "search" + "/" + "historySearch";
const search_returnAllCategories = process.env.React_App_BaseURL + "search" + "/" + "returnAllCategories";
const search_favorites = process.env.React_App_BaseURL + "search" + "/" + "display-myterms";

// Games Routes
const randomRoute = process.env.React_App_BaseURL + "search" + "/" + "random";
const gameHistoryUpdate = process.env.React_App_BaseURL + "gameHistory" + "/" + "updateGameHistory";
const getGameHistoryUpdate = process.env.React_App_BaseURL + "gameHistory" + "/" + "getGameHistory";
const updatePointsRoute = process.env.React_App_BaseURL + "profile" + "/"  + "updatePoints";


// Auth Routes
const loginRoute = process.env.React_App_BaseURL + "auth" + "/" + "login";
const privateRoute = process.env.React_App_BaseURL + "auth" + "/" + "private";
const registerRoute = process.env.React_App_BaseURL + "auth" + "/" + "register";
const logoutRoute = process.env.React_App_BaseURL + "auth" + "/" + "logout";
const forgotPasswordRoute = process.env.React_App_BaseURL + "auth" + "/" + "forgotpassword";


// Profile
const profile_edit = process.env.React_App_BaseURL + "profile" + "/"  + "edit";
const profile_change_password = process.env.React_App_BaseURL + "profile" + "/"  + "change-password";
const profile_get_point = process.env.React_App_BaseURL + "profile" + "/"  + "getPoints";
const profile_getSearchCount = process.env.React_App_BaseURL + "user" + "/"  + "inc-search-counter";


// Category Routes
const allCategoriesRoute = process.env.React_App_BaseURL + "category";


// User Routes
const uploadProfileImageRoute = process.env.React_App_BaseURL + "user" + "/" + "upload";
const favoritesRoute = process.env.React_App_BaseURL + "user" + "/" + "favorites";
const deleteFavoriteRoute = process.env.React_App_BaseURL + "user" + "/" + "delete-favorite";
const addFavoriteRoute = process.env.React_App_BaseURL + "user" + "/" + "add-favorite";
const suggestUserRoute = process.env.React_App_BaseURL + "user" + "/" + "suggest-term";
const SearchActiviyUserRoute = process.env.React_App_BaseURL + "user" + "/" + "gameSearchActivity";
const suggestionsRoute = process.env.React_App_BaseURL + "user" + "/" + "suggestions";
const user_getUserData =  process.env.React_App_BaseURL + "user" + "/" + "getUserData";
const user_activeLag = process.env.React_App_BaseURL + "user" + "/" + "active-lag";

// Leaderboard Routes
const leaderboardRoute = process.env.React_App_BaseURL + "leaderboards";
const availableContextsRoute = process.env.React_App_BaseURL + "leaderboards" + "/" + "contexts";

// Achievements Routes
const achievementsRoute = process.env.React_App_BaseURL + "achievements";
const achievementUpdateRoute = process.env.React_App_BaseURL + "achievements" + "/" + "update";

// Admin Routes
const numberOfWordsInTheApp = process.env.React_App_BaseURL + "counter";
const allsuggestedterms = process.env.React_App_BaseURL + "user" + "/" + "allsuggestedterms";
const approveTerm = process.env.React_App_BaseURL + "user" + '/' + "approve-term";
const deleteTerm = process.env.React_App_BaseURL + "user" + "/" + "deleteonesuggest";
const AllChangeLanguageLogs = process.env.React_App_BaseURL + "user" + "/" + "get-all-logs";
const AllSearchGameLogs = process.env.React_App_BaseURL + "user" + "/" + "get-all-search-game-logs";

// Feedback Routes
const addFeedbackRoute= process.env.React_App_BaseURL + "feedback" + "/" + "term";
const getAllFeedback = process.env.React_App_BaseURL + "feedback" + "/" + "term";

// Others
const top10Route = process.env.React_App_BaseURL + "search" + "/" + "get-top10";
const displayMytermsRoute1 = process.env.React_App_User_Favorite_DISPLAY_MYTERMS;
const deleteTermFromSearchRoute = process.env.React_App_BaseURL + "user" + "/" + "deleteterm";
const chatgptRoute =  process.env.React_App_BaseURL + "ai" + "/" + "generate-definitions";
export {
        // Search Routes
        searchRoute,
        autocompleteRoute,
        search_historySearch,
        search_returnAllCategories,
        search_favorites,
        
        //chatgpt
        chatgptRoute,
        // Games Routes
        randomRoute,
        updatePointsRoute,
        gameHistoryUpdate,
        getGameHistoryUpdate,
        
        // Category Routes
        allCategoriesRoute,
        
        // Auth Routes
        loginRoute,
        privateRoute,
        registerRoute,
        logoutRoute,
        forgotPasswordRoute,
        
        // User Routes
        favoritesRoute,
        deleteFavoriteRoute,
        addFavoriteRoute,
        suggestUserRoute,
        suggestionsRoute,
        SearchActiviyUserRoute,
        user_getUserData,
        user_activeLag,
        uploadProfileImageRoute,
        
        // Leaderboard Routes
        availableContextsRoute,
        leaderboardRoute,
        
        // Achievement Routes
        achievementsRoute,
        achievementUpdateRoute,
        
        // Admin Routes
        numberOfWordsInTheApp,
        allsuggestedterms,
        approveTerm,
        deleteTerm,
        AllChangeLanguageLogs,
        AllSearchGameLogs,
        
        // Feedback Routes
        addFeedbackRoute,
        getAllFeedback,
        
        // Other Routes
        top10Route,
        displayMytermsRoute1,
        deleteTermFromSearchRoute,
        
        //profile
        profile_change_password,
        profile_edit,
        profile_get_point,
        profile_getSearchCount,
};