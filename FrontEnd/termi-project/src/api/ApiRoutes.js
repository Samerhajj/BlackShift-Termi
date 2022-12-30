// Search Routes
const searchRoute = process.env.React_App_BaseURL + "search";
const autocompleteRoute = process.env.React_App_BaseURL + "search" + "/" + "auto-complete";

// Games Routes
const randomRoute = process.env.React_App_BaseURL + "search" + "/" + "random";

// Auth Routes
const loginRoute = process.env.React_App_BaseURL + "auth" + "/" + "login";
const privateRoute = process.env.React_App_BaseURL + "auth" + "/" + "private";
const registerRoute = process.env.React_App_BaseURL + "auth" + "/" + "register";
const logoutRoute = process.env.React_App_BaseURL + "auth" + "/" + "logout";

// User Routes
const favoritesRoute = process.env.React_App_BaseURL + "user" + "/" + "favorites";
const deleteFavoriteRoute = process.env.React_App_BaseURL + "user" + "/" + "delete-favorite";
const addFavoriteRoute = process.env.React_App_BaseURL + "user" + "/" + "add-favorite";

const displayMytermsRoute1 = process.env.React_App_User_Favorite_DISPLAY_MYTERMS;

export {searchRoute,
        autocompleteRoute,
        randomRoute,
        loginRoute,
        privateRoute,
        registerRoute,
        logoutRoute,
        favoritesRoute,
        deleteFavoriteRoute,
        addFavoriteRoute,
        displayMytermsRoute1
};