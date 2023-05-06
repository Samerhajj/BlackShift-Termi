// Search Routes
const searchRoute = process.env.React_App_BaseURL + "search";
const autocompleteRoute = process.env.React_App_BaseURL + "search" + "/" + "auto-complete";


// Games Routes
const randomRoute = process.env.React_App_BaseURL + "search" + "/" + "random";
const updatePointsRoute = process.env.React_App_BaseURL + "profile" + "/"  + "updatePoints";
const gameHistoryUpdate = process.env.React_App_BaseURL + "gameHistory" + "/" + "updateGameHistory";
const getGameHistoryUpdate = process.env.React_App_BaseURL + "gameHistory" + "/" + "getGameHistory";


// Auth Routes
const loginRoute = process.env.React_App_BaseURL + "auth" + "/" + "login";
const privateRoute = process.env.React_App_BaseURL + "auth" + "/" + "private";
const registerRoute = process.env.React_App_BaseURL + "auth" + "/" + "register";
const logoutRoute = process.env.React_App_BaseURL + "auth" + "/" + "logout";
const forgotPasswordRoute = process.env.React_App_BaseURL + "auth" + "/" + "forgotpassword";


// Category Routes
const allCategoriesRoute = process.env.React_App_BaseURL + "category";


// User Routes
const favoritesRoute = process.env.React_App_BaseURL + "user" + "/" + "favorites";
const deleteFavoriteRoute = process.env.React_App_BaseURL + "user" + "/" + "delete-favorite";
const addFavoriteRoute = process.env.React_App_BaseURL + "user" + "/" + "add-favorite";
const suggestUserRoute = process.env.React_App_BaseURL + "user" + "/" + "suggest-term";
const SearchActiviyUserRoute = process.env.React_App_BaseURL + "user" + "/" + "gameSearchActivity";
const suggestionsRoute = process.env.React_App_BaseURL + "user" + "/" + "suggestions";


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
const addFeedbackRoute=process.env.React_App_BaseURL + "feedback" + "/" + "term";


// Others
const top10 = process.env.React_App_BaseURL + "search" + "/" + "get-top10";
const displayMytermsRoute1 = process.env.React_App_User_Favorite_DISPLAY_MYTERMS;

export {
        // Search Routes
        searchRoute,
        autocompleteRoute,
        
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
        
        // Other Routes
        top10,
        displayMytermsRoute1,
};