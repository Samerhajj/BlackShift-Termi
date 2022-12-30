// Search Routes
const searchRoute = process.env.React_App_BaseURL + "search";
const autocompleteRoute = process.env.React_App_BaseURL + "search" + "/" + "auto-complete";

// Games Routes
const randomRoute = process.env.React_App_BaseURL + "search" + "/" + "random";

// User Routes
// const loginRoute = process.env.React_App_BaseURL + "login";
const loginRoute = process.env.React_App_User_Login;
const privateRoute = process.env.React_App_User_Private;
const registerRoute = process.env.React_App_User_Register;
const logoutRoute = process.env.React_App_User_Logout;
const favoriteRoute = process.env.React_App_User_Favorite;
const delFavoriteRoute = process.env.React_App_User_DEL_Favorite;
const favoriteRoute1 = process.env.React_App_User_Favorite_1;
const displayMytermsRoute1 = process.env.React_App_User_Favorite_DISPLAY_MYTERMS

// const registerRoute = process.env.React_App_BaseURL + "register";

export {searchRoute,
        autocompleteRoute,
        randomRoute,
        loginRoute,
        privateRoute,
        registerRoute,
        logoutRoute,
        favoriteRoute,
        delFavoriteRoute,
        favoriteRoute1,
        displayMytermsRoute1
};