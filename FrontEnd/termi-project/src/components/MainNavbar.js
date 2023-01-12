import React, { useContext ,Fragment} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector'; // component
import 'font-awesome/css/font-awesome.min.css';
import logoImg from '../images/terminewlogo.png';
// import logout_w from '../images/logout_w.png';
// import gamepad_icon from '../images/gamepad_icon.png';
// import search from '../images/iconimg/search.png';
// import searchE from '../images/iconimg/searchE.png';
// import style from './style.css';
// import santa from '../images/santa_note.png';
import GoToTop from './backTopPage';
import PropTypes from "prop-types";
import HamburgerLogic from './hamburgerLogic'; // component
import HandleScroll from './handleScroll'; // component
import axios from "axios";
import {logoutRoute} from '../api/ApiRoutes';

// --> import Icons
import { IconContext } from "react-icons";
import {IoGameController, IoPersonCircle, IoDocument, IoSearch, IoLogOut,IoLogIn,AiOutlineHome} from 'react-icons/io5';

// --> import LoginContext
import { LoginContext } from './LoginContext';

const MainNavbar = ({setTitle,location}) => {
  
  // --> hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  
  const { login, setLogin } = useContext(LoginContext);
  // --> functions
const handleLogout = () => {
  {
                      // navigate("/login");
                      // axios.delete('http://dir.y2022.kinneret.cc:7013/user/logout', {
                      //   headers: {
                      //     'x-auth-token': `${localStorage.getItem('token')}`,
                      //     'x-refresh-token' : `${localStorage.getItem('refreshToken')}`
                      //   }
                      // })
                      //   .then(res => {
                      //     if (res.status === 200) {
                      //       // Token was successfully deleted from the server
                      //       console.log("deleted successfully")
                      //     } else {
                      //       // There was an error deleting the token
                      //       console.error("error");
                      //     }
                      //   })
                      //   .catch(error => {
                      //     console.error(error);
                      //   });
                      
                      // ↓  replace  ↑
                      
  }      
                  axios.delete(logoutRoute, {
                        headers: {
                          'x-auth-token': `${localStorage.getItem('token')}`,
                          'x-refresh-token' : `${localStorage.getItem('refreshToken')}`
                        }
                      })
                        .then(res => {
                          if (res.status === 200) {
                            // Token was successfully deleted from the server
                            console.log("deleted successfully")
                          } else {
                            // There was an error deleting the token
                            console.error("error");
                          }
                        })
                        .catch(error => {
                          console.error(error);
                        });
                          
                        
                        
                        
                        
                        

    // --> remove the login and the token from the localStorage and set the value of the context to false
      
    localStorage.setItem('login', false);
    localStorage.removeItem('profileBody');
    localStorage.removeItem('token');
    setLogin(false);
  };

  // useEffect(() => {
  //   console.log('useEffect called with login = ', login);
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setLogin(true);
  //   }
  // }, [login]);

  const headerRef=HandleScroll(50,'sticky');
  const {hamburgerRef,mobileMenuRef}=HamburgerLogic();  
  return (
    <header ref={headerRef}>
      <div className="wrapper cf" dir="ltr">
        <Link to={'/'} className="logo">
          <div>
            <img src={logoImg} alt="logo"/>
            </div>
        </Link>
        <a href="javascript:void(0)" className="hamburger" ref={hamburgerRef}><span/></a>
        <div className="mobile_menu" ref={mobileMenuRef}>
          <Link to={'/'} className="mo_logo">
              <img src={logoImg} alt="logo"/>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to={'/'} className={location && location.pathname==='terms' ? 'active' : 'nav-link'}>
                      {/*<img src={searchE} className="game_icon" alt="search"/>*/}
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoSearch/>
                  </IconContext.Provider>
                </Link>
              </li>
            {localStorage.getItem('login') ==='true' ?(
             <Fragment>
              <li>
                <Link to={'/profile'} className={location && location.pathname ==='profile' ?  'active': 'nav-link'}>
                  {/*<i className="fa fa-user fa-2x"></i>*/}
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoPersonCircle/>
                  </IconContext.Provider>
                </Link>
              </li>
              
              
              <li>
                <Link to={'/note'} className={location && location.pathname ==='note' ?  'active': 'nav-link'}>
                  {/*<i className="fa fa-regular fa-comment">*/}
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoDocument/>
                  </IconContext.Provider>
                  {/*<img src={santa} alt="santa_note"/>*/}
                </Link>
              </li>
              
              
    
              
        
              
              
              
              
              
              <li><Link to={'/games'} className={location && location.pathname==='games' ? 'active' : 'nav-link'}>
                  {/*<img className="game_icon"  src={gamepad_icon}/>*/}
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoGameController/>
                  </IconContext.Provider>
                   {/*{t('navbar.games')}*/}
                   </Link>
              </li>
              
               </Fragment>
              )
              :(  
              <li>
                <Link to={'/register'} className={location && location.pathname==='register' ? 'active' : 'nav-link'}>
                  {t('navbar.register')}
                </Link>
              </li>
              )}
              {login === 'false' ? (
              <li>
              <Link to={'/login'} className={location && location.pathname==='login' ? 'active' : 'nav-link'}>
                   <IconContext.Provider value={{ size: "2rem" }}>
                    <IoLogIn/>
                  </IconContext.Provider>
              </Link>
              </li>
              ):(
               <li>
               {/*<Link to={'/login'}
                  className={location && location.pathname==='logout' ? 'active' : 'nav-link'}
                  onClick={handleLogout}>
                  {t('navbar.logout')}</Link>*/}
               
               
                {/*<button  onClick={(event) => {
                handleLogout();
              }}>
                {t('navbar.logout')}
              </button>*/}

                   
                  <a className="nav-link" href="login" onClick={(event) => {handleLogout();}}>
                    {/*<img className="logout_icon"  src={logout_w}/>*/}
                    {/*{t('navbar.logout')}*/}
                    <IconContext.Provider value={{ size: "2rem" }}>
                      <IoLogOut/>
                    </IconContext.Provider>
                  </a>
                </li>
              )}
            
              <li>
                <LanguageSelector/>
              </li>
            </ul>
          </nav>  
        </div>
      </div>
      <GoToTop/>
    </header>
  );
  {
//   <header>
//       <LanguageSelector/>
//     <div className="wrapper cf">
//       <Link to={'/'} className="logo">
//           <img src={logoImg} alt="logo"/>
//         </Link>
        
//         <a href="#" className="hamburger"><span/></a>
//         <div className="mobile_menu">
//           <a href="#" className="mo_logo"><img src={logoImg} alt=""/></a>
//           <nav>
//             <ul>
//                 <li> <Link to ={'/profile'}
//                     className={location && location.pathname ==='profile' ?  'active': ''}>
//                     <i className="fa fa-user fa-lg"></i></Link>
//               </li>
//                   <li><Link to={'/terms'}
//                     className={location && location.pathname==='terms' ? 'active' : ''}>
//                     {t('navbar.terms')}</Link>
//                     </li>
//                     <li><Link to={'/games'}
//                     className={location && location.pathname==='games' ? 'active' : ''}>
//                     {t('navbar.games')}</Link>
//                     </li>
//                     <li><Link to={'/login'}
//                     className={location && location.pathname==='login' ? 'active' : ''}>
//                   {t('navbar.login')}</Link>
//                     </li>
//                     <li><Link to={'/register'}
//                     className={location && location.pathname==='register' ? 'active' : ''}>
//                     {t('navbar.register')}</Link>
//                     </li>
//               </ul>
//               </nav>
            
//           </div>
         
//         </div>
         
//     </header>
}
MainNavbar.propTypes={
  setTitle:PropTypes.string,
}
MainNavbar.defaultProps={
  setTitle:``,
}
{
    ///// Style 1
    // <Navbar bg="light" expand="lg" className="mb-3">
    //       <Container fluid>
    //         <Navbar.Brand>
    //           <Link to="/" className="navbar-brand">Termi</Link>
    //         </Navbar.Brand>
            
    //         <Navbar.Toggle aria-controls="offcanvasNavbar-expand"/>
    //         <Navbar.Offcanvas
    //           id="offcanvasNavbar-expand"
    //           aria-labelledby="offcanvasNavbarLabel-expand"
    //         >
    //           <Offcanvas.Header closeButton>
    //             <Offcanvas.Title id="offcanvasNavbarLabel-expand">
    //               Menu
    //             </Offcanvas.Title>
    //           </Offcanvas.Header>
    //           <Offcanvas.Body>
    //             <Nav className="justify-content-center flex-grow-1 pe-3">
    //               <Link to="/" className="nav-link">{t('navbar.home')}</Link>
    //               <Link to="/search" className="nav-link">{t('navbar.terms')}</Link>
    //               <Link to="/games" className="nav-link">{t('navbar.games')}</Link>
    //             </Nav>
    //             <LanguageSelector/>
    //           </Offcanvas.Body>
    //         </Navbar.Offcanvas>
    //       </Container>
    //     </Navbar>
        
    
    
    // <Navbar className="p-3" bg="light" expand="lg">
    //   <Container fluid>
    //     <Link to="/" className="navbar-brand">Termi</Link>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll>
    //         <Link to="/search" className="nav-link">{t('navbar.search')}</Link>
    //         <Link to="/games" className="nav-link">{t('navbar.games')}</Link>
    //       </Nav>
    //       <LanguageSelector/>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
}
};
export default MainNavbar;
{/*<Navbar className="navbar navbar-gray bg-gray" bg="light" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">Termi</Link>
        <Navbar.Toggle/>
        <Navbar.Collapse  id="navbarCollapse">
          <Nav className="justify-content-center flex-grow-1 pe-3" >
            <Link to ="/profile" className="nav-link"> <i className="fa fa-user fa-lg"></i></Link>
            <Link to="/" className="nav-link">{t('navbar.home')}</Link>
            <Link to="/terms" className="nav-link">{t('navbar.terms')}</Link>
            <Link to="/games" className="nav-link">{t('navbar.games')}</Link>
            <Link to ="/login" className="nav-link">{t('navbar.login')}</Link>
            <Link to ="/register" className="nav-link">{t('navbar.register')}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div>
        <LanguageSelector/>
      </div>
      
    </Navbar>*/}