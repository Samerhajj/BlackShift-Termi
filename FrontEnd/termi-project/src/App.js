import './App.css';
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';

//Pages
import Login from "./pages/Login/Login";
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
import AdminSuggestionPage from "./pages/AdminPage/ViewSuggestions";
import AddTermAdmin from "./pages/AdminPage/AddTermAdmin";
import Top10 from "./pages/AdminPage/Top10";
import Footer from './components/Footer';

//Layouts
import PageLayout from "./components/PageLayout";
import DynamicTitleRoute from "./components/DynamicTitleRoute";

//Games
import BackDefinitionGame from "./games/backward-definition/BackDefinition";
import WordleGame from "./games/wordle/Wordle";
import Hangman from "./games/hangman/hangman";
import MemoryGame from "./games/memory-game/MemoryGame";
import CrosswordGame from "./games/crossword-game/Crossword";
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
          <Route path="/games/memory-game" element={<DynamicTitleRoute title="Memory Game" element={<WMemoryGame/>} />}/>
          <Route path="/games/crossword-game" element={<DynamicTitleRoute title="Crossword Game" element={<WCrosswordGame/>} />}/>
          
          <Route path="/games/hangman" element={<DynamicTitleRoute title="Hangman" element={<WHangman/>} />}/>
          <Route path="/note" element={<DynamicTitleRoute title="Notes" element={<WNote/>} />}/>
          <Route path="/favorite" element={<DynamicTitleRoute title="favorite" element={<WFavorite/>} />}/>
          <Route path="/suggest" element={<DynamicTitleRoute title="suggestions" element={<WSuggestConceptPage/>} />}/>
          <Route path="/newgame" element={<DynamicTitleRoute title="NewGame" element={<CardGame/>} />}/>
          <Route path="*" element={<DynamicTitleRoute title="Error" element={<ErrorPage/>} />}/>
          <Route path="/admin" element={<DynamicTitleRoute title="Admin" element={<AdminPage/>} />}/>
          <Route path="/admin/suggestions" element={<DynamicTitleRoute title="User Suggestions" element={<AdminSuggestionPage/>} />}/>
          <Route path="/admin/add-term" element={<DynamicTitleRoute title="Admin Add Term" element={<AddTermAdmin/>} />}/>
          <Route path="/admin/top-10" element={<DynamicTitleRoute title="Top 10 Concepts" element={<Top10/>} />}/>
          
  
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