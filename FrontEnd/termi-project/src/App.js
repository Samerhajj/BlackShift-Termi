import './App.css';
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';

//Pages
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Register from "./pages/Register/Register";// edit

import TermsPage from "./pages/TermsPage";
import GamesPage from "./pages/GamesPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPassword from "./pages/ForgotPassword";
import SuggestConceptPage from "./pages/SuggestConceptPage";
import Note from "./pages/Note/Note";
import CardGame from "./pages/NewGame/CardGame";
import Favorite from "./pages/Favorite/Favorite";
import AdminPage from "./pages/AdminPage/AdminPage";

//Layouts
import PageLayout from "./components/PageLayout";
import DynamicTitleRoute from "./components/DynamicTitleRoute";

//Games
import BackDefinitionGame from "./games/backward-definition/BackDefinition";
import WordleGame from "./games/wordle/Wordle";
import Hangman from "./games/hangman/hangman";
import React from "react";
import withAuth from './pages/Logic/withAuth';
import withNotAuth from './pages/Logic/withNotAuth';
import withAdminAuth from './pages/Logic/withAdminAuth';
import LoginProvider  from './components/LoginContext';

function App() {
  // --> wrapped components to check if you have the legitimacy to reach specific pages
  const WProfilePage = withAuth(ProfilePage);
  const WGamesPage = withAuth(GamesPage);
  const WNote = withAuth(Note);
  const WWordleGame = withAuth(WordleGame);
  const WHangman = withAuth(Hangman);
  const WBackDefinitionGame = withAuth(BackDefinitionGame);
  const WFavorite=withAuth(Favorite);
  
  
  const WForgotPassword = withNotAuth(ForgotPassword);
  const WLogin = withNotAuth(Login);
  const WRegister = withNotAuth(Register);
  const WSuggestConceptPage=withAuth(SuggestConceptPage);
  const WAdminPage=withAdminAuth(AdminPage,'admin');
  
  
  const [login, setLogin] = React.useState(localStorage.getItem('login') || false);
  return (
        <LoginProvider value={{ login, setLogin }}>
    <Router>
      <Routes>
          <Route element={<PageLayout/>}>
          <Route path="/about" element={<DynamicTitleRoute title="About | Termi" element={<HomePage/>} />}/>
          <Route path="/" element={<DynamicTitleRoute title="Search" element={<TermsPage/>} />}/>
          <Route path="/login" element={<DynamicTitleRoute title="Login" element={<WLogin/>} />}/>
          <Route path="/register" element={<DynamicTitleRoute title="Register" element={<WRegister/>} />}/>
          <Route path="/forgotpassword" element={<DynamicTitleRoute title="Forgot Password" element={<WForgotPassword/>} />}/>
          <Route path="/profile" element={<DynamicTitleRoute title="Profile" element={<WProfilePage/>} />}/>
          <Route path="/games" element={<DynamicTitleRoute title="Games" element={<WGamesPage/>}/>}/>
          <Route path="/games/back-definition" element={<DynamicTitleRoute title="Definition Game" element={<WBackDefinitionGame/>} />}/>
          <Route path="/games/wordle" element={<DynamicTitleRoute title="Wordle" element={<WWordleGame/>} />}/>
          <Route path="/games/hangman" element={<DynamicTitleRoute title="Hangman" element={<WHangman/>} />}/>
          <Route path="/note" element={<DynamicTitleRoute title="Notes" element={<WNote/>} />}/>
          <Route path="/favorite" element={<DynamicTitleRoute title="favorite" element={<WFavorite/>} />}/>
          <Route path="/suggest" element={<DynamicTitleRoute title="suggestions" element={<WSuggestConceptPage/>} />}/>
          <Route path="/newgame" element={<DynamicTitleRoute title="NewGame" element={<CardGame/>} />}/>
          <Route path="*" element={<DynamicTitleRoute title="Error" element={<ErrorPage/>} />}/>
          <Route path="/admin" element={<DynamicTitleRoute title="Admin" element={<AdminPage/>} />}/>

          
        </Route>
      </Routes>
    </Router>
  </LoginProvider>
  
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