import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React,{useEffect} from "react";

//Pages
import {
  Login,  Register, TermsPage,  ProfilePage,
  ErrorPage, HomePage, GamesPage, ForgotPassword,
  SuggestConceptPage, Favorite, Top10,
  AdminSuggestionPage, AdminPage, AddTermAdmin, ResetPasswordPage, VerifyPage, TestPage,
  ManageUsersPage, FeedBack, ChatGptPage
} from "./pages/PageIndex";

//Layouts
import PageLayout from "./components/PageLayout";
import DynamicTitleRoute from "./components/DynamicTitleRoute";

//Games
import {BackDefinitionGame, Hangman, TranslateGame, MemoryGame} from "./games/GameIndex.js"

//Authentications
import withAuth from './pages/Logic/withAuth';
import withNotAuth from './pages/Logic/withNotAuth';
import withAdminAuth from './pages/Logic/withAdminAuth';
import LoginProvider  from './components/LoginContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//google analytics
import ReactGA from 'react-ga4';

function App() {
  // --> wrapped components to check if you have the legitimacy to reach specific pages
  const WGamesPage = withAuth(GamesPage);
  const WHangman = withAuth(Hangman);
  const WMemoryGame = withAuth(MemoryGame);
  const WBackDefinitionGame = withAuth(BackDefinitionGame);
  const WTranslateGame = withAuth(TranslateGame);
  const WProfilePage = withAuth(ProfilePage);
  const WFavorite=withAuth(Favorite);
  const WChatPage=withAuth(ChatGptPage);
  const WSuggestConceptPage=withAuth(SuggestConceptPage);
  
  const WForgotPassword = withNotAuth(ForgotPassword);
  const WLogin = withNotAuth(Login);
  const WRegister = withNotAuth(Register);
  
  const WAdminPage=withAdminAuth(AdminPage,'admin');
  const WAdminSuggestionPage = withAdminAuth(AdminSuggestionPage,'admin');
  const WAddTermAdmin = withAdminAuth(AddTermAdmin,'admin');
  const WTop10 = withAdminAuth(Top10,'admin');
  const WFeedBack= withAdminAuth(FeedBack,'admin');
  
  const [userData, setUserData] = React.useState({});

  {/*<LoginProvider value={{ login, setLogin,userData,setUserData}}>*/}
  
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID); // Replace with your Measurement ID
  }, []);

  return (
    <>
    <Router onUpdate={()=> ReactGA.pageview(window.location.pathname + window.location.search)}>
      <Routes>
          <Route path="/games/memory-game" element={<DynamicTitleRoute title="Memory Game" element={<WMemoryGame/>} />}/>
          <Route path="/games/backword-definition" element={<DynamicTitleRoute title="Definition Game" element={<WBackDefinitionGame/>} />}/>
          <Route path="/games/hangman-game" element={<DynamicTitleRoute title="Hangman Game" element={<WHangman/>} />}/>
          <Route path="/games/translate-game" element={<DynamicTitleRoute title="Translate Game" element={<WTranslateGame/>} />}/>
          
          <Route path="/about" element={<DynamicTitleRoute title="About | Termi" element={<HomePage/>} />}/>
          <Route path ="/test" element={<DynamicTitleRoute title="Test | Termi" element={<TestPage/>} />}/>
          
          <Route element={<PageLayout/>}>
            
          
            <Route path="/" element={<DynamicTitleRoute title="Search" element={<TermsPage/>} />}/>
            <Route path="/login" element={<DynamicTitleRoute title="Login" element={<WLogin/>} />}/>
            <Route path="/register" element={<DynamicTitleRoute title="Register" element={<WRegister/>} />}/>
            <Route path="/forgotpassword" element={<DynamicTitleRoute title="Forgot Password" element={<WForgotPassword/>} />}/>
            <Route path="/profile" element={<DynamicTitleRoute title="Profile" element={<WProfilePage/>} />}/>
            <Route path="/verify/:token" element={<DynamicTitleRoute title="Profile" element={<VerifyPage/>} />}/>
            <Route path="/games" element={<DynamicTitleRoute title="Games" element={<WGamesPage/>}/>}/>
            <Route path="/gpt" element={<DynamicTitleRoute title="ChatGpt" element={<WChatPage/>}/>}/>
            
           
            <Route path="/reset-password/:token" element={<DynamicTitleRoute title="Reset Password" element={<ResetPasswordPage/>} />}/>
            <Route path="/favorite" element={<DynamicTitleRoute title="Favorite" element={<WFavorite/>} />}/>
            <Route path="/suggest" element={<DynamicTitleRoute title="Suggest Concept" element={<WSuggestConceptPage/>} />}/>
            
            <Route path="/admin" element={<DynamicTitleRoute title="Admin" element={<WAdminPage/>} />}/>
            <Route path="/admin/suggestions" element={<DynamicTitleRoute title="User Suggestions" element={<WAdminSuggestionPage/>} />}/>
            <Route path="/admin/add-term" element={<DynamicTitleRoute title="Admin Add Term" element={<WAddTermAdmin/>} />}/>
            <Route path="/admin/top-10" element={<DynamicTitleRoute title="Top 10 Concepts" element={<WTop10/>} />}/>
            <Route path="/admin/table" element={<DynamicTitleRoute title="Table" element={<ManageUsersPage/>} />}/>
            <Route path="/admin/FeedBack" element={<DynamicTitleRoute title="FeedBack" element={<WFeedBack/>} />}/>

            <Route path="*" element={<DynamicTitleRoute title="Error" element={<ErrorPage/>} />}/> {/* wrong url */}
          </Route>
      </Routes>
    </Router>
    
      <ToastContainer
          position="bottom-right"
          closeOnClick={false}
          newestOnTop={true}
          draggable={true}
          pauseOnHover={true}
      />
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