import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React,{useEffect} from "react";
// import CardGame from "./pages/NewGame/CardGame";

//Pages
import {Login,  Register, TermsPage,  ProfilePage,
        ErrorPage,  HomePage, GamesPage,  ForgotPassword,
        SuggestConceptPage, Favorite, Note, Top10,
        AdminSuggestionPage,  AdminPage,  AddTermAdmin,UserSuggestions,ResetPasswordPage,VerifyPage
        ,ProfilePageNew
} from "./pages/PageIndex";

//Layouts
import PageLayout from "./components/PageLayout";
import DynamicTitleRoute from "./components/DynamicTitleRoute";

//Games

import {BackDefinitionGame, Hangman} from "./games/GameIndex.js"

// import BackDefinitionGame from "./games/backward-definition/BackDefinition";
import WordleGame from "./games/wordle/Wordle";
 //import Hangman from "./games/hangman/hangman";
import MemoryGame from "./games/memory-game/MemoryGame";
import CrosswordGame from "./games/crossword-game/Crossword";



import withAuth from './pages/Logic/withAuth';
import withNotAuth from './pages/Logic/withNotAuth';
import withAdminAuth from './pages/Logic/withAdminAuth';
import LoginProvider  from './components/LoginContext';

function App() {
  // --> wrapped components to check if you have the legitimacy to reach specific pages
  const WProfilePage = withAuth(ProfilePage);
  const WGamesPage = withAuth(GamesPage);
  const WWordleGame = withAuth(WordleGame);
  const WHangman = withAuth(Hangman);
  const WBackDefinitionGame = withAuth(BackDefinitionGame);
  const WMemoryGame = withAuth(MemoryGame);
  const WCrosswordGame = withAuth(CrosswordGame);
  const WFavorite=withAuth(Favorite);
  
  
  const WForgotPassword = withNotAuth(ForgotPassword);
  const WLogin = withNotAuth(Login);
  const WRegister = withNotAuth(Register);
  const WSuggestConceptPage=withAuth(SuggestConceptPage);
  const WAdminPage=withAdminAuth(AdminPage,'admin');
  const WAdminSuggestionPage = withAdminAuth(AdminSuggestionPage,'admin');
  const WAddTermAdmin = withAdminAuth(AddTermAdmin,'admin');
  const WTop10 = withAdminAuth(Top10,'admin');
  const WNote = withAdminAuth(Note,'admin');

  
const [login, setLogin] = React.useState(localStorage.getItem('login') || false);
const [userData, setUserData] = React.useState({});

 console.log(userData);
  {/*<LoginProvider value={{ login, setLogin,userData,setUserData}}>*/}
  

  return (
    <>

    <Router>
      <Routes>
          <Route element={<PageLayout/>}>
                      <Route path="/neww" element={<DynamicTitleRoute title="neww" element={<ProfilePageNew/>} />}/>

            <Route path="/about" element={<DynamicTitleRoute title="About | Termi" element={<HomePage/>} />}/>
            <Route path="/" element={<DynamicTitleRoute title="Search" element={<TermsPage/>} />}/>
            <Route path="/login" element={<DynamicTitleRoute title="Login" element={<WLogin/>} />}/>
            <Route path="/register" element={<DynamicTitleRoute title="Register" element={<WRegister/>} />}/>
            <Route path="/forgotpassword" element={<DynamicTitleRoute title="Forgot Password" element={<WForgotPassword/>} />}/>
            <Route path="/profile" element={<DynamicTitleRoute title="Profile" element={<WProfilePage/>} />}/>
            <Route path="/verify/:token" element={<DynamicTitleRoute title="Profile" element={<VerifyPage/>} />}/>
            <Route path="/games" element={<DynamicTitleRoute title="Games" element={<WGamesPage/>}/>}/>
            <Route path="/games/backword-definition" element={<DynamicTitleRoute title="Definition Game" element={<WBackDefinitionGame/>} />}/>
            <Route path="/games/memory-game" element={<DynamicTitleRoute title="Memory Game" element={<WMemoryGame/>} />}/>
            <Route path="/games/hangman-game" element={<DynamicTitleRoute title="Hangman Game" element={<WHangman/>} />}/>
            <Route path="/reset-password/:token" element={<DynamicTitleRoute title="Reset Password" element={<ResetPasswordPage/>} />}/>
            <Route path="*" element={<DynamicTitleRoute title="Error" element={<ErrorPage/>} />}/> {/* wrong url */}
            <Route path="/favorite" element={<DynamicTitleRoute title="Favorite" element={<WFavorite/>} />}/>
            <Route path="/suggest" element={<DynamicTitleRoute title="Suggest Concept" element={<WSuggestConceptPage/>} />}/>
            <Route path="/admin" element={<DynamicTitleRoute title="Admin" element={<WAdminPage/>} />}/>
            <Route path="/admin/suggestions" element={<DynamicTitleRoute title="User Suggestions" element={<WAdminSuggestionPage/>} />}/>
            <Route path="/admin/add-term" element={<DynamicTitleRoute title="Admin Add Term" element={<WAddTermAdmin/>} />}/>
            <Route path="/admin/top-10" element={<DynamicTitleRoute title="Top 10 Concepts" element={<WTop10/>} />}/>
            <Route path="/UserSuggestions/UserSuggestions" element={<DynamicTitleRoute title="User Suggestions" element={<UserSuggestions/>} />}/>
            {/*<Route path="/games/wordle" element={<DynamicTitleRoute title="Wordle" element={<WWordleGame/>} />}/>
            <Route path="/games/crossword-game" element={<DynamicTitleRoute title="Crossword Game" element={<WCrosswordGame/>} />}/>*/}
            {/*<Route path="/note" element={<DynamicTitleRoute title="Notes" element={<WNote/>} />}/>
            <Route path="/newgame" element={<DynamicTitleRoute title="NewGame" element={<CardGame/>} />}/>*/}
          </Route>
      </Routes>
    </Router>
<br/><br/><br/><br/><br/><br/>
    </>
  );
}
export default App;

//           <Route path="/forgotpassword" element={<DynamicTitleRoute title="Forgot Password" element={<ForgotPassword/>} />}/>

// () => (
//   loggedIn ? (
//     <Redirect to="/dashboard"/>
//   ) : (
//     <PublicHomePage/>
//   )